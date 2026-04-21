import StatCard from '../ui/StatCard'
import type { Incident } from '../../types'

interface Props {
  incidents: Incident[]
}

export default function IncidentStats({ incidents }: Props) {
  const open = incidents.filter(i => i.status === 'Open').length
  const investigating = incidents.filter(i => i.status === 'Investigating').length
  const resolved = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length
  const critical = incidents.filter(i => i.severity === 'Critical').length

  return (
    <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
      <StatCard value={open} label="Open" color="var(--red)" />
      <StatCard value={investigating} label="Investigating" color="var(--amber)" />
      <StatCard value={resolved} label="Resolved / Closed" color="var(--emerald)" />
      <StatCard value={critical} label="Critical Severity" color="var(--accent-violet)" />
    </div>
  )
}
