import type { Risk, Incident, Audit, Document, ComplianceItem, EnvMetric } from '../types'

export const risks: Risk[] = [
  { id: 'R001', title: 'Chemical spill in warehouse', department: 'Operations', likelihood: 2, severity: 5, score: 10, level: 'High', controls: 'Spill kits, PPE, training', owner: 'J. Morrison', reviewDate: '2024-06-15', standard: 'ISO 45001' },
  { id: 'R002', title: 'Data breach via phishing', department: 'IT', likelihood: 3, severity: 5, score: 15, level: 'Critical', controls: 'Email filtering, 2FA, training', owner: 'A. Chen', reviewDate: '2024-05-01', standard: 'ISO 27001' },
  { id: 'R003', title: 'Supplier quality failure', department: 'Procurement', likelihood: 3, severity: 4, score: 12, level: 'High', controls: 'Supplier audits, incoming inspection', owner: 'M. Patel', reviewDate: '2024-07-20', standard: 'ISO 9001' },
  { id: 'R004', title: 'Forklift pedestrian collision', department: 'Warehouse', likelihood: 2, severity: 4, score: 8, level: 'High', controls: 'Segregated lanes, speed limits, spotters', owner: 'T. Williams', reviewDate: '2024-05-30', standard: 'ISO 45001' },
  { id: 'R005', title: 'Refrigerant leak', department: 'Facilities', likelihood: 2, severity: 3, score: 6, level: 'Medium', controls: 'Regular maintenance, leak detection', owner: 'S. Brown', reviewDate: '2024-08-10', standard: 'ISO 14001' },
  { id: 'R006', title: 'Unauthorized system access', department: 'IT', likelihood: 2, severity: 4, score: 8, level: 'High', controls: 'Access controls, monitoring, audit logs', owner: 'A. Chen', reviewDate: '2024-06-01', standard: 'ISO 27001' },
  { id: 'R007', title: 'Noise-induced hearing loss', department: 'Production', likelihood: 3, severity: 3, score: 9, level: 'Medium', controls: 'Hearing protection, noise monitoring', owner: 'K. Davis', reviewDate: '2024-07-15', standard: 'ISO 45001' },
  { id: 'R008', title: 'Product contamination', department: 'Quality', likelihood: 1, severity: 5, score: 5, level: 'Medium', controls: 'HACCP, GMP, lab testing', owner: 'R. Garcia', reviewDate: '2024-09-01', standard: 'ISO 9001' },
  { id: 'R009', title: 'Excessive wastewater discharge', department: 'Production', likelihood: 2, severity: 4, score: 8, level: 'High', controls: 'Treatment plant, monitoring, permits', owner: 'L. Thompson', reviewDate: '2024-06-30', standard: 'ISO 14001' },
  { id: 'R010', title: 'Server room flood', department: 'IT', likelihood: 1, severity: 5, score: 5, level: 'Medium', controls: 'Elevated equipment, drainage, sensors', owner: 'A. Chen', reviewDate: '2024-08-20', standard: 'ISO 27001' },
  { id: 'R011', title: 'Manual handling injury', department: 'Warehouse', likelihood: 4, severity: 2, score: 8, level: 'High', controls: 'Ergonomic aids, training, job rotation', owner: 'T. Williams', reviewDate: '2024-05-15', standard: 'ISO 45001' },
  { id: 'R012', title: 'Document version mismatch', department: 'Quality', likelihood: 3, severity: 2, score: 6, level: 'Medium', controls: 'DMS, version control, training', owner: 'R. Garcia', reviewDate: '2024-07-01', standard: 'ISO 9001' },
]

