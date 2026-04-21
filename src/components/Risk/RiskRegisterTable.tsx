import type { Risk, RiskLevel } from '../../types'
import ISOChip from '../ui/ISOChip'
import FilterBar from '../ui/FilterBar'
import { useState } from 'react'

const LEVEL_BADGE: Record<RiskLevel, string> = {
  Critical: 'badge badge-critical',
  High: 'badge badge-high',
  Medium: 'badge badge-medium',
  Low: 'badge badge-low',
}

const LEVEL_COLORS: Record<RiskLevel, string> = {
  Critical: 'var(--red)',
  High: '#FB923C',
  Medium: 'var(--amber)',
  Low: 'var(--emerald)',
}

const LEVEL_DIMS: Record<RiskLevel, string> = {
  Critical: 'var(--red-dim)',
  High: 'rgba(251,146,60,0.12)',
  Medium: 'var(--amber-dim)',
  Low: 'var(--emerald-dim)',
}

interface Props {
  risks: Risk[]
}

export default function RiskRegisterTable({ risks }: Props) {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [standardFilter, setStandardFilter] = useState('All')

  const departments = ['All', ...Array.from(new Set(risks.map(r => r.department)))]
  const standards = ['All', 'ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001']

  const filtered = risks.filter(r =>
    (deptFilter === 'All' || r.department === deptFilter) &&
    (standardFilter === 'All' || r.standard === standardFilter) &&
    (r.title.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Risk Register</div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{filtered.length} risks</span>
      </div>

      <FilterBar search={search} onSearch={setSearch} placeholder="Search risks...">
        <select className="form-input" value={deptFilter} onChange={e => setDeptFilter(e.target.value)} style={{ width: 160 }}>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="form-input" value={standardFilter} onChange={e => setStandardFilter(e.target.value)} style={{ width: 140 }}>
          {standards.map(s => <option key={s}>{s}</option>)}
        </select>
      </FilterBar>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Risk</th>
              <th>Department</th>
              <th>L × S</th>
              <th>Score</th>
              <th>Level</th>
              <th>Standard</th>
              <th>Owner</th>
              <th>Review Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td><span className="cell-mono">{r.id}</span></td>
                <td style={{ maxWidth: 220 }}><span className="cell-primary">{r.title}</span></td>
                <td>{r.department}</td>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{r.likelihood} × {r.severity}</td>
                <td>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    fontSize: 12,
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono, monospace',
                    background: LEVEL_DIMS[r.level],
                    color: LEVEL_COLORS[r.level],
                  }}>
                    {r.score}
                  </span>
                </td>
                <td><span className={LEVEL_BADGE[r.level]}>{r.level}</span></td>
                <td><ISOChip standard={r.standard} /></td>
                <td style={{ fontSize: 12 }}>{r.owner}</td>
                <td style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>{r.reviewDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
