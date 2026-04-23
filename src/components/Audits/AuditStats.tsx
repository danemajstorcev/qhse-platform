import StatCard from "../ui/StatCard";
import type { Audit } from "../../types";

interface Props {
  audits: Audit[];
}

export default function AuditStats({ audits }: Props) {
  const planned = audits.filter((a) => a.status === "Planned").length;
  const inProgress = audits.filter((a) => a.status === "In Progress").length;
  const completed = audits.filter((a) => a.status === "Completed").length;
  const findings = audits.flatMap((a) => a.findings);
  const openFindings = findings.filter((f) => f.status === "Open").length;
  const majorNCs = findings.filter(
    (f) => f.type === "Major NC" && f.status === "Open",
  ).length;

  return (
    <div className="stat-grid stat-grid-5">
      <StatCard value={planned} label="Planned" color="var(--blue)" />
      <StatCard value={inProgress} label="In Progress" color="var(--amber)" />
      <StatCard value={completed} label="Completed" color="var(--emerald)" />
      <StatCard
        value={openFindings}
        label="Open Findings"
        color="var(--accent-violet)"
      />
      <StatCard value={majorNCs} label="Open Major NCs" color="var(--red)" />
    </div>
  );
}
