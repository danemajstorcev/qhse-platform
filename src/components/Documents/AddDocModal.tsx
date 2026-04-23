import { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";
import Modal from "../ui/Modal";
import type { Document, ISOStandard, FileType } from "../../types";

interface FormData {
  title: string;
  standard: ISOStandard;
  version: string;
  category: string;
  owner: string;
  file: File | null;
  fileType: FileType | null;
}

const EMPTY_FORM: FormData = {
  title: "",
  standard: "ISO 9001",
  version: "v1.0",
  category: "Procedure",
  owner: "",
  file: null,
  fileType: null,
};

const CATEGORIES = [
  "Policy",
  "Procedure",
  "Plan",
  "Register",
  "Form",
  "Methodology",
  "Guideline",
];

function detectFileType(file: File): FileType | null {
  if (file.type === "application/pdf" || file.name.endsWith(".pdf"))
    return "pdf";
  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx") ||
    file.name.endsWith(".doc")
  )
    return "docx";
  return null;
}

interface Props {
  onClose: () => void;
  onAdd: (doc: Omit<Document, "id">) => void;
}

export default function AddDocModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const fileType = detectFileType(file);
    if (!fileType) {
      alert("Only PDF and Word (.docx) files are supported.");
      return;
    }
    const title =
      form.title || file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    setForm((f) => ({ ...f, file, fileType, title }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = () => {
    onAdd({
      title: form.title,
      standard: form.standard,
      version: form.version,
      category: form.category,
      owner: form.owner,
      status: "Draft",
      lastModified: new Date().toISOString().split("T")[0],
      file: form.file ?? undefined,
      fileType: form.fileType ?? undefined,
      fileName: form.file?.name,
    });
    onClose();
  };

  return (
    <Modal
      title="New Document"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!form.title}
          >
            Create Document
          </button>
        </>
      }
    >
      <div
        className={`upload-zone ${dragOver ? "drag-over" : ""} ${form.file ? "has-file" : ""}`}
        style={{ marginBottom: 20 }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {form.file ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <FileText size={20} style={{ color: "var(--accent)" }} />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--accent)",
                }}
              >
                {form.file.name}
              </span>
              <button
                className="icon-btn"
                style={{ width: 24, height: 24 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setForm((f) => ({ ...f, file: null, fileType: null }));
                }}
              >
                <X size={12} />
              </button>
            </div>
            <div className="upload-zone-hint" style={{ marginTop: 4 }}>
              {form.fileType?.toUpperCase()} ·{" "}
              {(form.file.size / 1024).toFixed(0)} KB
            </div>
          </>
        ) : (
          <>
            <div
              className="upload-zone-icon"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Upload size={24} />
            </div>
            <div className="upload-zone-text">
              Click or drag & drop a file here
            </div>
            <div className="upload-zone-hint">
              Supports PDF and Word (.docx) files
            </div>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Document Title</label>
        <input
          className="form-input"
          placeholder="e.g. Quality Management Policy"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">ISO Standard</label>
          <select
            className="form-input"
            value={form.standard}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                standard: e.target.value as ISOStandard,
              }))
            }
          >
            {(
              [
                "ISO 9001",
                "ISO 14001",
                "ISO 45001",
                "ISO 27001",
              ] as ISOStandard[]
            ).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-input"
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Version</label>
          <input
            className="form-input"
            placeholder="v1.0"
            value={form.version}
            onChange={(e) =>
              setForm((f) => ({ ...f, version: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Document Owner</label>
          <input
            className="form-input"
            placeholder="Name"
            value={form.owner}
            onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))}
          />
        </div>
      </div>
    </Modal>
  );
}
