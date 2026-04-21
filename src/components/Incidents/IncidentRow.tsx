import { ChevronDown, ChevronUp } from 'lucide-react'
import type { Incident, IncidentSeverity, IncidentStatus } from '../../types'

const SEVERITY_BADGE: Record<IncidentSeverity, string> = {
  Critical: 'badge badge-critical',
  Major: 'badge badge-major',
  Minor: 'badge badge-minor',
  'Near Miss': 'badge badge-warning',
}

const STATUS_BADGE: Record<IncidentStatus, string> = {
  Open: 'badge badge-open',
  Investigating: 'badge badge-investigating',
  Resolved: 'badge badge-resolved',
  Closed: 'badge badge-closed',
}

const STATUSES: IncidentStatus[] = ['Open', 'Investigating', 'Resolved', 'Closed']

interface Props {
  incident: Incident
  expanded: boolean
  onToggle: () => void
  onStatusChange: (status: IncidentStatus) => void
}

export default function IncidentRow({ incident, expanded, onToggle, onStatusChange }: Props) {
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 4px', cursor: 'pointer' }}
        onClick={onToggle}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text-muted)', minWidth: 60 }}>
          {incident.id}
        </span>
        <span className="cell-primary" style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {incident.title}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 90 }}>{incident.date}</span>
        <span className={SEVERITY_BADGE[incident.severity]}>{incident.severity}</span>
        <span className={STATUS_BADGE[incident.status]}>{incident.status}</span>
        {expanded ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
      </div>

      {expanded && (
        <div style={{ padding: '0 4px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <SectionLabel>Description</SectionLabel>
            <DetailText>{incident.description}</DetailText>

            <SectionLabel style={{ marginTop: 12 }}>Location</SectionLabel>
            <DetailText>{incident.location}</DetailText>

            <SectionLabel style={{ marginTop: 12 }}>Reported By</SectionLabel>
            <DetailText>{incident.reporter}</DetailText>
          </div>

          <div>
            {incident.rootCause && (
              <>
                <SectionLabel>Root Cause</SectionLabel>
                <DetailText style={{ marginBottom: 12 }}>{incident.rootCause}</DetailText>
              </>
            )}
            {incident.correctiveAction && (
              <>
                <SectionLabel>Corrective Action</SectionLabel>
                <DetailText style={{ marginBottom: 16 }}>{incident.correctiveAction}</DetailText>
              </>
            )}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {STATUSES.map(s => (
                <button
                  key={s}
                  className={`btn btn-sm ${incident.status === s ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => onStatusChange(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6, ...style }}>
      {children}
    </div>
  )
}

function DetailText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, ...style }}>
      {children}
    </div>
  )
}
