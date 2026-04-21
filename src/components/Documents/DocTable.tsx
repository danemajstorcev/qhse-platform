import { FileText } from 'lucide-react'
import type { Document, DocStatus } from '../../types'
import ISOChip from '../ui/ISOChip'

const STATUS_BADGE: Record<DocStatus, string> = {
  Approved: 'badge badge-compliant',
  'Pending Review': 'badge badge-warning',
  Draft: 'badge badge-muted',
  Obsolete: 'badge badge-na',
}

interface Props {
  documents: Document[]
  onBumpVersion: (id: string) => void
  onChangeStatus: (id: string, status: DocStatus) => void
}

export default function DocTable({ documents, onBumpVersion, onChangeStatus }: Props) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Standard</th>
            <th>Category</th>
            <th>Version</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td><span className="cell-mono">{doc.id}</span></td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="doc-icon">
                    <FileText size={15} style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <span className="cell-primary">{doc.title}</span>
                </div>
              </td>
              <td><ISOChip standard={doc.standard} /></td>
              <td style={{ fontSize: 12 }}>{doc.category}</td>
              <td>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--accent)', fontWeight: 700 }}>
                  {doc.version}
                </span>
              </td>
              <td><span className={STATUS_BADGE[doc.status]}>{doc.status}</span></td>
              <td style={{ fontSize: 12 }}>{doc.owner}</td>
              <td style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>{doc.lastModified}</td>
              <td>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-sm btn-secondary" onClick={() => onBumpVersion(doc.id)}>Rev</button>
                  {doc.status === 'Pending Review' && (
                    <button className="btn btn-sm btn-primary" onClick={() => onChangeStatus(doc.id, 'Approved')}>Approve</button>
                  )}
                  {doc.status !== 'Obsolete' && (
                    <button className="btn btn-sm btn-danger" onClick={() => onChangeStatus(doc.id, 'Obsolete')}>Obsolete</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
