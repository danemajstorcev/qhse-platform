import { useState } from 'react'
import { Plus } from 'lucide-react'
import { audits as initialAudits } from '../data/mockData'
import type { Audit, AuditStatus } from '../types'
import AuditStats from '../components/Audits/AuditStats'
import AuditRow from '../components/Audits/AuditRow'
import AddAuditModal from '../components/Audits/AddAuditModal'

export default function AuditManagement() {
  const [audits, setAudits] = useState(initialAudits)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [standardFilter, setStandardFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)

  const filtered = audits.filter(a =>
    (standardFilter === 'All' || a.standard === standardFilter) &&
    (statusFilter === 'All' || a.status === statusFilter)
  )

  const handleAdd = (data: Omit<Audit, 'id'>) => {
    const newAudit: Audit = {
      id: `AUD${String(audits.length + 1).padStart(3, '0')}`,
      ...data,
    }
    setAudits(prev => [newAudit, ...prev])
  }

  const handleStatusChange = (id: string, status: AuditStatus) => {
    setAudits(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Audit Management</h1>
          <p>Plan, track and close internal & external ISO audits</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Schedule Audit
          </button>
        </div>
      </div>

      <AuditStats audits={audits} />

      <div className="card">
        <div className="card-header">
          <div className="card-title">Audit Schedule</div>
        </div>

        <div className="filter-bar">
          <select className="form-input" value={standardFilter} onChange={e => setStandardFilter(e.target.value)} style={{ width: 150 }}>
            {['All', 'ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="form-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 150 }}>
            {['All', 'Planned', 'In Progress', 'Completed', 'Overdue'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div>
          {filtered.map(audit => (
            <AuditRow
              key={audit.id}
              audit={audit}
              expanded={expandedId === audit.id}
              onToggle={() => setExpandedId(expandedId === audit.id ? null : audit.id)}
              onStatusChange={status => handleStatusChange(audit.id, status)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <AddAuditModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  )
}
