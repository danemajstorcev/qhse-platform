import { Sun, Moon, Bell, Menu } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import type { Page } from '../../types'

const pageTitles: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'QHSE KPI Overview' },
  risk: { title: 'Risk Assessment', subtitle: 'ISO 45001 · ISO 27001' },
  incidents: { title: 'Incident Tracking', subtitle: 'ISO 45001' },
  audits: { title: 'Audit Management', subtitle: 'All ISO Standards' },
  documents: { title: 'Document Control', subtitle: 'ISO 9001 · ISO 27001' },
  compliance: { title: 'Compliance Checklist', subtitle: 'ISO Suite' },
  environmental: { title: 'Environmental Tracker', subtitle: 'ISO 14001' },
}

interface Props {
  currentPage: Page
  onMenuClick: () => void
}

export default function Header({ currentPage, onMenuClick }: Props) {
  const { theme, toggleTheme } = useTheme()
  const { title, subtitle } = pageTitles[currentPage]

  return (
    <header className="header">
      <button className="icon-btn" onClick={onMenuClick} style={{ display: 'none' }} id="mobile-menu-btn"
        // show via CSS on mobile
      >
        <Menu size={18} />
      </button>
      <style>{`@media(max-width:768px){ #mobile-menu-btn { display:flex !important; } }`}</style>

      <div style={{ flex: 1 }}>
        <div className="header-title">{title}</div>
        <div className="header-subtitle">{subtitle}</div>
      </div>

      <div className="header-actions">
        <div className="role-chip">
          <span className="dot" />
          Admin
        </div>

        <button className="icon-btn" title="Notifications">
          <Bell size={16} />
        </button>

        <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  )
}
