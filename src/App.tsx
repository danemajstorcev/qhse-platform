import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Dashboard from './pages/Dashboard'
import RiskAssessment from './pages/RiskAssessment'
import IncidentTracking from './pages/IncidentTracking'
import AuditManagement from './pages/AuditManagement'
import DocumentControl from './pages/DocumentControl'
import ComplianceChecklist from './pages/ComplianceChecklist'
import EnvironmentalTracker from './pages/EnvironmentalTracker'
import type { Page } from './types'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />
      case 'risk': return <RiskAssessment />
      case 'incidents': return <IncidentTracking />
      case 'audits': return <AuditManagement />
      case 'documents': return <DocumentControl />
      case 'compliance': return <ComplianceChecklist />
      case 'environmental': return <EnvironmentalTracker />
      default: return <Dashboard />
    }
  }

  return (
    <ThemeProvider>
      <div className="app-shell">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(c => !c)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />
        <div className={`main-area ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Header
            currentPage={currentPage}
            onMenuClick={() => setMobileOpen(o => !o)}
          />
          <main className="page-content">
            {renderPage()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
