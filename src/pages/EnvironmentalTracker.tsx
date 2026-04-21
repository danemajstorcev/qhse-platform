import { useState } from 'react'
import EnvMetricCards from '../components/Environmental/EnvMetricCards'
import EnvTrendChart from '../components/Environmental/EnvTrendChart'
import EnvGoalsGrid from '../components/Environmental/EnvGoalsGrid'

type Metric = 'emissions' | 'waste' | 'energy' | 'water'

const METRIC_CONFIG = {
  emissions: { label: 'CO₂ Emissions', unit: 'tCO₂e', color: '#EF4444', target: 100 },
  waste: { label: 'Waste Generated', unit: 'tonnes', color: '#F59E0B', target: 5 },
  energy: { label: 'Energy Consumption', unit: 'MWh', color: '#60A5FA', target: 1500 },
  water: { label: 'Water Usage', unit: 'm³', color: '#34D399', target: 220 },
}

export default function EnvironmentalTracker() {
  const [activeMetric, setActiveMetric] = useState<Metric>('emissions')

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Environmental Tracker</h1>
          <p>ISO 14001 — Monitor emissions, waste, energy & water consumption</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary btn-sm">Export CSV</button>
        </div>
      </div>

      <EnvMetricCards activeMetric={activeMetric} onSelect={setActiveMetric} />
      <EnvTrendChart activeMetric={activeMetric} config={METRIC_CONFIG[activeMetric]} />
      <EnvGoalsGrid />
    </div>
  )
}
