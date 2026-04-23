import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./pages/Dashboard";
import RiskAssessment from "./pages/RiskAssessment";
import IncidentTracking from "./pages/IncidentTracking";
import AuditManagement from "./pages/AuditManagement";
import DocumentControl from "./pages/DocumentControl";
import ComplianceChecklist from "./pages/ComplianceChecklist";
import EnvironmentalTracker from "./pages/EnvironmentalTracker";
import {
  risks as initialRisks,
  incidents as initialIncidents,
} from "./data/mockData";
import type { Page } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [risks, setRisks] = useState(initialRisks);
  const [incidents, setIncidents] = useState(initialIncidents);

  const openIncidentCount = incidents.filter(
    (i) => i.status === "Open" || i.status === "Investigating",
  ).length;
  const criticalRiskCount = risks.filter((r) => r.level === "Critical").length;

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard risks={risks} incidents={incidents} />;
      case "risk":
        return <RiskAssessment risks={risks} onRisksChange={setRisks} />;
      case "incidents":
        return (
          <IncidentTracking
            incidents={incidents}
            onIncidentsChange={setIncidents}
          />
        );
      case "audits":
        return <AuditManagement />;
      case "documents":
        return <DocumentControl />;
      case "compliance":
        return <ComplianceChecklist />;
      case "environmental":
        return <EnvironmentalTracker />;
      default:
        return <Dashboard risks={risks} incidents={incidents} />;
    }
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="app-shell">
          <Sidebar
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
            mobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
            openIncidentCount={openIncidentCount}
            criticalRiskCount={criticalRiskCount}
          />
          <div
            className={`main-area ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
          >
            <Header
              currentPage={currentPage}
              onMenuClick={() => setMobileOpen((o) => !o)}
            />
            <main className="page-content">
              <div key={currentPage} className="page-enter">
                {renderPage()}
              </div>
            </main>
          </div>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}
