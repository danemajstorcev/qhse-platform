import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Plus,
  CheckCircle,
} from "lucide-react";
import type {
  Audit,
  AuditStatus,
  AuditFinding,
  FindingType,
} from "../../types";
import ISOChip from "../ui/ISOChip";
import AddFindingModal from "./AddFindingModal";

const STATUS_BADGE: Record<AuditStatus, string> = {
  Planned: "badge badge-planned",
  "In Progress": "badge badge-investigating",
  Completed: "badge badge-compliant",
  Overdue: "badge badge-overdue",
};

const FINDING_BADGE: Record<FindingType, string> = {
  "Major NC": "badge badge-critical",
  "Minor NC": "badge badge-warning",
  Observation: "badge badge-info",
  Opportunity: "badge badge-muted",
};

const STATUSES: AuditStatus[] = ["Planned", "In Progress", "Completed"];

interface Props {
  audit: Audit;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (status: AuditStatus) => void;
  onDelete: () => void;
  onAddFinding: (finding: Omit<AuditFinding, "id">) => void;
  onCloseFinding: (findingId: string) => void;
}

export default function AuditRow({
  audit,
  expanded,
  onToggle,
  onStatusChange,
  onDelete,
  onAddFinding,
  onCloseFinding,
}: Props) {
  const [showFindingModal, setShowFindingModal] = useState(false);
  const openFindings = audit.findings.filter((f) => f.status === "Open").length;

  return (
    <>
      <div style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="audit-row-summary" onClick={onToggle}>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              color: "var(--text-muted)",
              width: 56,
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            {audit.id}
          </span>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-primary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {audit.title}
            </div>
            <div
              style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}
            >
              {audit.type} · {audit.auditor}
            </div>
          </div>

          <div className="audit-row-meta">
            <span className="audit-row-date">{audit.scheduledDate}</span>
            <ISOChip standard={audit.standard} />
            <span className={STATUS_BADGE[audit.status]}>{audit.status}</span>
            <span
              className="audit-findings-count"
              style={{
                fontSize: 11,
                color: openFindings > 0 ? "var(--red)" : "var(--text-muted)",
                whiteSpace: "nowrap",
                fontWeight: openFindings > 0 ? 700 : 400,
              }}
            >
              {audit.findings.length} finding
              {audit.findings.length !== 1 ? "s" : ""}
              {openFindings > 0 && ` (${openFindings} open)`}
            </span>
            {expanded ? (
              <ChevronUp
                size={14}
                style={{ color: "var(--text-muted)", flexShrink: 0 }}
              />
            ) : (
              <ChevronDown
                size={14}
                style={{ color: "var(--text-muted)", flexShrink: 0 }}
              />
            )}
          </div>
        </div>

        {expanded && (
          <div style={{ paddingBottom: 20 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: 0.8,
                marginBottom: 6,
              }}
            >
              Audit Scope
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              {audit.scope || (
                <span
                  style={{ fontStyle: "italic", color: "var(--text-muted)" }}
                >
                  No scope defined.
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 20,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                Status:
              </span>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  className={`btn btn-sm ${audit.status === s ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => onStatusChange(s)}
                >
                  {s}
                </button>
              ))}
              <button
                className="btn btn-sm btn-danger"
                onClick={onDelete}
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                Findings{" "}
                {audit.findings.length > 0 && `(${audit.findings.length})`}
              </div>
              <button
                className="btn btn-sm btn-ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFindingModal(true);
                }}
                style={{
                  color: "var(--accent)",
                  borderColor: "var(--accent-dim)",
                }}
              >
                <Plus size={12} /> Add Finding
              </button>
            </div>

            {audit.findings.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {audit.findings.map((f) => (
                  <FindingCard
                    key={f.id}
                    finding={f}
                    onClose={() => onCloseFinding(f.id)}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  padding: "16px",
                  textAlign: "center",
                  background: "var(--surface-raised)",
                  borderRadius: "var(--radius-sm)",
                  fontStyle: "italic",
                }}
              >
                No findings recorded. Use "Add Finding" to record observations.
              </div>
            )}
          </div>
        )}
      </div>

      {showFindingModal && (
        <AddFindingModal
          auditTitle={audit.title}
          onClose={() => setShowFindingModal(false)}
          onAdd={(finding) => {
            onAddFinding(finding);
            setShowFindingModal(false);
          }}
        />
      )}
    </>
  );
}

function FindingCard({
  finding,
  onClose,
}: {
  finding: AuditFinding;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: 12,
        background: "var(--surface-raised)",
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${finding.status === "Open" ? "var(--border)" : "var(--emerald-dim)"}`,
      }}
    >
      <span className={FINDING_BADGE[finding.type]} style={{ flexShrink: 0 }}>
        {finding.type}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          {finding.description}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            marginTop: 4,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          Clause {finding.clause}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <span
          className={`badge ${finding.status === "Open" ? "badge-open" : "badge-closed"}`}
        >
          {finding.status}
        </span>
        {finding.status === "Open" && (
          <button
            className="btn btn-sm btn-ghost"
            onClick={onClose}
            style={{
              color: "var(--emerald)",
              borderColor: "var(--emerald-dim)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <CheckCircle size={11} /> Close
          </button>
        )}
      </div>
    </div>
  );
}
