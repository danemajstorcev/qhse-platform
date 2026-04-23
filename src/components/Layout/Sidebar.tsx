import {
  LayoutDashboard, AlertTriangle, Siren, ClipboardCheck,
  FolderOpen, CheckSquare, Leaf, ChevronLeft, ChevronRight, Shield,
} from 'lucide-react'
import type { Page } from '../../types'

interface NavItem {
  page: Page
  label: string
  icon: React.ElementType
  getBadge?: (counts: BadgeCounts) => number
}

interface BadgeCounts {
  openIncidentCount: number
  criticalRiskCount: number
}

const NAV_ITEMS: NavItem[] = [
  { page: 'dashboard',    label: 'Dashboard',         icon: LayoutDashboard },
  { page: 'risk',         label: 'Risk Assessment',   icon: AlertTriangle,   getBadge: c => c.criticalRiskCount },
  { page: 'incidents',    label: 'Incidents',          icon: Siren,           getBadge: c => c.openIncidentCount },
  { page: 'audits',       label: 'Audit Management',  icon: ClipboardCheck },
  { page: 'documents',    label: 'Document Control',  icon: FolderOpen },
  { page: 'compliance',   label: 'Compliance',         icon: CheckSquare },
  { page: 'environmental',label: 'Environmental',      icon: Leaf },
]

interface Props {
  currentPage: Page
  onNavigate: (page: Page) => void
  collapsed: boolean
  onToggleCollapse: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
  openIncidentCount: number
  criticalRiskCount: number
}

export default function Sidebar({
  currentPage, onNavigate, collapsed, onToggleCollapse,
  mobileOpen, onCloseMobile, openIncidentCount, criticalRiskCount,
}: Props) {
  const counts: BadgeCounts = { openIncidentCount, criticalRiskCount }

  const handleNav = (page: Page) => {
    onNavigate(page)
    onCloseMobile()
  }

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onCloseMobile} />}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Shield size={16} color="#fff" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="sidebar-logo-text">
              <div className="brand">QHSE Suite</div>
              <div className="tagline">ISO Management</div>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {!collapsed && <div className="nav-section-label">Navigation</div>}

          {NAV_ITEMS.map(({ page, label, icon: Icon, getBadge }) => {
            const badge = getBadge ? getBadge(counts) : 0
            return (
              <button
                key={page}
                className={`nav-item ${currentPage === page ? 'active' : ''}`}
                onClick={() => handleNav(page)}
                title={collapsed ? label : undefined}
              >
                <Icon className="nav-item-icon" size={18} />
                {!collapsed && (
                  <>
                    <span style={{ flex: 1 }}>{label}</span>
                    {badge > 0 && <span className="nav-badge">{badge}</span>}
                  </>
                )}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-toggle-btn" onClick={onToggleCollapse}>
            {collapsed
              ? <ChevronRight size={16} />
              : <><ChevronLeft size={16} /><span>Collapse</span></>
            }
          </button>
        </div>
      </aside>
    </>
  )
}
