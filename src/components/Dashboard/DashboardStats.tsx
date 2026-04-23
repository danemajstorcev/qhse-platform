import StatCard from '../ui/StatCard'

interface Props {
  openIncidents: number
  criticalRisks: number
  upcomingAudits: number
  overallCompliance: number
  prevOpenIncidents?: number
  prevCompliance?: number
}

export default function DashboardStats({
  openIncidents,
  criticalRisks,
  upcomingAudits,
  overallCompliance,
}: Props) {
  const complianceChange = overallCompliance >= 80 ? '↑ On track' : overallCompliance >= 60 ? '⚠ Needs attention' : '↓ Action required'
  const complianceType   = overallCompliance >= 80 ? 'positive' : overallCompliance >= 60 ? 'neutral' : 'negative'

  return (
    <div className="stat-grid">
      <StatCard
        value={openIncidents}
        label="Open Incidents"
        color="var(--red)"
        change={openIncidents === 0 ? '✓ All resolved' : `${openIncidents} require action`}
        changeType={openIncidents === 0 ? 'positive' : 'negative'}
      />
      <StatCard
        value={criticalRisks}
        label="Critical Risks"
        color="#FB923C"
        change={criticalRisks === 0 ? '✓ No critical risks' : 'Immediate action required'}
        changeType={criticalRisks === 0 ? 'positive' : 'negative'}
      />
      <StatCard
        value={upcomingAudits}
        label="Active Audits"
        color="var(--amber)"
        change={upcomingAudits === 0 ? 'No active audits' : `${upcomingAudits} in progress`}
        changeType={upcomingAudits === 0 ? 'neutral' : 'neutral'}
      />
      <StatCard
        value={`${overallCompliance}%`}
        label="Overall Compliance"
        color="var(--emerald)"
        change={complianceChange}
        changeType={complianceType}
      />
    </div>
  )
}
