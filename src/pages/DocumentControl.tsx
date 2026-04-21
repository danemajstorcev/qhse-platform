import { useState } from 'react'
import { Plus, Upload } from 'lucide-react'
import { documents as initialDocuments } from '../data/mockData'
import type { Document, DocStatus } from '../types'
import DocStats from '../components/Documents/DocStats'
import DocTable from '../components/Documents/DocTable'
import AddDocModal from '../components/Documents/AddDocModal'
import FilterBar from '../components/ui/FilterBar'

export default function DocumentControl() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [standardFilter, setStandardFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)

  const filtered = documents.filter(d =>
    (statusFilter === 'All' || d.status === statusFilter) &&
    (standardFilter === 'All' || d.standard === standardFilter) &&
    (d.title.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase()))
  )

  const handleAdd = (data: Omit<Document, 'id'>) => {
    const newDoc: Document = {
      id: `DOC${String(documents.length + 1).padStart(3, '0')}`,
      ...data,
    }
    setDocuments(prev => [newDoc, ...prev])
  }

  const handleBumpVersion = (id: string) => {
    setDocuments(prev => prev.map(d => {
      if (d.id !== id) return d
      const match = d.version.match(/v(\d+)\.(\d+)/)
      if (!match) return d
      return {
        ...d,
        version: `v${match[1]}.${parseInt(match[2]) + 1}`,
        lastModified: new Date().toISOString().split('T')[0],
        status: 'Pending Review' as DocStatus,
      }
    }))
  }

  const handleChangeStatus = (id: string, status: DocStatus) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, status } : d))
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Document Control</h1>
          <p>Version-controlled ISO documentation with approval workflows</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary">
            <Upload size={15} /> Upload
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} /> New Document
          </button>
        </div>
      </div>

      <DocStats documents={documents} />

      <div className="card">
        <div className="card-header">
          <div className="card-title">Document Register</div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} documents</span>
        </div>

        <FilterBar search={search} onSearch={setSearch} placeholder="Search documents...">
          <select className="form-input" value={standardFilter} onChange={e => setStandardFilter(e.target.value)} style={{ width: 150 }}>
            {['All', 'ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="form-input" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 160 }}>
            {['All', 'Approved', 'Pending Review', 'Draft', 'Obsolete'].map(s => <option key={s}>{s}</option>)}
          </select>
        </FilterBar>

        <DocTable
          documents={filtered}
          onBumpVersion={handleBumpVersion}
          onChangeStatus={handleChangeStatus}
        />
      </div>

      {showModal && (
        <AddDocModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  )
}
