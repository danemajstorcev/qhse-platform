import { useState } from "react";
import { Plus, Download } from "lucide-react";
import type { Risk } from "../types";
import RiskLevelStats from "../components/Risk/RiskLevelStats";
import RiskMatrix from "../components/Risk/RiskMatrix";
import RiskFormulaCard from "../components/Risk/RiskFormulaCard";
import RiskRegisterTable from "../components/Risk/RiskRegisterTable";
import AddRiskModal from "../components/Risk/AddRiskModal";
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
  risks: Risk[];
  onRisksChange: (risks: Risk[]) => void;
}

export default function RiskAssessment({ risks, onRisksChange }: Props) {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (riskData: Omit<Risk, "id">) => {
    onRisksChange([
      {
        id: `R${String(risks.length + 1).padStart(3, "0")}`,
        ...riskData,
      },
      ...risks,
    ]);
    toast(
      `Risk "${riskData.title}" added as ${riskData.level}`,
      riskData.level === "Critical"
        ? "error"
        : riskData.level === "High"
          ? "warning"
          : "success",
    );
  };

  const handleDelete = (id: string) => {
    const risk = risks.find((r) => r.id === id);
    onRisksChange(risks.filter((r) => r.id !== id));
    toast(`Risk "${risk?.title}" removed`, "warning");
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Title",
      "Department",
      "Likelihood",
      "Severity",
      "Score",
      "Level",
      "Standard",
      "Owner",
      "Controls",
      "Review Date",
    ];
    const rows = risks.map((r) => [
      r.id,
      r.title,
      r.department,
      r.likelihood,
      r.severity,
      r.score,
      r.level,
      r.standard,
      r.owner,
      r.controls,
      r.reviewDate,
    ]);
    downloadCSV([headers, ...rows], "risk-register.csv");
    toast("Risk register exported");
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Risk Assessment</h1>
          <p>{risks.length} risks tracked across all departments</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={15} /> Export CSV
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={15} /> Add Risk
          </button>
        </div>
      </div>

      <RiskLevelStats risks={risks} />

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <RiskMatrix risks={risks} />
        <RiskFormulaCard />
      </div>

      <RiskRegisterTable risks={risks} onDelete={handleDelete} />

      {showModal && (
        <AddRiskModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  );
}
