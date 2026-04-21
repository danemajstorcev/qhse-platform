import { useState } from 'react'
import Modal from '../ui/Modal'
import type { Risk, RiskLevel, ISOStandard } from '../../types'

function getLevel(l: number, s: number): RiskLevel {
  const score = l * s
  if (score >= 15) return 'Critical'
  if (score >= 9) return 'High'
  if (score >= 4) return 'Medium'
  return 'Low'
}

const LEVEL_BADGE: Record<RiskLevel, string> = {
  Critical: 'badge badge-critical',
  High: 'badge badge-high',
  Medium: 'badge badge-medium',
  Low: 'badge badge-low',
}

interface FormData {
  title: string
  department: string
  likelihood: string
  severity: string
  controls: string
  owner: string
  reviewDate: string
  standard: ISOStandard
}

const EMPTY_FORM: FormData = {
  title: '',
  department: '',
  likelihood: '3',
  severity: '3',
  controls: '',
  owner: '',
  reviewDate: '',
  standard: 'ISO 45001',
}

interface Props {
  onClose: () => void
  onAdd: (risk: Omit<Risk, 'id'>) => void
}

export default function AddRiskModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)

  const l = parseInt(form.likelihood)
  const s = parseInt(form.severity)
  const score = l * s
  const level = getLevel(l, s)

  const handleSubmit = () => {
    onAdd({ title: form.title, department: form.department, likelihood: l, severity: s, score, level, controls: form.controls, owner: form.owner, reviewDate: form.reviewDate, standard: form.standard })
    onClose()
  }

  return (
    <Modal
      title="Add New Risk"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!form.title || !form.department}>Add Risk</button>
        </>
      }
    >
      <div className="form-group">
        <label className="form-label">Risk Title</label>
        <input className="form-input" placeholder="Describe the risk..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Department</label>
          <input className="form-input" placeholder="e.g. Operations" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
        </div>
        <div className="form-group">
          <label className="form-label">Owner</label>
          <input className="form-input" placeholder="Name" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} />
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Likelihood (1–5)</label>
          <select className="form-input" value={form.likelihood} onChange={e => setForm(f => ({ ...f, likelihood: e.target.value }))}>
            {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Severity (1–5)</label>
          <select className="form-input" value={form.severity} onChange={e => setForm(f => ({ ...f, severity: e.target.value }))}>
            {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div style={{ padding: '12px 16px', background: 'var(--surface-raised)', borderRadius: 'var(--radius-sm)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Calculated score:</span>
        <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace' }}>{score}</span>
        <span className={LEVEL_BADGE[level]}>{level}</span>
      </div>

      <div className="form-group">
        <label className="form-label">ISO Standard</label>
        <select className="form-input" value={form.standard} onChange={e => setForm(f => ({ ...f, standard: e.target.value as ISOStandard }))}>
          {(['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001'] as ISOStandard[]).map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Control Measures</label>
        <input className="form-input" placeholder="Current controls in place..." value={form.controls} onChange={e => setForm(f => ({ ...f, controls: e.target.value }))} />
      </div>

      <div className="form-group">
        <label className="form-label">Review Date</label>
        <input className="form-input" type="date" value={form.reviewDate} onChange={e => setForm(f => ({ ...f, reviewDate: e.target.value }))} />
      </div>
    </Modal>
  )
}