export const incidents: Incident[] = [
  { id: 'INC001', title: 'Forklift near-miss at dock 3', date: '2024-04-15', location: 'Warehouse - Dock 3', severity: 'Near Miss', status: 'Closed', reporter: 'T. Williams', description: 'Forklift operator failed to yield at pedestrian crossing. No injury occurred.', rootCause: 'Inadequate signage and driver distraction', correctiveAction: 'Additional mirrors installed, refresher training completed' },
  { id: 'INC002', title: 'Chemical eye splash — acid', date: '2024-04-22', location: 'Lab B', severity: 'Major', status: 'Resolved', reporter: 'S. Brown', description: 'Technician splashed with dilute HCl during transfer. First aid applied, no permanent injury.', rootCause: 'PPE not worn, inadequate SOP compliance', correctiveAction: 'Mandatory PPE checks, SOP rewritten' },
  { id: 'INC003', title: 'Slip on wet floor — canteen', date: '2024-05-03', location: 'Canteen', severity: 'Minor', status: 'Closed', reporter: 'H. Wilson', description: 'Employee slipped on wet tile, minor bruising to knee. No lost time.', rootCause: 'Wet floor sign not deployed after mopping', correctiveAction: 'Updated cleaning checklist, new signage provided' },
  { id: 'INC004', title: 'Data server overheating', date: '2024-05-10', location: 'Server Room', severity: 'Critical', status: 'Investigating', reporter: 'A. Chen', description: 'Primary server cluster reached critical temperature. Emergency shutdown initiated.', rootCause: 'HVAC failure — pending investigation', correctiveAction: 'Temporary cooling deployed, HVAC under repair' },
  { id: 'INC005', title: 'Electrical fault — production line 2', date: '2024-05-18', location: 'Production', severity: 'Major', status: 'Open', reporter: 'K. Davis', description: 'Short circuit caused production stoppage and minor fire. No injuries. Property damage ~$4,000.', rootCause: 'Overloaded circuit breaker, maintenance deferred', correctiveAction: 'Under investigation' },
  { id: 'INC006', title: 'Unauthorized file access', date: '2024-05-20', location: 'IT Systems', severity: 'Critical', status: 'Investigating', reporter: 'A. Chen', description: 'Employee accessed restricted HR files outside role scope. Discovered via audit log review.', rootCause: 'Access rights misconfiguration after org restructure', correctiveAction: 'Access revoked, full access audit in progress' },
  { id: 'INC007', title: 'Vehicle reversing bump', date: '2024-05-25', location: 'Car Park', severity: 'Minor', status: 'Closed', reporter: 'J. Morrison', description: 'Company van reversed into safety barrier. Minor vehicle damage, no injury.', rootCause: 'Driver inattention, blind spot', correctiveAction: 'Reversing cameras to be retrofitted' },
  { id: 'INC008', title: 'Oil spill — loading bay', date: '2024-06-01', location: 'Loading Bay', severity: 'Major', status: 'Open', reporter: 'M. Patel', description: 'Hydraulic fluid leak from delivery vehicle. Approximately 20L spilled.', rootCause: 'Contractor vehicle not inspected on entry', correctiveAction: 'Contractor vehicle inspection checklist being developed' },
]

export const incidentTrend = [
  { month: 'Jan', critical: 1, major: 2, minor: 4, nearMiss: 3 },
  { month: 'Feb', critical: 0, major: 3, minor: 5, nearMiss: 4 },
  { month: 'Mar', critical: 2, major: 1, minor: 3, nearMiss: 6 },
  { month: 'Apr', critical: 0, major: 2, minor: 2, nearMiss: 5 },
  { month: 'May', critical: 2, major: 3, minor: 2, nearMiss: 3 },
  { month: 'Jun', critical: 1, major: 2, minor: 3, nearMiss: 4 },
]

