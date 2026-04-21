import { useState } from 'react'
import { Plus } from 'lucide-react'
import { incidents as initialIncidents } from '../data/mockData'
import type { Incident, IncidentStatus } from '../types'
import IncidentStats from '../components/Incidents/IncidentStats'
import IncidentMonthlyChart from '../components/Incidents/IncidentMonthlyChart'
import IncidentRow from '../components/Incidents/IncidentRow'
import AddIncidentModal from '../components/Incidents/AddIncidentModal'
import FilterBar from '../components/ui/FilterBar'

export default function IncidentTracking() {
  const [incidents, setIncidents] = useState(initialIncidents)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [severityFilter, setSeverityFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = incidents.filter(i =>
    (statusFilter === 'All' || i.status === statusFilter) &&
    (severityFilter === 'All' || i.severity === severityFilter) &&
    (i.title.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()))
  )

  const handleAdd = (data: Omit<Incident, 'id'>) => {
    const newInc: Incident = {
      id: `INC${String(incidents.length + 1).padStart(3, '0')}`,
      ...data,
    }
    setIncidents(prev => [newInc, ...prev])
  }

  const handleStatusChange = (id: string, status: IncidentStatus) => {
    setIncidents(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Incident Tracking</h1>
          <p>{incidents.length} incidents logged — CAPA workflow management</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Report Incident
          </button>
        </div>
      </div>

      <IncidentStats incidents={incidents} />
      <IncidentMonthlyChart />

      <div className="card">
        <div className="card-header">
          <div className="card-title">Incident Register</div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} incidents</span>
        </div>

        <FilterBar search={search} onSearch={setSearch} placeholder="Search incidents...">
          <select className="form-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 150 }}>
            {['All', 'Open', 'Investigating', 'Resolved', 'Closed'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="form-input" value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} style={{ width: 150 }}>
            {['All', 'Critical', 'Major', 'Minor', 'Near Miss'].map(s => <option key={s}>{s}</option>)}
          </select>
        </FilterBar>

        <div>
          {filtered.map(inc => (
            <IncidentRow
              key={inc.id}
              incident={inc}
              expanded={expandedId === inc.id}
              onToggle={() => setExpandedId(expandedId === inc.id ? null : inc.id)}
              onStatusChange={status => handleStatusChange(inc.id, status)}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <AddIncidentModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  )
}
