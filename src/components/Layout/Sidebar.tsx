import { LayoutDashboard, AlertTriangle, Siren, ClipboardCheck, FolderOpen, CheckSquare, Leaf, ChevronLeft, ChevronRight, Shield } from 'lucide-react'
import type { Page } from '../../types'

interface Props {
  currentPage: Page
  onNavigate: (page: Page) => void
  collapsed: boolean
  onToggleCollapse: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

const navItems: { page: Page; label: string; icon: React.ElementType; badge?: number }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'risk', label: 'Risk Assessment', icon: AlertTriangle, badge: 3 },
  { page: 'incidents', label: 'Incidents', icon: Siren, badge: 2 },
  { page: 'audits', label: 'Audit Management', icon: ClipboardCheck },
  { page: 'documents', label: 'Document Control', icon: FolderOpen },
  { page: 'compliance', label: 'Compliance', icon: CheckSquare },
  { page: 'environmental', label: 'Environmental', icon: Leaf },
]

export default function Sidebar({ currentPage, onNavigate, collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: Props) {
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
          {navItems.map(({ page, label, icon: Icon, badge }) => (
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
                  {badge && badge > 0 && (
                    <span className="nav-badge">{badge}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-toggle-btn" onClick={onToggleCollapse}>
            {collapsed ? <ChevronRight size={16} /> : (
              <>
                <ChevronLeft size={16} />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
