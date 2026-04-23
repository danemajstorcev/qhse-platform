import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import type { Incident, IncidentSeverity, IncidentStatus } from '../../types'

const SEVERITY_BADGE: Record<IncidentSeverity, string> = {
  Critical:   'badge badge-critical',
  Major:      'badge badge-major',
  Minor:      'badge badge-minor',
  'Near Miss':'badge badge-warning',
}

const STATUS_BADGE: Record<IncidentStatus, string> = {
  Open:          'badge badge-open',
  Investigating: 'badge badge-investigating',
  Resolved:      'badge badge-resolved',
  Closed:        'badge badge-closed',
}

const STATUSES: IncidentStatus[] = ['Open', 'Investigating', 'Resolved', 'Closed']

interface Props {
  incident: Incident
  expanded: boolean
  onToggle: () => void
  onStatusChange: (status: IncidentStatus) => void
  onDelete: () => void
}

export default function IncidentRow({ incident, expanded, onToggle, onStatusChange, onDelete }: Props) {
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="incident-row-summary" onClick={onToggle}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text-muted)', width: 56, flexShrink: 0, overflow: 'hidden' }}>
          {incident.id}
        </span>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {incident.title}
        </span>
        <div className="incident-row-meta">
          <span className="incident-row-date" style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono, monospace' }}>
            {incident.date}
          </span>
          <span className={`${SEVERITY_BADGE[incident.severity]} badge-severity`}>{incident.severity}</span>
          <span className={STATUS_BADGE[incident.status]}>{incident.status}</span>
          {expanded
            ? <ChevronUp size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            : <ChevronDown size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          }
        </div>
      </div>

      {expanded && (
        <div className="row-detail-grid">
          <div>
            <Label>Description</Label>
            <Detail>{incident.description}</Detail>

            <Label style={{ marginTop: 12 }}>Location</Label>
            <Detail>{incident.location}</Detail>

            <Label style={{ marginTop: 12 }}>Reported By</Label>
            <Detail>{incident.reporter}</Detail>
          </div>

          <div>
            {incident.rootCause && (
              <>
                <Label>Root Cause</Label>
                <Detail style={{ marginBottom: 12 }}>{incident.rootCause}</Detail>
              </>
            )}
            {incident.correctiveAction && (
              <>
                <Label>Corrective Action</Label>
                <Detail style={{ marginBottom: 16 }}>{incident.correctiveAction}</Detail>
              </>
            )}

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
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

            <button
              className="btn btn-sm btn-danger"
              onClick={onDelete}
              style={{ display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <Trash2 size={12} /> Delete Incident
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 5, ...style }}>
      {children}
    </div>
  )
}

function Detail({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, ...style }}>
      {children}
    </div>
  )
}
