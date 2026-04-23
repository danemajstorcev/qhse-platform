import { useState } from 'react'
import EnvMetricCards from '../components/Environmental/EnvMetricCards'
import EnvTrendChart from '../components/Environmental/EnvTrendChart'
import EnvGoalsGrid from '../components/Environmental/EnvGoalsGrid'
import { useToast } from '../context/ToastContext'
import { envMetrics } from '../data/mockData'

type Metric = 'emissions' | 'waste' | 'energy' | 'water'

const METRIC_CONFIG = {
  emissions: { label: 'CO₂ Emissions',      unit: 'tCO₂e', color: '#EF4444', target: 100  },
  waste:     { label: 'Waste Generated',     unit: 'tonnes', color: '#F59E0B', target: 5   },
  energy:    { label: 'Energy Consumption',  unit: 'MWh',   color: '#60A5FA', target: 1500 },
  water:     { label: 'Water Usage',         unit: 'm³',    color: '#34D399', target: 220  },
}

function downloadCSV(rows: (string | number)[][], filename: string) {
  const csv  = rows.map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default function EnvironmentalTracker() {
  const { toast } = useToast()
  const [activeMetric, setActiveMetric] = useState<Metric>('emissions')

  const handleExportCSV = () => {
    const headers = ['Month', 'CO2 Emissions (tCO2e)', 'Waste (tonnes)', 'Energy (MWh)', 'Water (m3)']
    const rows    = envMetrics.map(m => [m.month, m.emissions, m.waste, m.energy, m.water])
    downloadCSV([headers, ...rows], 'environmental-metrics.csv')
    toast('Environmental metrics exported')
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Environmental Tracker</h1>
          <p>ISO 14001 — Monitor emissions, waste, energy & water consumption</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>Export CSV</button>
        </div>
      </div>

      <EnvMetricCards activeMetric={activeMetric} onSelect={setActiveMetric} />
      <EnvTrendChart  activeMetric={activeMetric} config={METRIC_CONFIG[activeMetric]} />
      <EnvGoalsGrid />
    </div>
  )
}
