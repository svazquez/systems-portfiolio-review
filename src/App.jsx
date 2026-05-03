import { useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const PAYROLL_RUNS = [
  { id: 'SFT-2026-03', group: 'Salaried Full-Time',       status: 'Approved',  employees: 412, gross: '$624,800',  net: '$448,340',  payDate: 'Mar 20, 2026' },
  { id: 'HRL-2026-03', group: 'Hourly Employees',          status: 'In Review', employees: 287, gross: '$312,540',  net: '$224,630',  payDate: 'Mar 20, 2026' },
  { id: 'EXC-2026-03', group: 'Executive Compensation',    status: 'Error',     employees: 18,  gross: '$198,200',  net: '—',         payDate: 'Mar 20, 2026' },
  { id: 'CTR-2026-03', group: 'Contract Workers',          status: 'Draft',     employees: 94,  gross: '—',         net: '—',         payDate: 'Mar 27, 2026' },
  { id: 'PTS-2026-03', group: 'Part-Time Staff',           status: 'Draft',     employees: 156, gross: '—',         net: '—',         payDate: 'Mar 27, 2026' },
]

const EMPLOYEES = [
  { id: '10043', name: 'Sarah Johnson',     dept: 'Engineering', rate: '$8,333/mo',  regHrs: 80, otHrs: 0, gross: '$8,333',  grossNote: null,            benefits: ['MED','401K'],          preTax: '$1,283', taxes: '$2,604', net: '$4,446', status: 'ok'       },
  { id: '10087', name: 'Michael Chen',      dept: 'Finance',     rate: '$7,500/mo',  regHrs: 80, otHrs: 0, gross: '$7,500',  grossNote: null,            benefits: ['MED','DEN','401K'],    preTax: '$1,492', taxes: '$2,340', net: '$3,668', status: 'ok'       },
  { id: '10112', name: 'Emma Davis',        dept: 'Marketing',   rate: '$6,250/mo',  regHrs: 80, otHrs: 0, gross: '$6,250',  grossNote: null,            benefits: ['MED','401K','FSA'],    preTax: '$1,075', taxes: '$1,950', net: '$3,225', status: 'warning'  },
  { id: '10156', name: 'James Wilson',      dept: 'Operations',  rate: '$9,167/mo',  regHrs: 80, otHrs: 0, gross: '$9,167',  grossNote: null,            benefits: ['MED','DEN','401K'],    preTax: '$1,867', taxes: '$2,860', net: '$4,440', status: 'ok'       },
  { id: '10203', name: 'Carlos Rodriguez',  dept: 'Sales',       rate: '$7,083/mo',  regHrs: 80, otHrs: 0, gross: '$9,583',  grossNote: '+$2,500 bonus', benefits: ['MED','401K'],          preTax: '$1,183', taxes: '$2,993', net: '$5,407', status: 'modified' },
  { id: '10234', name: 'Lisa Thompson',     dept: 'HR',          rate: '$6,667/mo',  regHrs: 80, otHrs: 0, gross: '$6,667',  grossNote: null,            benefits: ['MED','DEN','401K','FSA'], preTax: '$1,367', taxes: '$2,080', net: '$3,220', status: 'error' },
  { id: '10267', name: 'David Kim',         dept: 'Finance',     rate: '$8,750/mo',  regHrs: 80, otHrs: 0, gross: '$8,750',  grossNote: null,            benefits: ['MED','401K'],          preTax: '$1,583', taxes: '$2,730', net: '$4,437', status: 'ok'       },
  { id: '10189', name: 'Priya Patel',       dept: 'Technology',  rate: '$10,833/mo', regHrs: 80, otHrs: 0, gross: '$10,833', grossNote: null,            benefits: ['MED','DEN','401K'],    preTax: '$2,033', taxes: '$3,380', net: '$5,420', status: 'ok'       },
  { id: '10318', name: 'Tom Baker',         dept: 'Legal',       rate: '$11,667/mo', regHrs: 80, otHrs: 0, gross: '$11,667', grossNote: null,            benefits: ['MED','DEN','401K','LIFE'], preTax: '$2,267', taxes: '$3,640', net: '$5,760', status: 'ok'  },
  { id: '10291', name: 'Rachel Green',      dept: 'Engineering', rate: '$9,583/mo',  regHrs: 80, otHrs: 0, gross: '$9,583',  grossNote: null,            benefits: ['DEN','VIS','401K'],    preTax: '$1,433', taxes: '$2,993', net: '$5,157', status: 'warning'  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED UI COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

const BENEFIT_CLASSES = {
  MED:   'bg-blue-100 text-blue-700',
  DEN:   'bg-violet-100 text-violet-700',
  '401K':'bg-emerald-100 text-emerald-700',
  FSA:   'bg-amber-100 text-amber-700',
  VIS:   'bg-cyan-100 text-cyan-700',
  LIFE:  'bg-gray-100 text-gray-500',
}

function BenefitChip({ code }) {
  return (
    <span className={`inline-block px-1.5 py-px rounded text-[10px] font-bold leading-4 ${BENEFIT_CLASSES[code] ?? 'bg-gray-100 text-gray-500'}`}>
      {code}
    </span>
  )
}

function RunStatusBadge({ status }) {
  const cls = {
    Approved:   'bg-emerald-100 text-emerald-700',
    'In Review':'bg-amber-100 text-amber-700',
    Error:      'bg-red-100 text-red-700',
    Draft:      'bg-gray-100 text-gray-500',
  }[status] ?? 'bg-gray-100 text-gray-500'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  )
}

// ── Icons ──────────────────────────────────────────────────────────────────────

const SearchIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const BellIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

const FilterIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const AlertTriangleIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

const CheckCircleIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const XCircleIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

/* ─────────────────────────────────────────────────────────────────────────────
   TOP NAVIGATION (shared)
───────────────────────────────────────────────────────────────────────────── */

const NAV_TABS = ['Payroll', 'Dashboard', 'Payroll Runs', 'Employees', 'Reports', 'Settings']

function TopNav({ activeTab, onTabChange }) {
  return (
    <header className="flex-none">
      {/* Dark navy bar */}
      <div className="bg-[#1A2744] h-12 flex items-center px-5 gap-4">
        {/* ADP Logo */}
        <div className="flex items-center gap-2 mr-2">
          <div className="bg-[#CC0000] text-white text-[11px] font-black px-1.5 py-0.5 rounded leading-tight">ADP</div>
          <span className="text-white text-sm font-semibold tracking-wide">Lyric</span>
        </div>
        <div className="h-4 w-px bg-white/20" />
        <span className="text-white/60 text-sm">Payroll</span>

        {/* Search */}
        <div className="mx-auto flex items-center bg-white/10 rounded-full px-3 py-1.5 gap-2 w-72">
          <SearchIcon className="w-3.5 h-3.5 text-white/40" />
          <span className="text-white/40 text-xs">Search</span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="text-white/60 hover:text-white transition-colors"><BellIcon /></button>
          <button className="text-white/60 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          <div className="w-7 h-7 rounded-full bg-[#3B5FC0] flex items-center justify-center text-white text-[11px] font-bold">JD</div>
        </div>
      </div>

      {/* Sub-nav tabs */}
      <div className="bg-white border-b border-[#E4E6EA] flex items-center px-5 gap-0.5">
        {NAV_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative px-4 py-3 text-sm transition-colors ${
              activeTab === tab
                ? 'text-[#3B5FC0] font-semibold'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B5FC0] rounded-t" />
            )}
          </button>
        ))}
      </div>
    </header>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DASHBOARD — STAT CARDS
───────────────────────────────────────────────────────────────────────────── */

function StatCards() {
  return (
    <div className="grid grid-cols-5 gap-3 mb-4">
      <div className="bg-white rounded-lg border border-[#E4E6EA] p-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Current Run Status</p>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-400 flex-none" />
          <span className="text-base font-bold text-[#1A1A2E]">In Progress</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">3 of 5 groups processed</p>
      </div>

      <div className="bg-white rounded-lg border border-[#E4E6EA] p-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Next Deadline</p>
        <p className="text-base font-bold text-amber-500">Mar 20, 2026</p>
        <p className="text-xs text-gray-500 mt-1">4 days remaining</p>
      </div>

      <div className="bg-white rounded-lg border border-[#E4E6EA] p-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Total Gross Pay</p>
        <p className="text-base font-bold text-[#1A1A2E]">$1,248,340</p>
        <p className="text-xs text-emerald-600 mt-1 font-medium">+2.1% vs last period</p>
      </div>

      <div className="bg-white rounded-lg border border-[#E4E6EA] p-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Total Net Pay</p>
        <p className="text-base font-bold text-[#1A1A2E]">$896,210</p>
        <p className="text-xs text-gray-500 mt-1">71.8% net ratio</p>
      </div>

      <div className="bg-red-50 rounded-lg border border-red-200 p-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Errors / Warnings</p>
        <p className="text-base font-bold text-red-600">3 / 7</p>
        <p className="text-xs text-red-500 mt-1">Requires attention</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DASHBOARD — DATA VIZ CARDS
───────────────────────────────────────────────────────────────────────────── */

// Gross Pay Trend — bar chart (inline SVG)
function GrossTrendChart() {
  const months  = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
  // Relative bar heights (px). Mar is current period, highlighted in blue.
  const heights = [55, 52, 48, 54, 50, 70]
  const BAR_W = 22
  const GAP    = 14
  const CHART_W = months.length * BAR_W + (months.length - 1) * GAP
  const startX  = (220 - CHART_W) / 2

  return (
    <div className="bg-white rounded-lg border border-[#E4E6EA] p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-[#1A1A2E]">Gross Pay Trend</span>
        <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-200 rounded px-2 py-0.5">6 months</span>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-xl font-bold text-[#1A1A2E]">$1,248,340</span>
        <span className="text-xs font-semibold text-emerald-600">+2.1%</span>
      </div>
      <svg viewBox="0 0 220 88" className="w-full h-20">
        {months.map((m, i) => {
          const x = startX + i * (BAR_W + GAP)
          const h = heights[i]
          const y = 72 - h
          const isCurrent = i === months.length - 1
          return (
            <g key={m}>
              <rect x={x} y={y} width={BAR_W} height={h} rx={3}
                fill={isCurrent ? '#3B5FC0' : '#E4E6EA'} />
              <text x={x + BAR_W / 2} y={86} textAnchor="middle" fontSize={8} fill="#9CA3AF">{m}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// Pay Group Distribution — donut chart (inline SVG)
function DistributionDonut() {
  const R = 36
  const C = 2 * Math.PI * R  // ≈ 226.2

  const segments = [
    { label: 'Salaried',   count: 412, color: '#EF4444' },
    { label: 'Hourly',     count: 287, color: '#F59E0B' },
    { label: 'Part-Time',  count: 156, color: '#3B5FC0' },
    { label: 'Contract',   count: 94,  color: '#10B981' },
    { label: 'Executive',  count: 18,  color: '#8B5CF6' },
  ]
  const total = segments.reduce((s, seg) => s + seg.count, 0)

  let accumulated = 0
  const arcs = segments.map(seg => {
    const dash   = (seg.count / total) * C
    const offset = -accumulated
    accumulated += dash
    return { ...seg, dash, offset }
  })

  return (
    <div className="bg-white rounded-lg border border-[#E4E6EA] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-[#1A1A2E]">Pay Group Distribution</span>
        <span className="text-[10px] text-gray-400">{total} total</span>
      </div>
      <div className="flex items-center gap-4">
        {/* Donut */}
        <svg width="96" height="96" viewBox="0 0 96 96" className="flex-none">
          <circle cx="48" cy="48" r={R} fill="none" stroke="#F3F4F6" strokeWidth="14" />
          {arcs.map((arc, i) => (
            <circle key={i} cx="48" cy="48" r={R} fill="none"
              stroke={arc.color} strokeWidth="14"
              strokeDasharray={`${arc.dash} ${C}`}
              strokeDashoffset={arc.offset}
              transform="rotate(-90 48 48)"
            />
          ))}
          <text x="48" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1A1A2E">{total}</text>
          <text x="48" y="55" textAnchor="middle" fontSize="7.5" fill="#9CA3AF">employees</text>
        </svg>

        {/* Legend */}
        <div className="flex flex-col gap-1 flex-1">
          {segments.map(seg => (
            <div key={seg.label} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-none" style={{ backgroundColor: seg.color }} />
                <span className="text-gray-600">{seg.label}</span>
              </div>
              <span className="font-semibold text-[#1A1A2E]">{seg.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Exception Rate — sparkline (inline SVG)
function ExceptionSparkline() {
  const W = 200, H = 58, PAD = 8
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
  const rates   = [3.5,  3.2,  2.8,  2.5,  2.1,  1.1]
  const MIN_R = 0.5, MAX_R = 4.0

  const pts = rates.map((r, i) => ({
    x: PAD + (i / (rates.length - 1)) * (W - PAD * 2),
    // Higher rate → smaller y value (higher on inverted SVG axis) → lower on screen
    y: PAD + ((r - MIN_R) / (MAX_R - MIN_R)) * (H - PAD * 2),
  }))

  const polyline = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const last = pts[pts.length - 1]
  const first = pts[0]
  const areaPath =
    `M${first.x.toFixed(1)},${H} ` +
    pts.map(p => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') +
    ` L${last.x.toFixed(1)},${H} Z`

  return (
    <div className="bg-white rounded-lg border border-[#E4E6EA] p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-[#1A1A2E]">Exception Rate</span>
        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 rounded px-2 py-0.5">Improving</span>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-xl font-bold text-[#1A1A2E]">1.1%</span>
        <span className="text-xs text-emerald-600">↓ from 3.5% peak</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-14">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#10B981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#sparkGrad)" />
        <polyline points={polyline} fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={last.x} cy={last.y} r="3" fill="#10B981" />
        {months.map((m, i) => (
          <text key={m} x={pts[i].x} y={H} textAnchor="middle" fontSize="7" fill="#9CA3AF">{m}</text>
        ))}
      </svg>

      <div className="flex gap-5 mt-2 pt-2 border-t border-[#E4E6EA]">
        {[['Errors', '3', 'text-red-500'], ['Warnings', '7', 'text-amber-500'], ['Resolved', '24', 'text-emerald-600']].map(([label, val, cls]) => (
          <div key={label}>
            <div className={`text-sm font-bold ${cls}`}>{val}</div>
            <div className="text-[9px] text-gray-400 uppercase tracking-wide">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DASHBOARD — PAYROLL RUNS TABLE
───────────────────────────────────────────────────────────────────────────── */

function PayrollRunsTable({ onRowClick }) {
  function ActionButton({ run }) {
    if (run.status === 'Approved')
      return <button onClick={e => { e.stopPropagation(); onRowClick(run) }}
        className="text-xs border border-gray-200 rounded px-3 py-1 text-gray-500 hover:bg-gray-50">View</button>
    if (run.status === 'Error')
      return <button onClick={e => { e.stopPropagation(); onRowClick(run) }}
        className="text-xs bg-[#3B5FC0] text-white rounded px-3 py-1 hover:bg-[#2d4fa0] font-medium">Resolve</button>
    return <button onClick={e => { e.stopPropagation(); onRowClick(run) }}
      className="text-xs border border-[#3B5FC0] text-[#3B5FC0] rounded px-3 py-1 hover:bg-blue-50">Start</button>
  }

  return (
    <div className="bg-white rounded-lg border border-[#E4E6EA]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E6EA]">
        <span className="font-semibold text-[#1A1A2E]">Payroll Runs</span>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700">
            <FilterIcon />
            Filters
          </button>
          <button className="text-xs text-[#3B5FC0] font-medium hover:underline">View all</button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E4E6EA]">
            {['PAY GROUP', 'STATUS', 'EMPLOYEES', 'GROSS PAY', 'NET PAY', 'PAY DATE', 'ACTION'].map(h => (
              <th key={h} className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-4 py-2.5">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PAYROLL_RUNS.map(run => (
            <tr key={run.id}
              className="border-b border-[#E4E6EA] last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onRowClick(run)}
            >
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-[#1A1A2E]">{run.group}</div>
                <div className="text-xs text-gray-400">{run.id}</div>
              </td>
              <td className="px-4 py-3"><RunStatusBadge status={run.status} /></td>
              <td className="px-4 py-3 text-sm text-[#1A1A2E]">{run.employees}</td>
              <td className="px-4 py-3 text-sm text-[#1A1A2E]">{run.gross}</td>
              <td className="px-4 py-3 text-sm text-[#1A1A2E]">{run.net}</td>
              <td className="px-4 py-3 text-sm text-[#1A1A2E]">{run.payDate}</td>
              <td className="px-4 py-3"><ActionButton run={run} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DASHBOARD — ADP ASSIST PANEL (right sidebar)
───────────────────────────────────────────────────────────────────────────── */

function ADPAssistPanel() {
  return (
    <aside className="w-64 flex-none bg-white border-l border-[#E4E6EA] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E6EA]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#3B5FC0] flex items-center justify-center text-white">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#1A1A2E]">ADP Assist</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Payroll Alerts */}
        <section>
          <h3 className="text-[10px] font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Payroll Alerts</h3>
          <div className="space-y-2">
            {[
              { type: 'error',   title: 'Tax code mismatch',   sub: 'EXC group · 3 employees' },
              { type: 'warning', title: 'OT threshold reached', sub: 'HRL group · 12 employees' },
              { type: 'warning', title: 'Bank detail change',   sub: 'SFT group · 1 employee' },
            ].map((alert, i) => (
              <div key={i} className={`rounded-lg p-3 ${alert.type === 'error' ? 'bg-red-50' : 'bg-amber-50'}`}>
                <div className="flex items-start gap-2">
                  <AlertTriangleIcon className={`w-3.5 h-3.5 mt-0.5 flex-none ${alert.type === 'error' ? 'text-red-500' : 'text-amber-500'}`} />
                  <div>
                    <div className="text-xs font-semibold text-[#1A1A2E]">{alert.title}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{alert.sub}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Items */}
        <section>
          <h3 className="text-[10px] font-bold text-[#1A1A2E] uppercase tracking-wider mb-2">Action Items</h3>
          <div className="space-y-2.5">
            {[
              { text: 'Submit EXC payroll run', due: 'Due today',  done: false },
              { text: 'Review HRL timesheets',  due: 'Due Mar 18', done: false },
              { text: 'Approve SFT run',         due: 'Completed',  done: true  },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className={`w-4 h-4 mt-0.5 rounded flex-none flex items-center justify-center border ${
                  item.done ? 'bg-[#3B5FC0] border-[#3B5FC0]' : 'border-gray-300 bg-white'
                }`}>
                  {item.done && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className={`text-xs ${item.done ? 'line-through text-gray-400' : 'text-[#1A1A2E]'}`}>{item.text}</div>
                  <div className={`text-[10px] mt-0.5 ${
                    item.done            ? 'text-gray-400'
                    : item.due === 'Due today' ? 'text-[#3B5FC0] font-semibold'
                    : 'text-gray-400'
                  }`}>{item.due}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Missing Approvals */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-bold text-[#1A1A2E] uppercase tracking-wider">Missing Approvals</h3>
            <span className="text-[10px] bg-amber-100 text-amber-700 rounded-full px-1.5 py-0.5 font-semibold">2 pending</span>
          </div>
          <div className="space-y-2">
            {[
              { run: 'HRL Run Mar-26', badge: 'Mgr review',  badgeCls: 'bg-amber-100 text-amber-700', avatar: 'RK', name: 'Waiting on R. Kim' },
              { run: 'EXC Run Mar-26', badge: 'CFO sign-off', badgeCls: 'bg-red-100 text-red-700',    avatar: 'MP', name: 'Waiting on M. Park' },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-[#E4E6EA] p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#1A1A2E]">{item.run}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.badgeCls}`}>{item.badge}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#3B5FC0] flex items-center justify-center text-[9px] font-bold text-white flex-none">{item.avatar}</div>
                  <span className="text-[10px] text-gray-500">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Ask ADP Assist footer */}
      <div className="border-t border-[#E4E6EA] p-3">
        <button className="w-full flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
          </svg>
          Ask ADP Assist…
        </button>
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DASHBOARD PAGE
───────────────────────────────────────────────────────────────────────────── */

function PayrollDashboard({ onRunClick }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 overflow-y-auto bg-[#F4F5F7] p-5">
        {/* Page header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-[#1A1A2E]">Payroll Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">Period: March 1–15, 2026 · Q1 FY2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-sm border border-[#E4E6EA] bg-white rounded-lg px-3 py-1.5 text-gray-600 hover:bg-gray-50">
              <CalendarIcon />
              Mar 1–15, 2026
            </button>
            <button className="flex items-center gap-1.5 text-sm bg-[#3B5FC0] text-white rounded-lg px-4 py-1.5 hover:bg-[#2d4fa0] font-semibold transition-colors">
              + New Run
            </button>
          </div>
        </div>

        <StatCards />

        {/* Data viz row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <GrossTrendChart />
          <DistributionDonut />
          <ExceptionSparkline />
        </div>

        <PayrollRunsTable onRowClick={onRunClick} />
      </main>

      <ADPAssistPanel />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAYROLL RUN DETAIL — LEFT SUMMARY PANEL
───────────────────────────────────────────────────────────────────────────── */

function RunSummaryPanel({ onBack }) {
  return (
    <aside className="w-52 flex-none bg-white border-r border-[#E4E6EA] overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-1 text-xs text-[#3B5FC0] hover:underline">
          <ChevronLeftIcon />
          Back to Payroll Runs
        </button>

        {/* Run identity */}
        <div>
          <div className="text-sm font-bold text-[#1A1A2E]">Salaried Full-Time</div>
          <div className="text-xs text-gray-400 mb-2">SFT-2026-03</div>
          <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-none" />
            In Review
          </span>
        </div>

        <div className="border-t border-[#E4E6EA]" />

        {/* Run details */}
        <div className="space-y-2.5">
          {[
            { label: 'PAY PERIOD',  value: 'Mar 1 – Mar 15, 2026' },
            { label: 'PAY DATE',    value: 'Mar 20, 2026' },
            { label: 'FREQUENCY',   value: 'Semi-Monthly' },
          ].map(d => (
            <div key={d.label}>
              <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">{d.label}</div>
              <div className="text-xs font-medium text-[#1A1A2E] mt-0.5">{d.value}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#E4E6EA]" />

        {/* Run totals */}
        <div>
          <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-2">RUN TOTALS</div>
          <div className="space-y-1.5">
            {[
              { label: 'Employees',  value: '412' },
              { label: 'Gross Pay',  value: '$624,800' },
              { label: 'Deductions', value: '$84,320' },
              { label: 'Taxes',      value: '$92,140' },
            ].map(t => (
              <div key={t.label} className="flex justify-between text-xs">
                <span className="text-gray-500">{t.label}</span>
                <span className="font-medium text-[#1A1A2E]">{t.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-baseline pt-1.5 border-t border-[#E4E6EA]">
              <span className="text-sm font-semibold text-[#1A1A2E]">Net Pay</span>
              <span className="text-sm font-bold text-[#3B5FC0]">$448,340</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E4E6EA]" />

        {/* Exceptions */}
        <div>
          <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-2">EXCEPTIONS</div>
          <div className="flex gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 rounded-full px-2 py-0.5 font-medium">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              2 Errors
            </span>
            <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 font-medium">
              <AlertTriangleIcon className="w-3 h-3" />
              3 Warnings
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <button className="w-full text-xs bg-[#3B5FC0] text-white font-semibold rounded-lg py-2 hover:bg-[#2d4fa0] transition-colors">
            Commit Payroll
          </button>
          <button className="w-full text-xs border border-[#3B5FC0] text-[#3B5FC0] font-semibold rounded-lg py-2 hover:bg-blue-50 transition-colors">
            Save Changes
          </button>
          <button className="w-full text-xs border border-gray-200 text-gray-500 rounded-lg py-2 hover:bg-gray-50 transition-colors">
            View History
          </button>
        </div>

        <div className="border-t border-[#E4E6EA]" />

        {/* vs last period */}
        <div>
          <div className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-2">VS LAST PERIOD</div>
          <div className="space-y-1">
            {[
              { label: 'Gross Pay',  val: '+$13,200', positive: true },
              { label: 'Headcount',  val: '+4',        positive: true },
              { label: 'Avg Gross',  val: '+$8',       positive: true },
            ].map(c => (
              <div key={c.label} className="flex justify-between text-xs">
                <span className="text-gray-500">{c.label}</span>
                <span className={c.positive ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium'}>{c.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAYROLL RUN DETAIL — EMPLOYEE TABLE
───────────────────────────────────────────────────────────────────────────── */

function rowBg(status) {
  if (status === 'warning')  return 'bg-amber-50 border-l-2 border-l-amber-400'
  if (status === 'modified') return 'bg-blue-50 border-l-2 border-l-[#3B5FC0]'
  if (status === 'error')    return 'bg-red-50 border-l-2 border-l-red-500'
  return ''
}

function StatusIcon({ status }) {
  if (status === 'ok')      return <CheckCircleIcon className="w-4 h-4 text-emerald-500 mx-auto" />
  if (status === 'warning') return <AlertTriangleIcon className="w-4 h-4 text-amber-500 mx-auto" />
  if (status === 'error')   return <XCircleIcon className="w-4 h-4 text-red-500 mx-auto" />
  return null
}

function EmpActionButton({ status }) {
  if (status === 'warning')
    return <button className="text-[11px] border border-amber-300 text-amber-700 bg-white rounded px-2.5 py-1 hover:bg-amber-50">Review</button>
  if (status === 'error')
    return <button className="text-[11px] bg-red-500 text-white rounded px-2.5 py-1 hover:bg-red-600 font-semibold">Fix</button>
  return <button className="text-[11px] text-[#3B5FC0] hover:underline">Edit</button>
}

function EmployeeTable() {
  const COLS = ['EMPLOYEE', 'DEPT', 'PAY RATE', 'REG HRS', 'OT HRS', 'GROSS PAY', 'BENEFIT CODES', 'PRE-TAX DED', 'TAXES', 'NET PAY', 'STATUS', 'ACTION']

  return (
    <div className="bg-white rounded-lg border border-[#E4E6EA] overflow-x-auto">
      <table className="w-full text-xs min-w-[900px]">
        <thead>
          <tr className="border-b border-[#E4E6EA] bg-gray-50">
            <th className="w-8 px-3 py-2.5">
              <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-[#3B5FC0]" />
            </th>
            {COLS.map(h => (
              <th key={h} className="text-left text-[9px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-2.5 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {EMPLOYEES.map(emp => (
            <tr key={emp.id} className={`border-b border-[#E4E6EA] last:border-0 transition-colors hover:brightness-95 ${rowBg(emp.status)}`}>
              <td className="px-3 py-2.5">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-[#3B5FC0]" />
              </td>
              <td className="px-2 py-2.5 min-w-[140px]">
                <div className="font-semibold text-[#1A1A2E]">{emp.name}</div>
                <div className="text-gray-400">ID: {emp.id}</div>
              </td>
              <td className="px-2 py-2.5 text-gray-600 whitespace-nowrap">{emp.dept}</td>
              <td className="px-2 py-2.5">
                <div className={`border rounded px-1.5 py-0.5 text-center font-medium whitespace-nowrap ${
                  emp.status === 'warning'
                    ? 'border-amber-300 bg-amber-50 text-amber-800'
                    : 'border-gray-200 bg-gray-50 text-[#1A1A2E]'
                }`}>
                  {emp.rate}
                </div>
              </td>
              <td className="px-2 py-2.5">
                <div className="border border-gray-200 rounded px-1.5 py-0.5 text-center w-10 bg-gray-50 text-[#1A1A2E] mx-auto">{emp.regHrs}</div>
              </td>
              <td className="px-2 py-2.5">
                <div className="border border-gray-200 rounded px-1.5 py-0.5 text-center w-10 bg-gray-50 text-[#1A1A2E] mx-auto">{emp.otHrs}</div>
              </td>
              <td className="px-2 py-2.5 text-right">
                <div className="font-semibold text-[#1A1A2E] whitespace-nowrap">{emp.gross}</div>
                {emp.grossNote && <div className="text-emerald-600 text-[10px]">{emp.grossNote}</div>}
              </td>
              <td className="px-2 py-2.5">
                <div className="flex flex-wrap gap-0.5 max-w-[108px]">
                  {emp.benefits.map(b => <BenefitChip key={b} code={b} />)}
                </div>
              </td>
              <td className="px-2 py-2.5 text-right text-gray-600 whitespace-nowrap">{emp.preTax}</td>
              <td className="px-2 py-2.5 text-right text-gray-600 whitespace-nowrap">{emp.taxes}</td>
              <td className="px-2 py-2.5 text-right font-semibold text-[#3B5FC0] whitespace-nowrap">{emp.net}</td>
              <td className="px-2 py-2.5 text-center"><StatusIcon status={emp.status} /></td>
              <td className="px-2 py-2.5">
                <div className="flex items-center gap-1">
                  {emp.status === 'modified' && (
                    <span className="text-[9px] bg-blue-100 text-blue-700 rounded px-1 py-0.5 font-bold">MOD</span>
                  )}
                  <EmpActionButton status={emp.status} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAYROLL RUN DETAIL PAGE
───────────────────────────────────────────────────────────────────────────── */

const DETAIL_FILTERS = ['All Employees (412)', 'With Exceptions 5', 'Modified', 'Locked']

function PayrollRunDetail({ onBack }) {
  const [activeFilter, setActiveFilter] = useState('All Employees (412)')

  return (
    <div className="flex flex-1 overflow-hidden">
      <RunSummaryPanel onBack={onBack} />

      <main className="flex-1 overflow-y-auto bg-[#F4F5F7] p-5">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-1">
          <span>Dashboard</span>
          <span className="mx-1.5">/</span>
          <span>Payroll Runs</span>
          <span className="mx-1.5">/</span>
          <span className="text-[#1A1A2E] font-medium">Salaried Full-Time — SFT-2026-03</span>
        </nav>

        {/* Page title + toolbar */}
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-xl font-bold text-[#1A1A2E]">Employee Payroll Review</h1>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <div className="flex items-center gap-1.5 bg-white border border-[#E4E6EA] rounded-lg px-3 py-1.5 text-xs text-gray-400 min-w-[140px]">
              <SearchIcon className="w-3.5 h-3.5" />
              Search employees
            </div>
            <button className="flex items-center gap-1.5 text-xs border border-[#E4E6EA] bg-white rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-50">
              <FilterIcon />
              Filters
            </button>
            <button className="text-xs border border-[#E4E6EA] bg-white rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-50">
              + Add Adjustment
            </button>
            <button className="text-xs border border-[#E4E6EA] bg-white rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-50">
              Export
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-3">
          {DETAIL_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-[#3B5FC0] text-white'
                  : 'bg-white text-gray-500 border border-[#E4E6EA] hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400">Showing 10 of 412</span>
        </div>

        <EmployeeTable />
      </main>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────────────────────────────────────── */

export default function App() {
  const [page, setPage]         = useState('dashboard')
  const [activeTab, setActiveTab] = useState('Dashboard')

  function handleRunClick() {
    setPage('detail')
    setActiveTab('Payroll Runs')
  }

  function handleBack() {
    setPage('dashboard')
    setActiveTab('Dashboard')
  }

  function handleTabChange(tab) {
    setActiveTab(tab)
    if (tab === 'Dashboard')    setPage('dashboard')
    if (tab === 'Payroll Runs') setPage('detail')
  }

  return (
    <div className="flex flex-col h-screen font-sans antialiased" style={{ fontFamily: "'Source Sans Pro', system-ui, sans-serif" }}>
      <TopNav activeTab={activeTab} onTabChange={handleTabChange} />
      {page === 'dashboard'
        ? <PayrollDashboard onRunClick={handleRunClick} />
        : <PayrollRunDetail onBack={handleBack} />
      }
    </div>
  )
}
