import { useState } from "react";
import { Plus, Download } from "lucide-react";
import type { Incident, IncidentStatus } from "../types";
import IncidentStats from "../components/Incidents/IncidentStats";
import IncidentMonthlyChart from "../components/Incidents/IncidentMonthlyChart";
import IncidentRow from "../components/Incidents/IncidentRow";
import AddIncidentModal from "../components/Incidents/AddIncidentModal";
import FilterBar from "../components/ui/FilterBar";
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

interface Props {
  incidents: Incident[];
  onIncidentsChange: (incidents: Incident[]) => void;
}

export default function IncidentTracking({
  incidents,
  onIncidentsChange,
}: Props) {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = incidents.filter(
    (i) =>
      (statusFilter === "All" || i.status === statusFilter) &&
      (severityFilter === "All" || i.severity === severityFilter) &&
      (i.title.toLowerCase().includes(search.toLowerCase()) ||
        i.id.toLowerCase().includes(search.toLowerCase())),
  );

  const handleAdd = (data: Omit<Incident, "id">) => {
    onIncidentsChange([
      {
        id: `INC${String(incidents.length + 1).padStart(3, "0")}`,
        ...data,
      },
      ...incidents,
    ]);
    toast(
      `Incident reported: ${data.title}`,
      data.severity === "Critical" ? "error" : "success",
    );
  };

  const handleStatusChange = (id: string, status: IncidentStatus) => {
    onIncidentsChange(
      incidents.map((i) => (i.id === id ? { ...i, status } : i)),
    );
    toast(
      `Incident status updated to ${status}`,
      status === "Closed" || status === "Resolved" ? "success" : "info",
    );
  };

  const handleDelete = (id: string) => {
    const inc = incidents.find((i) => i.id === id);
    onIncidentsChange(incidents.filter((i) => i.id !== id));
    if (expandedId === id) setExpandedId(null);
    toast(`Incident "${inc?.title}" deleted`, "warning");
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Title",
      "Date",
      "Location",
      "Severity",
      "Status",
      "Reporter",
      "Description",
    ];
    const rows = incidents.map((i) => [
      i.id,
      i.title,
      i.date,
      i.location,
      i.severity,
      i.status,
      i.reporter,
      i.description,
    ]);
    downloadCSV([headers, ...rows], "incidents.csv");
    toast("Incidents exported");
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Incident Tracking</h1>
          <p>{incidents.length} incidents logged — CAPA workflow management</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={15} /> Export CSV
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={15} /> Report Incident
          </button>
        </div>
      </div>

      <IncidentStats incidents={incidents} />
      <IncidentMonthlyChart />

      <div className="card">
        <div className="card-header">
          <div className="card-title">Incident Register</div>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {filtered.length} incidents
          </span>
        </div>

        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Search incidents..."
        >
          <select
            className="form-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 150 }}
          >
            {["All", "Open", "Investigating", "Resolved", "Closed"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            className="form-input"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            style={{ width: 150 }}
          >
            {["All", "Critical", "Major", "Minor", "Near Miss"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </FilterBar>

        <div>
          {filtered.map((inc) => (
            <IncidentRow
              key={inc.id}
              incident={inc}
              expanded={expandedId === inc.id}
              onToggle={() =>
                setExpandedId(expandedId === inc.id ? null : inc.id)
              }
              onStatusChange={(status) => handleStatusChange(inc.id, status)}
              onDelete={() => handleDelete(inc.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <p>No incidents match the current filters.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddIncidentModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
