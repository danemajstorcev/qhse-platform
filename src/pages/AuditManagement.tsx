import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { audits as initialAudits } from "../data/mockData";
import type { Audit, AuditStatus, AuditFinding } from "../types";
import AuditStats from "../components/Audits/AuditStats";
import AuditRow from "../components/Audits/AuditRow";
import AddAuditModal from "../components/Audits/AddAuditModal";
import { useToast } from "../context/ToastContext";

function downloadCSV(rows: (string | number)[][], filename: string) {
  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

let findingCounter = 100;

export default function AuditManagement() {
  const { toast } = useToast();
  const [audits, setAudits] = useState(initialAudits);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [standardFilter, setStandardFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = audits.filter(
    (a) =>
      (standardFilter === "All" || a.standard === standardFilter) &&
      (statusFilter === "All" || a.status === statusFilter),
  );

  const handleAdd = (data: Omit<Audit, "id">) => {
    setAudits((prev) => [
      {
        id: `AUD${String(prev.length + 1).padStart(3, "0")}`,
        ...data,
      },
      ...prev,
    ]);
    toast(`Audit "${data.title}" scheduled`);
  };

  const handleStatusChange = (id: string, status: AuditStatus) => {
    setAudits((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    toast(`Audit status updated to ${status}`);
  };

  const handleDelete = (id: string) => {
    const audit = audits.find((a) => a.id === id);
    setAudits((prev) => prev.filter((a) => a.id !== id));
    if (expandedId === id) setExpandedId(null);
    toast(`Audit "${audit?.title}" deleted`, "warning");
  };

  const handleAddFinding = (
    auditId: string,
    finding: Omit<AuditFinding, "id">,
  ) => {
    setAudits((prev) =>
      prev.map((a) => {
        if (a.id !== auditId) return a;
        return {
          ...a,
          findings: [...a.findings, { ...finding, id: `F${++findingCounter}` }],
        };
      }),
    );
    toast(`${finding.type} finding added`);
  };

  const handleCloseFinding = (auditId: string, findingId: string) => {
    setAudits((prev) =>
      prev.map((a) => {
        if (a.id !== auditId) return a;
        return {
          ...a,
          findings: a.findings.map((f) =>
            f.id === findingId ? { ...f, status: "Closed" as const } : f,
          ),
        };
      }),
    );
    toast("Finding closed", "success");
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Title",
      "Standard",
      "Type",
      "Auditor",
      "Date",
      "Status",
      "Scope",
      "Total Findings",
      "Open Findings",
    ];
    const rows = audits.map((a) => [
      a.id,
      a.title,
      a.standard,
      a.type,
      a.auditor,
      a.scheduledDate,
      a.status,
      a.scope,
      a.findings.length,
      a.findings.filter((f) => f.status === "Open").length,
    ]);
    downloadCSV([headers, ...rows], "audit-schedule.csv");
    toast("Audit schedule exported");
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Audit Management</h1>
          <p>Plan, track and close internal & external ISO audits</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={15} /> Export CSV
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={15} /> Schedule Audit
          </button>
        </div>
      </div>

      <AuditStats audits={audits} />

      <div className="card">
        <div className="card-header">
          <div className="card-title">Audit Schedule</div>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {filtered.length} audits
          </span>
        </div>

        <div className="filter-bar">
          <select
            className="form-input"
            value={standardFilter}
            onChange={(e) => setStandardFilter(e.target.value)}
            style={{ width: 150 }}
          >
            {["All", "ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001"].map(
              (s) => (
                <option key={s}>{s}</option>
              ),
            )}
          </select>
          <select
            className="form-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 150 }}
          >
            {["All", "Planned", "In Progress", "Completed", "Overdue"].map(
              (s) => (
                <option key={s}>{s}</option>
              ),
            )}
          </select>
        </div>

        <div>
          {filtered.map((audit) => (
            <AuditRow
              key={audit.id}
              audit={audit}
              expanded={expandedId === audit.id}
              onToggle={() =>
                setExpandedId(expandedId === audit.id ? null : audit.id)
              }
              onStatusChange={(status) => handleStatusChange(audit.id, status)}
              onDelete={() => handleDelete(audit.id)}
              onAddFinding={(finding) => handleAddFinding(audit.id, finding)}
              onCloseFinding={(findingId) =>
                handleCloseFinding(audit.id, findingId)
              }
            />
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No audits match the current filters.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddAuditModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  );
}