export const audits: Audit[] = [
  {
    id: 'AUD001', title: 'ISO 9001 Internal Audit — Q2', standard: 'ISO 9001', type: 'Internal', auditor: 'R. Garcia', scheduledDate: '2024-06-10', status: 'Completed', scope: 'Clause 4–10 — full management system review',
    findings: [
      { id: 'F001', type: 'Minor NC', description: 'Calibration records not current for 3 instruments in Lab A', clause: '7.1.5', status: 'Open' },
      { id: 'F002', type: 'Observation', description: 'Risk register not reviewed within defined frequency', clause: '6.1', status: 'Open' },
      { id: 'F003', type: 'Opportunity', description: 'Customer feedback process could be digitised for efficiency', clause: '9.1.2', status: 'Closed' },
    ]
  },
  {
    id: 'AUD002', title: 'ISO 45001 Safety Audit — Warehouse', standard: 'ISO 45001', type: 'Internal', auditor: 'J. Morrison', scheduledDate: '2024-06-24', status: 'Completed', scope: 'Warehouse operations, chemical storage, emergency procedures',
    findings: [
      { id: 'F004', type: 'Major NC', description: 'Emergency evacuation drill not conducted in past 12 months', clause: '8.2', status: 'Open' },
      { id: 'F005', type: 'Minor NC', description: 'MSDS sheets not available at point of use for 2 chemicals', clause: '8.1.2', status: 'Closed' },
    ]
  },
  {
    id: 'AUD003', title: 'ISO 27001 Surveillance Audit', standard: 'ISO 27001', type: 'External', auditor: 'BV Certification', scheduledDate: '2024-07-15', status: 'In Progress', scope: 'Annex A controls — access management, cryptography, operations security',
    findings: [
      { id: 'F006', type: 'Minor NC', description: 'Password policy does not enforce complexity for legacy systems', clause: 'A.9.4.3', status: 'Open' },
    ]
  },
  {
    id: 'AUD004', title: 'ISO 14001 Environmental Audit', standard: 'ISO 14001', type: 'Internal', auditor: 'L. Thompson', scheduledDate: '2024-08-05', status: 'Planned', scope: 'Environmental aspects, legal compliance, targets and monitoring',
    findings: []
  },
  {
    id: 'AUD005', title: 'ISO 9001 Recertification', standard: 'ISO 9001', type: 'External', auditor: 'Bureau Veritas', scheduledDate: '2024-09-20', status: 'Planned', scope: 'Full system recertification audit — Stage 2',
    findings: []
  },
]

export const documents: Document[] = [
  { id: 'DOC001', title: 'Quality Management Policy', standard: 'ISO 9001', version: 'v4.1', status: 'Approved', owner: 'R. Garcia', lastModified: '2024-03-01', approvedBy: 'CEO', category: 'Policy' },
  { id: 'DOC002', title: 'Hazard Identification Procedure', standard: 'ISO 45001', version: 'v2.3', status: 'Approved', owner: 'J. Morrison', lastModified: '2024-02-14', approvedBy: 'HSE Manager', category: 'Procedure' },
  { id: 'DOC003', title: 'Information Security Policy', standard: 'ISO 27001', version: 'v3.0', status: 'Pending Review', owner: 'A. Chen', lastModified: '2024-04-20', category: 'Policy' },
  { id: 'DOC004', title: 'Environmental Aspects Register', standard: 'ISO 14001', version: 'v1.8', status: 'Approved', owner: 'L. Thompson', lastModified: '2024-01-30', approvedBy: 'EHS Director', category: 'Register' },
  { id: 'DOC005', title: 'Nonconformity & CAPA Procedure', standard: 'ISO 9001', version: 'v2.0', status: 'Approved', owner: 'R. Garcia', lastModified: '2024-03-15', approvedBy: 'QA Manager', category: 'Procedure' },
  { id: 'DOC006', title: 'Risk Assessment Methodology', standard: 'ISO 45001', version: 'v1.5', status: 'Draft', owner: 'J. Morrison', lastModified: '2024-05-10', category: 'Methodology' },
  { id: 'DOC007', title: 'Business Continuity Plan', standard: 'ISO 27001', version: 'v2.1', status: 'Approved', owner: 'A. Chen', lastModified: '2024-02-01', approvedBy: 'CISO', category: 'Plan' },
  { id: 'DOC008', title: 'Waste Management Plan', standard: 'ISO 14001', version: 'v3.2', status: 'Approved', owner: 'L. Thompson', lastModified: '2024-04-01', approvedBy: 'EHS Director', category: 'Plan' },
  { id: 'DOC009', title: 'Document Control Procedure', standard: 'ISO 9001', version: 'v5.0', status: 'Approved', owner: 'R. Garcia', lastModified: '2024-01-10', approvedBy: 'QA Manager', category: 'Procedure' },
  { id: 'DOC010', title: 'Emergency Response Procedure', standard: 'ISO 45001', version: 'v2.2', status: 'Pending Review', owner: 'J. Morrison', lastModified: '2024-05-22', category: 'Procedure' },
  { id: 'DOC011', title: 'Supplier Evaluation Criteria', standard: 'ISO 9001', version: 'v1.4', status: 'Obsolete', owner: 'M. Patel', lastModified: '2023-08-15', category: 'Form' },
  { id: 'DOC012', title: 'Data Classification Policy', standard: 'ISO 27001', version: 'v1.1', status: 'Draft', owner: 'A. Chen', lastModified: '2024-05-30', category: 'Policy' },
]

