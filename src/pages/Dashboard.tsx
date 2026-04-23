import { complianceData, audits } from '../data/mockData'
import DashboardStats from '../components/Dashboard/DashboardStats'
import IncidentTrendChart from '../components/Dashboard/IncidentTrendChart'
import ComplianceByStandardChart from '../components/Dashboard/ComplianceByStandardChart'
import RiskDistributionChart from '../components/Dashboard/RiskDistributionChart'
import ActivityFeed from '../components/Dashboard/ActivityFeed'
import type { Risk, Incident } from '../types'

function getRiskDistribution(risks: Risk[]) {
  const counts: Record<string, number> = { Critical: 0, High: 0, Medium: 0, Low: 0 }
  risks.forEach(r => counts[r.level]++)
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

function getComplianceByStandard() {
  return Object.entries(complianceData).map(([standard, items]) => {
    const compliant = items.filter(i => i.status === 'Compliant').length
    const pct = Math.round((compliant / items.length) * 100)
    return { standard: standard.replace('ISO ', ''), pct }
  })
}

function downloadJSON(data: object, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = filename
  document.body.appendChild(a); a.click()
  document.body.removeChild(a); URL.revokeObjectURL(url)
}

interface Props {
  risks: Risk[]
  incidents: Incident[]
}

export default function Dashboard({ risks, incidents }: Props) {
  const openIncidents     = incidents.filter(i => i.status === 'Open' || i.status === 'Investigating').length
  const criticalRisks     = risks.filter(r => r.level === 'Critical').length
  const upcomingAudits    = audits.filter(a => a.status === 'Planned' || a.status === 'In Progress').length
  const allItems          = Object.values(complianceData).flat()
  const overallCompliance = Math.round((allItems.filter(i => i.status === 'Compliant').length / allItems.length) * 100)

  const riskDist            = getRiskDistribution(risks)
  const complianceStandards = getComplianceByStandard()

  const handleExportReport = () => {
    downloadJSON({
      generatedAt: new Date().toISOString(),
      kpis: { openIncidents, criticalRisks, upcomingAudits, overallCompliance },
      riskDistribution: riskDist,
      complianceByStandard: complianceStandards,
      totalRisks: risks.length,
      totalIncidents: incidents.length,
      totalAudits: audits.length,
    }, 'qhse-report.json')
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>QHSE Overview</h1>
          <p>Integrated management system across all ISO standards</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleExportReport}>Export Report</button>
        </div>
      </div>

      <DashboardStats
        openIncidents={openIncidents}
        criticalRisks={criticalRisks}
        upcomingAudits={upcomingAudits}
        overallCompliance={overallCompliance}
      />

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <IncidentTrendChart />
        <ComplianceByStandardChart data={complianceStandards} />
      </div>

      <div className="grid-left-main">
        <RiskDistributionChart data={riskDist} />
        <ActivityFeed />
      </div>
    </div>
  )
}
