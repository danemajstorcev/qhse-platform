import { useState } from 'react'
import { Plus } from 'lucide-react'
import { risks as initialRisks } from '../data/mockData'
import type { Risk } from '../types'
import RiskLevelStats from '../components/Risk/RiskLevelStats'
import RiskMatrix from '../components/Risk/RiskMatrix'
import RiskFormulaCard from '../components/Risk/RiskFormulaCard'
import RiskRegisterTable from '../components/Risk/RiskRegisterTable'
import AddRiskModal from '../components/Risk/AddRiskModal'

export default function RiskAssessment() {
  const [risks, setRisks] = useState(initialRisks)
  const [showModal, setShowModal] = useState(false)

  const handleAdd = (riskData: Omit<Risk, 'id'>) => {
    const newRisk: Risk = {
      id: `R${String(risks.length + 1).padStart(3, '0')}`,
      ...riskData,
    }
    setRisks(prev => [newRisk, ...prev])
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Risk Assessment</h1>
          <p>{risks.length} risks tracked across all departments</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Add Risk
          </button>
        </div>
      </div>

      <RiskLevelStats risks={risks} />

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <RiskMatrix risks={risks} />
        <RiskFormulaCard />
      </div>

      <RiskRegisterTable risks={risks} />

      {showModal && (
        <AddRiskModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  )
}
