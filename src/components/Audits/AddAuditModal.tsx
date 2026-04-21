import { useState } from 'react'
import Modal from '../ui/Modal'
import type { Audit, ISOStandard } from '../../types'

interface FormData {
  title: string
  standard: ISOStandard
  type: 'Internal' | 'External'
  auditor: string
  date: string
  scope: string
}

const EMPTY_FORM: FormData = {
  title: '',
  standard: 'ISO 9001',
  type: 'Internal',
  auditor: '',
  date: '',
  scope: '',
}

interface Props {
  onClose: () => void
  onAdd: (audit: Omit<Audit, 'id'>) => void
}

export default function AddAuditModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)

  const handleSubmit = () => {
    onAdd({
      title: form.title,
      standard: form.standard,
      type: form.type,
      auditor: form.auditor,
      scheduledDate: form.date,
      status: 'Planned',
      scope: form.scope,
      findings: [],
    })
    onClose()
  }

  return (
    <Modal
      title="Schedule Audit"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!form.title}>Schedule</button>
        </>
      }
    >
      <div className="form-group">
        <label className="form-label">Audit Title</label>
        <input className="form-input" placeholder="e.g. ISO 9001 Internal Audit Q3" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
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
          <label className="form-label">Type</label>
          <select className="form-input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'Internal' | 'External' }))}>
            <option>Internal</option>
            <option>External</option>
          </select>
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Auditor</label>
          <input className="form-input" placeholder="Name or body" value={form.auditor} onChange={e => setForm(f => ({ ...f, auditor: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">Scheduled Date</label>
          <input className="form-input" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Scope</label>
        <textarea
          className="form-input"
          placeholder="Audit scope and objectives..."
          rows={3}
          style={{ resize: 'vertical' }}
          value={form.scope}
          onChange={e => setForm(f => ({ ...f, scope: e.target.value }))}
        />
      </div>
    </Modal>
  )
}
