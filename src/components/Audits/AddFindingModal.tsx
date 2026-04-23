import { useState } from 'react'
import Modal from '../ui/Modal'
import type { AuditFinding, FindingType } from '../../types'

interface FormData {
  type: FindingType
  description: string
  clause: string
}

const EMPTY_FORM: FormData = {
  type: 'Minor NC',
  description: '',
  clause: '',
}

const FINDING_TYPES: FindingType[] = ['Major NC', 'Minor NC', 'Observation', 'Opportunity']

const TYPE_DESCRIPTIONS: Record<FindingType, string> = {
  'Major NC':   'A significant failure to meet a requirement that affects the system\'s ability to achieve intended results.',
  'Minor NC':   'A single lapse or isolated failure against a specific requirement.',
  'Observation': 'A situation that, while not yet a nonconformity, may become one if not addressed.',
  'Opportunity': 'A suggestion for improvement beyond the current requirements.',
}

const TYPE_COLOR: Record<FindingType, string> = {
  'Major NC':   'var(--red)',
  'Minor NC':   'var(--amber)',
  'Observation': 'var(--blue)',
  'Opportunity': 'var(--text-muted)',
}

interface Props {
  auditTitle: string
  onClose: () => void
  onAdd: (finding: Omit<AuditFinding, 'id'>) => void
}

export default function AddFindingModal({ auditTitle, onClose, onAdd }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)

  const handleSubmit = () => {
    onAdd({
      type: form.type,
      description: form.description,
      clause: form.clause,
      status: 'Open',
    })
    onClose()
  }

  return (
    <Modal
      title="Add Finding"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!form.description || !form.clause}
          >
            Add Finding
          </button>
        </>
      }
    >
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20, padding: '8px 12px', background: 'var(--surface-raised)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--border)' }}>
        Audit: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{auditTitle}</span>
      </div>

      <div className="form-group" style={{ marginBottom: 10 }}>
        <label className="form-label">Finding Type</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
          {FINDING_TYPES.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setForm(f => ({ ...f, type: t }))}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${form.type === t ? TYPE_COLOR[t] : 'var(--border)'}`,
                background: form.type === t ? `${TYPE_COLOR[t]}18` : 'var(--surface-raised)',
                color: form.type === t ? TYPE_COLOR[t] : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 700,
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, lineHeight: 1.5 }}>
          {TYPE_DESCRIPTIONS[form.type]}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">ISO Clause Reference</label>
        <input
          className="form-input"
          placeholder="e.g. 8.2, A.9.4.3, 6.1.2"
          value={form.clause}
          onChange={e => setForm(f => ({ ...f, clause: e.target.value }))}
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Finding Description</label>
        <textarea
          className="form-input"
          placeholder="Describe the finding in detail. Include what was observed and where..."
          rows={4}
          style={{ resize: 'vertical' }}
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
      </div>
    </Modal>
  )
}
