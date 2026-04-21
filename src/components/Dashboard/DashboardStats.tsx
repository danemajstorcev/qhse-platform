import StatCard from '../ui/StatCard'

interface Props {
  openIncidents: number
  criticalRisks: number
  upcomingAudits: number
  overallCompliance: number
}

export default function DashboardStats({ openIncidents, criticalRisks, upcomingAudits, overallCompliance }: Props) {
  return (
    <div className="stat-grid">
      <StatCard value={openIncidents} label="Open Incidents" color="var(--red)" change="↑ 2 this week" changeType="negative" />
      <StatCard value={criticalRisks} label="Critical Risks" color="#FB923C" change="Immediate action required" changeType="negative" />
      <StatCard value={upcomingAudits} label="Active Audits" color="var(--amber)" change="Next: Jul 15" changeType="neutral" />
      <StatCard value={`${overallCompliance}%`} label="Overall Compliance" color="var(--emerald)" change="↑ 3% vs last quarter" changeType="positive" />
    </div>
  )
}
