# QHSE Management Platform — ISO Suite

A full-stack integrated management system dashboard covering ISO 9001, ISO 14001, ISO 45001, and ISO 27001. Built with React, TypeScript, and Vite. Features a dark/light theme toggle, fully responsive layout, interactive data visualisations, and seven purpose-built modules.

---

## Tech Stack

- **React 18** — UI library
- **TypeScript** — Static typing throughout
- **Vite** — Build tool and dev server
- **Recharts** — Charts and data visualisations
- **Lucide React** — Icon set
- **CSS Variables** — Full dark/light theming without any external CSS framework

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
qhse-platform/
├── public/
├── src/
│   ├── components/
│   │   ├── Audits/
│   │   │   ├── AddAuditModal.tsx
│   │   │   ├── AuditRow.tsx
│   │   │   └── AuditStats.tsx
│   │   ├── Compliance/
│   │   │   ├── ComplianceItem.tsx
│   │   │   ├── ComplianceLegend.tsx
│   │   │   ├── ComplianceOverview.tsx
│   │   │   └── ComplianceScoreBar.tsx
│   │   ├── Dashboard/
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── ComplianceByStandardChart.tsx
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── IncidentTrendChart.tsx
│   │   │   └── RiskDistributionChart.tsx
│   │   ├── Documents/
│   │   │   ├── AddDocModal.tsx
│   │   │   ├── DocStats.tsx
│   │   │   └── DocTable.tsx
│   │   ├── Environmental/
│   │   │   ├── EnvGoalsGrid.tsx
│   │   │   ├── EnvMetricCards.tsx
│   │   │   └── EnvTrendChart.tsx
│   │   ├── Incidents/
│   │   │   ├── AddIncidentModal.tsx
│   │   │   ├── IncidentMonthlyChart.tsx
│   │   │   ├── IncidentRow.tsx
│   │   │   └── IncidentStats.tsx
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── Risk/
│   │   │   ├── AddRiskModal.tsx
│   │   │   ├── RiskFormulaCard.tsx
│   │   │   ├── RiskLevelStats.tsx
│   │   │   ├── RiskMatrix.tsx
│   │   │   └── RiskRegisterTable.tsx
│   │   └── ui/
│   │       ├── ChartTooltip.tsx
│   │       ├── FilterBar.tsx
│   │       ├── ISOChip.tsx
│   │       ├── Modal.tsx
│   │       └── StatCard.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── pages/
│   │   ├── AuditManagement.tsx
│   │   ├── ComplianceChecklist.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DocumentControl.tsx
│   │   ├── EnvironmentalTracker.tsx
│   │   ├── IncidentTracking.tsx
│   │   └── RiskAssessment.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Modules

| Module | ISO Standard | Description |
|---|---|---|
| Dashboard | All | KPI overview — incidents, risks, audits, compliance |
| Risk Assessment | ISO 45001 / 27001 | Interactive risk matrix, scoring formula, full register |
| Incident Tracking | ISO 45001 | Report, investigate and close incidents with CAPA workflow |
| Audit Management | All | Schedule and track internal/external audits and findings |
| Document Control | ISO 9001 / 27001 | Version control, approval workflow, obsolete handling |
| Compliance Checklist | All | Clause-level compliance tracking per ISO standard |
| Environmental Tracker | ISO 14001 | Monitor emissions, waste, energy and water vs targets |

---

## Features

- Dark / light theme toggle — persisted to localStorage
- Fully responsive — works on mobile, tablet, and desktop
- Collapsible sidebar navigation
- Interactive risk matrix with hover tooltips
- Expandable incident and audit rows with inline status updates
- Add / edit modals for risks, incidents, audits, and documents
- Document versioning — bump revision and approve inline
- Compliance score calculation per ISO standard
- Recharts area, bar, and pie charts throughout
- No external CSS framework — pure CSS variables

---

## Deployment on Vercel

1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — no configuration needed
4. Click **Deploy**

The build command is `npm run build` and the output directory is `dist`.

---

## Design

- **Font:** Sora (display + body) / JetBrains Mono (data, IDs, versions)
- **Dark theme:** Deep navy base (`#070E1C`) with teal accent (`#00D4AA`)
- **Light theme:** Soft blue-grey base (`#EBF0FA`) with emerald accent
- **ISO standard colour coding:** Blue (9001), Green (14001), Orange (45001), Violet (27001)
