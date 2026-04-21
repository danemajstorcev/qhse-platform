export type Theme = 'dark' | 'light'

export type Page =
  | 'dashboard'
  | 'risk'
  | 'incidents'
  | 'audits'
  | 'documents'
  | 'compliance'
  | 'environmental'

export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low'
export type IncidentSeverity = 'Critical' | 'Major' | 'Minor' | 'Near Miss'
export type IncidentStatus = 'Open' | 'Investigating' | 'Resolved' | 'Closed'
export type AuditStatus = 'Planned' | 'In Progress' | 'Completed' | 'Overdue'
export type FindingType = 'Major NC' | 'Minor NC' | 'Observation' | 'Opportunity'
export type DocStatus = 'Approved' | 'Pending Review' | 'Draft' | 'Obsolete'
export type ISOStandard = 'ISO 9001' | 'ISO 14001' | 'ISO 45001' | 'ISO 27001'

export interface Risk {
  id: string
  title: string
  department: string
  likelihood: number
  severity: number
  score: number
  level: RiskLevel
  controls: string
  owner: string
  reviewDate: string
  standard: ISOStandard
}

export interface Incident {
  id: string
  title: string
  date: string
  location: string
  severity: IncidentSeverity
  status: IncidentStatus
  reporter: string
  description: string
  rootCause?: string
  correctiveAction?: string
}

export interface Audit {
  id: string
  title: string
  standard: ISOStandard
  type: 'Internal' | 'External'
  auditor: string
  scheduledDate: string
  status: AuditStatus
  findings: AuditFinding[]
  scope: string
}

export interface AuditFinding {
  id: string
  type: FindingType
  description: string
  clause: string
  status: 'Open' | 'Closed'
}

export interface Document {
  id: string
  title: string
  standard: ISOStandard
  version: string
  status: DocStatus
  owner: string
  lastModified: string
  approvedBy?: string
  category: string
}

export interface ComplianceItem {
  id: string
  clause: string
  requirement: string
  status: 'Compliant' | 'Partial' | 'Non-Compliant' | 'N/A'
  evidence?: string
  lastAudited?: string
}

export interface EnvMetric {
  month: string
  emissions: number
  waste: number
  energy: number
  water: number
}

export interface KPI {
  label: string
  value: string | number
  change: number
  changeLabel: string
  color: string
}
