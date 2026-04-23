import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++counter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const ICON: Record<ToastType, string> = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  const COLOR: Record<ToastType, string> = {
    success: "var(--emerald)",
    error: "var(--red)",
    warning: "var(--amber)",
    info: "var(--blue)",
  };

  const DIM: Record<ToastType, string> = {
    success: "var(--emerald-dim)",
    error: "var(--red-dim)",
    warning: "var(--amber-dim)",
    info: "var(--blue-dim)",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 500,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "11px 16px",
              background: "var(--surface)",
              border: `1px solid ${COLOR[t.type]}`,
              borderLeft: `3px solid ${COLOR[t.type]}`,
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow)",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--text-primary)",
              maxWidth: 340,
              animation: "toastIn 0.2s ease",
              pointerEvents: "auto",
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: DIM[t.type],
                color: COLOR[t.type],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {ICON[t.type]}
            </span>
            {t.message}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 480px) {
          .toast-container { left: 16px; right: 16px; bottom: 16px; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
