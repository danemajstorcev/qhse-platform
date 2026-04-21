import { useState } from 'react'
import { complianceData } from '../data/mockData'
import type { ISOStandard } from '../types'
import ComplianceOverview from '../components/Compliance/ComplianceOverview'
import ComplianceScoreBar from '../components/Compliance/ComplianceScoreBar'
import ComplianceItem from '../components/Compliance/ComplianceItem'
import ComplianceLegend from '../components/Compliance/ComplianceLegend'

type Status = 'Compliant' | 'Partial' | 'Non-Compliant' | 'N/A'

const STANDARDS: ISOStandard[] = ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001']

const STANDARD_COLORS: Record<ISOStandard, string> = {
  'ISO 9001': 'var(--blue)',
  'ISO 14001': 'var(--emerald)',
  'ISO 45001': '#FB923C',
  'ISO 27001': 'var(--accent-violet)',
}

function calcScore(items: { status: Status }[]) {
  const applicable = items.filter(i => i.status !== 'N/A')
  if (!applicable.length) return 0
  const compliant = items.filter(i => i.status === 'Compliant').length
  const partial = items.filter(i => i.status === 'Partial').length
  return Math.round(((compliant + partial * 0.5) / applicable.length) * 100)
}

export default function ComplianceChecklist() {
  const [activeStandard, setActiveStandard] = useState<ISOStandard>('ISO 9001')
  const [items, setItems] = useState(complianceData)

  const currentItems = items[activeStandard] || []
  const score = calcScore(currentItems as { status: Status }[])
  const color = STANDARD_COLORS[activeStandard]

  const handleStatusChange = (id: string, status: Status) => {
    setItems(prev => ({
      ...prev,
      [activeStandard]: prev[activeStandard].map(i => i.id === id ? { ...i, status } : i),
    }))
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Compliance Checklist</h1>
          <p>Track clause-level compliance across ISO standards</p>
        </div>
      </div>

      <ComplianceOverview
        data={items as Record<string, { status: Status }[]>}
        activeStandard={activeStandard}
        onSelect={setActiveStandard}
      />

      <div className="card">
        <div className="tabs">
          {STANDARDS.map(s => (
            <button
              key={s}
              className={`tab-btn ${activeStandard === s ? 'active' : ''}`}
              style={activeStandard === s ? { color: STANDARD_COLORS[s], borderBottomColor: STANDARD_COLORS[s] } : {}}
              onClick={() => setActiveStandard(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <ComplianceScoreBar score={score} color={color} />

        <div>
          {currentItems.map(item => (
            <ComplianceItem
              key={item.id}
              item={item as { id: string; clause: string; requirement: string; status: Status; evidence?: string; lastAudited?: string }}
              clauseColor={color}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        <ComplianceLegend items={currentItems as { status: Status }[]} />
      </div>
    </div>
  )
}
