import { useState } from 'react'
import type { Risk } from '../../types'

const MATRIX_COLORS = [
  ['low',    'low',    'medium', 'medium',   'high'    ],
  ['low',    'medium', 'medium', 'high',     'high'    ],
  ['medium', 'medium', 'high',   'high',     'critical'],
  ['medium', 'high',   'high',   'critical', 'critical'],
  ['high',   'high',   'critical','critical','critical'],
]

interface Props {
  risks: Risk[]
}

export default function RiskMatrix({ risks }: Props) {
  const [hoveredCell, setHoveredCell] = useState<{ l: number; s: number } | null>(null)

  const getRisksAtCell = (l: number, s: number) =>
    risks.filter(r => r.likelihood === l && r.severity === s)

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Risk Matrix</div>
          <div className="card-subtitle">Likelihood × Severity — tap cells to see risks</div>
        </div>
      </div>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ minWidth: 300 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '28px repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, 48px) 28px',
            gap: 3,
          }}>
            <div style={{ gridRow: '1/6', gridColumn: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                fontSize: 10,
                color: 'var(--text-muted)',
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}>Likelihood</span>
            </div>

            {[5, 4, 3, 2, 1].map(likelihood =>
              [1, 2, 3, 4, 5].map(severity => {
                const cls       = MATRIX_COLORS[likelihood - 1][severity - 1]
                const cellRisks = getRisksAtCell(likelihood, severity)
                const isHovered = hoveredCell?.l === likelihood && hoveredCell?.s === severity

                return (
                  <div
                    key={`${likelihood}-${severity}`}
                    className={`matrix-cell ${cls}`}
                    style={{ gridRow: 6 - likelihood, gridColumn: severity + 1 }}
                    onMouseEnter={() => setHoveredCell({ l: likelihood, s: severity })}
                    onMouseLeave={() => setHoveredCell(null)}
                    onClick={() => setHoveredCell(
                      isHovered ? null : { l: likelihood, s: severity }
                    )}
                    title={cellRisks.length > 0 ? cellRisks.map(r => r.title).join(', ') : undefined}
                  >
                    {cellRisks.length > 0 && (
                      <span style={{
                        background: 'rgba(255,255,255,0.95)',
                        color: '#111',
                        borderRadius: '50%',
                        width: isHovered ? 24 : 20,
                        height: isHovered ? 24 : 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 800,
                        transition: 'all 0.15s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        flexShrink: 0,
                      }}>
                        {cellRisks.length}
                      </span>
                    )}
                  </div>
                )
              })
            )}

            <div style={{ gridRow: 6, gridColumn: 1 }} />
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} style={{
                gridRow: 6, gridColumn: s + 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, color: 'var(--text-muted)', fontWeight: 600,
              }}>{s}</div>
            ))}
          </div>

          <div style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>
            Severity
          </div>
        </div>
      </div>

      {hoveredCell && getRisksAtCell(hoveredCell.l, hoveredCell.s).length > 0 && (
        <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--surface-raised)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>
            L={hoveredCell.l} × S={hoveredCell.s} — Score {hoveredCell.l * hoveredCell.s}
          </div>
          {getRisksAtCell(hoveredCell.l, hoveredCell.s).map(r => (
            <div key={r.id} style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '3px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, flexShrink: 0 }}>{r.id}</span>
              <span>{r.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
