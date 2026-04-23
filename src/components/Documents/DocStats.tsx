import StatCard from "../ui/StatCard";
import type { Document } from "../../types";

interface Props {
  documents: Document[];
}

export default function DocStats({ documents }: Props) {
  return (
    <div className="stat-grid stat-grid-4">
      <StatCard
        value={documents.filter((d) => d.status === "Approved").length}
        label="Approved"
        color="var(--emerald)"
      />
      <StatCard
        value={documents.filter((d) => d.status === "Pending Review").length}
        label="Pending Review"
        color="var(--amber)"
      />
      <StatCard
        value={documents.filter((d) => d.status === "Draft").length}
        label="Draft"
        color="var(--text-muted)"
      />
      <StatCard
        value={documents.filter((d) => d.status === "Obsolete").length}
        label="Obsolete"
        color="var(--red)"
      />
    </div>
  );
}