export const complianceData: Record<string, ComplianceItem[]> = {
  'ISO 9001': [
    { id: 'C001', clause: '4.1', requirement: 'Understanding the organization and its context', status: 'Compliant', evidence: 'Context analysis document', lastAudited: '2024-06-10' },
    { id: 'C002', clause: '4.2', requirement: 'Understanding needs and expectations of interested parties', status: 'Compliant', evidence: 'Stakeholder register v2.0', lastAudited: '2024-06-10' },
    { id: 'C003', clause: '5.1', requirement: 'Leadership and commitment', status: 'Compliant', evidence: 'Management review minutes', lastAudited: '2024-06-10' },
    { id: 'C004', clause: '6.1', requirement: 'Actions to address risks and opportunities', status: 'Partial', evidence: 'Risk register — review overdue', lastAudited: '2024-06-10' },
    { id: 'C005', clause: '7.1.5', requirement: 'Monitoring and measuring resources', status: 'Partial', evidence: '3 instruments calibration overdue', lastAudited: '2024-06-10' },
    { id: 'C006', clause: '8.1', requirement: 'Operational planning and control', status: 'Compliant', evidence: 'Production procedures current', lastAudited: '2024-06-10' },
    { id: 'C007', clause: '9.1', requirement: 'Monitoring, measurement, analysis and evaluation', status: 'Compliant', evidence: 'KPI dashboard monthly reports', lastAudited: '2024-06-10' },
    { id: 'C008', clause: '10.2', requirement: 'Nonconformity and corrective action', status: 'Compliant', evidence: 'CAPA system, 98% closure rate', lastAudited: '2024-06-10' },
  ],
  'ISO 14001': [
    { id: 'C009', clause: '4.1', requirement: 'Understanding the organization and its context', status: 'Compliant', evidence: 'Environmental context analysis', lastAudited: '2024-03-20' },
    { id: 'C010', clause: '6.1.2', requirement: 'Environmental aspects', status: 'Compliant', evidence: 'Environmental aspects register v1.8', lastAudited: '2024-03-20' },
    { id: 'C011', clause: '6.1.3', requirement: 'Compliance obligations', status: 'Compliant', evidence: 'Legal register current', lastAudited: '2024-03-20' },
    { id: 'C012', clause: '8.1', requirement: 'Operational planning and control', status: 'Partial', evidence: 'Wastewater SOP requires update', lastAudited: '2024-03-20' },
    { id: 'C013', clause: '9.1.1', requirement: 'Monitoring, measurement, analysis and evaluation', status: 'Compliant', evidence: 'Monthly environmental metrics', lastAudited: '2024-03-20' },
    { id: 'C014', clause: '9.3', requirement: 'Management review', status: 'Compliant', evidence: 'Quarterly management review conducted', lastAudited: '2024-03-20' },
  ],
  'ISO 45001': [
    { id: 'C015', clause: '4.2', requirement: 'Consultation and participation of workers', status: 'Compliant', evidence: 'HSC meeting minutes monthly', lastAudited: '2024-06-24' },
    { id: 'C016', clause: '6.1.2', requirement: 'Hazard identification and risk assessment', status: 'Compliant', evidence: 'Risk register current', lastAudited: '2024-06-24' },
    { id: 'C017', clause: '8.2', requirement: 'Emergency preparedness and response', status: 'Non-Compliant', evidence: 'Evacuation drill not completed — 12 months overdue', lastAudited: '2024-06-24' },
    { id: 'C018', clause: '9.1.1', requirement: 'Performance evaluation', status: 'Compliant', evidence: 'Safety KPIs tracked monthly', lastAudited: '2024-06-24' },
    { id: 'C019', clause: '10.1', requirement: 'Incident investigation', status: 'Compliant', evidence: 'All incidents investigated within SLA', lastAudited: '2024-06-24' },
  ],
  'ISO 27001': [
    { id: 'C020', clause: 'A.9.1', requirement: 'Business requirements of access control', status: 'Compliant', evidence: 'Access control policy v3.0', lastAudited: '2024-07-15' },
    { id: 'C021', clause: 'A.9.4.3', requirement: 'Password management system', status: 'Non-Compliant', evidence: 'Legacy systems non-compliant', lastAudited: '2024-07-15' },
    { id: 'C022', clause: 'A.12.1', requirement: 'Operational procedures and responsibilities', status: 'Compliant', evidence: 'IT ops runbooks current', lastAudited: '2024-07-15' },
    { id: 'C023', clause: 'A.16.1', requirement: 'Management of information security incidents', status: 'Partial', evidence: 'IRP exists, tabletop exercise pending', lastAudited: '2024-07-15' },
    { id: 'C024', clause: 'A.17.1', requirement: 'Information security continuity', status: 'Compliant', evidence: 'BCP tested annually', lastAudited: '2024-07-15' },
  ],
}

