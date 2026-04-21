import { ChevronDown, ChevronUp } from 'lucide-react'
import type { Audit, AuditStatus, AuditFinding, FindingType } from '../../types'
import ISOChip from '../ui/ISOChip'

const STATUS_BADGE: Record<AuditStatus, string> = {
  Planned: 'badge badge-planned',
  'In Progress': 'badge badge-investigating',
  Completed: 'badge badge-compliant',
  Overdue: 'badge badge-overdue',
}

const FINDING_BADGE: Record<FindingType, string> = {
  'Major NC': 'badge badge-critical',
  'Minor NC': 'badge badge-warning',
  Observation: 'badge badge-info',
  Opportunity: 'badge badge-muted',
}

const STATUSES: AuditStatus[] = ['Planned', 'In Progress', 'Completed']

interface Props {
  audit: Audit
  expanded: boolean
  onToggle: () => void
  onStatusChange: (status: AuditStatus) => void
}

export default function AuditRow({ audit, expanded, onToggle, onStatusChange }: Props) {
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 4px', cursor: 'pointer' }}
        onClick={onToggle}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text-muted)', minWidth: 60 }}>
          {audit.id}
        </span>
        <div style={{ flex: 1 }}>
          <div className="cell-primary" style={{ fontSize: 13 }}>{audit.title}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{audit.type} · {audit.auditor}</div>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 90, textAlign: 'right' }}>{audit.scheduledDate}</span>
        <ISOChip standard={audit.standard} />
        <span className={STATUS_BADGE[audit.status]}>{audit.status}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{audit.findings.length} findings</span>
        {expanded ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
      </div>

      {expanded && (
        <div style={{ padding: '0 4px 20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
            Audit Scope
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
            {audit.scope}
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {STATUSES.map(s => (
              <button
                key={s}
                className={`btn btn-sm ${audit.status === s ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => onStatusChange(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {audit.findings.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
                Findings
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {audit.findings.map(f => <FindingCard key={f.id} finding={f} />)}
              </div>
            </>
          )}

          {audit.findings.length === 0 && (
            <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '12px 0', fontStyle: 'italic' }}>
              No findings recorded yet
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function FindingCard({ finding }: { finding: AuditFinding }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: 12,
      background: 'var(--surface-raised)',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border)',
    }}>
      <span className={FINDING_BADGE[finding.type]} style={{ flexShrink: 0 }}>{finding.type}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{finding.description}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
          Clause {finding.clause}
        </div>
      </div>
      <span className={`badge ${finding.status === 'Open' ? 'badge-open' : 'badge-closed'}`}>{finding.status}</span>
    </div>
  )
}
