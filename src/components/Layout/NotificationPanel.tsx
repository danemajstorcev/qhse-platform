import { useEffect, useRef } from 'react'
import { X, Bell } from 'lucide-react'

const NOTIFICATIONS = [
  { id: 1, text: <><strong>Critical risk escalated</strong> — Data breach via phishing (R002) moved to Critical.</>, time: '3d ago', dot: 'red', unread: true },
  { id: 2, text: <><strong>New incident reported</strong> — Oil spill at loading bay (INC008).</>, time: '2d ago', dot: 'red', unread: true },
  { id: 3, text: <><strong>Audit commenced</strong> — ISO 27001 Surveillance Audit is In Progress.</>, time: '1d ago', dot: 'blue', unread: true },
  { id: 4, text: <><strong>Document pending review</strong> — Information Security Policy submitted.</>, time: '2d ago', dot: 'amber', unread: true },
  { id: 5, text: <><strong>Non-compliance flagged</strong> — ISO 45001 §8.2 evacuation drill overdue.</>, time: '4d ago', dot: 'red', unread: false },
  { id: 6, text: <><strong>Document obsoleted</strong> — Supplier Evaluation Criteria (DOC011) marked obsolete.</>, time: '5d ago', dot: 'muted', unread: false },
  { id: 7, text: <><strong>Incident resolved</strong> — Slip on wet floor (INC003) closed out.</>, time: '1w ago', dot: 'muted', unread: false },
]

interface Props {
  onClose: () => void
}

export default function NotificationPanel({ onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  return (
    <div className="notif-panel" ref={ref}>
      <div className="notif-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bell size={15} style={{ color: 'var(--text-muted)' }} />
          <span className="notif-title">Notifications</span>
          {unreadCount > 0 && (
            <span style={{ background: 'var(--red)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 99 }}>
              {unreadCount}
            </span>
          )}
        </div>
        <button className="icon-btn" style={{ width: 28, height: 28 }} onClick={onClose}>
          <X size={14} />
        </button>
      </div>

      <div className="notif-list">
        {NOTIFICATIONS.map(n => (
          <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
            <div className={`notif-dot ${n.dot}`} />
            <div style={{ flex: 1 }}>
              <div className="notif-text">{n.text}</div>
              <div className="notif-time">{n.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="notif-footer">
        <button className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
          Mark all as read
        </button>
      </div>
    </div>
  )
}