export const envMetrics: EnvMetric[] = [
  { month: 'Jan', emissions: 142, waste: 8.4, energy: 1820, water: 310 },
  { month: 'Feb', emissions: 138, waste: 7.9, energy: 1760, water: 295 },
  { month: 'Mar', emissions: 145, waste: 9.1, energy: 1890, water: 320 },
  { month: 'Apr', emissions: 130, waste: 7.2, energy: 1710, water: 285 },
  { month: 'May', emissions: 128, waste: 6.8, energy: 1680, water: 270 },
  { month: 'Jun', emissions: 122, waste: 6.5, energy: 1640, water: 260 },
  { month: 'Jul', emissions: 118, waste: 6.1, energy: 1600, water: 255 },
  { month: 'Aug', emissions: 125, waste: 6.7, energy: 1650, water: 268 },
  { month: 'Sep', emissions: 132, waste: 7.0, energy: 1700, water: 278 },
  { month: 'Oct', emissions: 119, waste: 6.3, energy: 1610, water: 258 },
  { month: 'Nov', emissions: 115, waste: 5.9, energy: 1570, water: 248 },
  { month: 'Dec', emissions: 110, waste: 5.5, energy: 1530, water: 238 },
]

export const envTargets = {
  emissions: 100,
  waste: 5.0,
  energy: 1500,
  water: 220,
}

export const recentActivity = [
  { id: 1, type: 'incident', text: 'New incident reported: Oil spill — loading bay', time: '2h ago', level: 'major' },
  { id: 2, type: 'audit', text: 'ISO 27001 Surveillance Audit commenced', time: '1d ago', level: 'info' },
  { id: 3, type: 'document', text: 'Information Security Policy submitted for review', time: '2d ago', level: 'info' },
  { id: 4, type: 'risk', text: 'Risk R002 (Data breach) escalated to Critical', time: '3d ago', level: 'critical' },
  { id: 5, type: 'compliance', text: 'ISO 45001 §8.2 marked Non-Compliant — drill overdue', time: '4d ago', level: 'major' },
  { id: 6, type: 'document', text: 'Document DOC011 marked Obsolete', time: '5d ago', level: 'info' },
]
