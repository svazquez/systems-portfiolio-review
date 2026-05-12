/* ── Font constants ── */
export const FONTS = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap'

export const HF = "'Bebas Neue', sans-serif"    // headings
export const MF = "'IBM Plex Mono', monospace"  // labels / eyebrows
export const BF = "'IBM Plex Sans', sans-serif" // body

/* ── Era data ── */
export const ERAS = [
  { id: 'ai',            eraNum: 4, label: 'AI/Agentic Systems',    line1: 'AI/Agentic',    line2: 'Systems'        },
  { id: 'institutional', eraNum: 3, label: 'Institutional Systems', line1: 'Institutional', line2: 'Systems'        },
  { id: 'workforce',     eraNum: 2, label: 'Workforce Platforms',   line1: 'Workforce',     line2: 'Platforms'      },
  { id: 'media',         eraNum: 1, label: 'Media Transformation',  line1: 'Media',         line2: 'Transformation' },
]

export const ERA_CARDS = {
  ai: [
    { num: '01', label: 'Case Study 1', title: 'Reimagining Hiring as an Intelligent, Human-in-the-Loop System', id: 'cs1' },
    { num: '02', label: 'Case Study 2', title: 'Ensuring Payroll Accuracy at Scale Through Agent-Guided Systems', id: 'cs2' },
    { num: '03', label: 'Framework',    title: 'Think, Shape, Realize', id: 'how' },
  ],
  workforce: [
    { num: '01', label: 'Case Study 1', title: 'MyADP & ADP Mobile, Transforming Workforce Software Into an Employee-Centered Platform', id: 'wp1' },
  ],
  institutional: [
    { num: '01', label: 'Case Study 1', title: 'Marquee Trader, Modernizing Institutional Trading Workflows', id: 'is1' },
    { num: '02', label: 'Case Study 2', title: 'GS Now, Market Financial Research Accessible Beyond the Desktop', id: 'is2' },
    { num: '03', label: 'Case Study 3', title: 'Market Insights Quickpoll, Turning Manual Research into Real-Time Intelligence', id: 'is3' },
  ],
  media: [
    { num: '01', label: 'Case Study 1', title: 'MTV University, Transforming 600+ College Publications to Digital', id: 'mt1' },
    { num: '02', label: 'Case Study 2', title: 'CBS Local, Rebuilding Local News for the Digital Era', id: 'mt3' },
    { num: '03', label: 'Case Study 3', title: 'Audio Roadshow, Transforming Talk Radio into a Real-Time Participatory Media Platform', id: 'mt4' },
  ],
}

export const ERA_NAV = {
  ai:            [['cs1','Hiring'], ['cs2','Payroll'], ['how','Framework']],
  workforce:     [['wp1','MyADP & ADP Mobile']],
  institutional: [['is1','Marquee'], ['is2','GS Now'], ['is3','Quickpoll']],
  media:         [['mt1','MTV Univ.'], ['mt3','CBS Local'], ['mt4','Audio Roadshow']],
}

/* ── Era accent colors ── */
export const ERA_COLORS = {
  ai:            { bg: '#0a0a0a', accent: '#00d4ff', dim: 'rgba(0,212,255,0.15)' },
  institutional: { bg: '#050d1a', accent: '#3dd6c0', dim: 'rgba(61,214,192,0.15)' },
  workforce:     { bg: '#0d0f14', accent: '#7eb8f7', dim: 'rgba(126,184,247,0.15)' },
  media:         { bg: '#100508', accent: '#f7508a', dim: 'rgba(247,80,138,0.15)' },
}
