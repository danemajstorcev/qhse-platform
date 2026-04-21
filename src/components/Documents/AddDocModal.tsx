import { useState } from 'react'
import Modal from '../ui/Modal'
import type { Document, ISOStandard } from '../../types'

interface FormData {
  title: string
  standard: ISOStandard
  version: string
  category: string
  owner: string
}

const EMPTY_FORM: FormData = {
  title: '',
  standard: 'ISO 9001',
  version: 'v1.0',
  category: 'Procedure',
  owner: '',
}

const CATEGORIES = ['Policy', 'Procedure', 'Plan', 'Register', 'Form', 'Methodology', 'Guideline']

interface Props {
  onClose: () => void
  onAdd: (doc: Omit<Document, 'id'>) => void
}

export default function AddDocModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)

  const handleSubmit = () => {
    onAdd({
      ...form,
      status: 'Draft',
      lastModified: new Date().toISOString().split('T')[0],
    })
    onClose()
  }

  return (
    <Modal
      title="New Document"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!form.title}>Create Document</button>
        </>
      }
    >
      <div className="form-group">
        <label className="form-label">Document Title</label>
        <input className="form-input" placeholder="e.g. Quality Management Policy" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">ISO Standard</label>
          <select className="form-input" value={form.standard} onChange={e => setForm(f => ({ ...f, standard: e.target.value as ISOStandard }))}>
            {(['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001'] as ISOStandard[]).map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Version</label>
          <input className="form-input" placeholder="v1.0" value={form.version} onChange={e => setForm(f => ({ ...f, version: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">Document Owner</label>
          <input className="form-input" placeholder="Name" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} />
        </div>
      </div>
    </Modal>
  )
}
