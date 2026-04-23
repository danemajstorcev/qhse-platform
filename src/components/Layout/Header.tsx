import { useState } from 'react'
import { Sun, Moon, Bell, Menu } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import NotificationPanel from './NotificationPanel'
import type { Page } from '../../types'

const PAGE_TITLES: Record<Page, { title: string; subtitle: string }> = {
  dashboard:    { title: 'Dashboard',            subtitle: 'QHSE KPI Overview' },
  risk:         { title: 'Risk Assessment',       subtitle: 'ISO 45001 · ISO 27001' },
  incidents:    { title: 'Incident Tracking',     subtitle: 'ISO 45001' },
  audits:       { title: 'Audit Management',      subtitle: 'All ISO Standards' },
  documents:    { title: 'Document Control',      subtitle: 'ISO 9001 · ISO 27001' },
  compliance:   { title: 'Compliance Checklist',  subtitle: 'ISO Suite' },
  environmental:{ title: 'Environmental Tracker', subtitle: 'ISO 14001' },
}

const UNREAD_COUNT = 4

interface Props {
  currentPage: Page
  onMenuClick: () => void
}

export default function Header({ currentPage, onMenuClick }: Props) {
  const { theme, toggleTheme } = useTheme()
  const { title, subtitle } = PAGE_TITLES[currentPage]
  const [showNotifs, setShowNotifs] = useState(false)

  return (
    <header className="header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="mobile-only" style={{ marginRight: -4 }}>
        <button className="icon-btn" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={18} />
        </button>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="header-title">{title}</div>
        <div className="header-subtitle">{subtitle}</div>
      </div>

      <div className="header-actions">
        <div className="role-chip desktop-only">
          <span className="dot" />
          <span>Admin</span>
        </div>

        <div className="icon-btn-wrap">
          <button
            className="icon-btn"
            aria-label="Notifications"
            onClick={() => setShowNotifs(v => !v)}
          >
            <Bell size={16} />
          </button>
          {UNREAD_COUNT > 0 && !showNotifs && <span className="notif-badge" />}
          {showNotifs && <NotificationPanel onClose={() => setShowNotifs(false)} />}
        </div>

        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  )
}
