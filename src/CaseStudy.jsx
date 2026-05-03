import { useState, useEffect, useRef } from 'react'

const FONTS = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap'

const HF = "'Bebas Neue', sans-serif"   // headings
const MF = "'IBM Plex Mono', monospace" // labels / eyebrows
const BF = "'IBM Plex Sans', sans-serif" // body.    

/* ── Visual placeholder - full-width, prominent ── */
function Placeholder({ label, caption }) {
  const id = 'g' + label.replace(/\W/g, '').slice(0, 12)
  return (
    <figure style={{ margin: '3rem calc(-1 * var(--mg)) 0', padding: 0 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '21/9', background: '#000', border: '3px solid #000', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 3, background: 'white' }} />
          <p style={{ fontFamily: MF, color: 'rgba(255,255,255,0.5)', fontSize: 13, textAlign: 'center', padding: '0 3rem', lineHeight: 1.6 }}>{label}</p>
        </div>
      </div>
      {caption && (
        <figcaption style={{ fontFamily: MF, fontSize: 11, color: '#666', marginTop: '0.75rem', lineHeight: 1.6, borderLeft: '2px solid #000', paddingLeft: '0.75rem', marginLeft: 'var(--mg)', marginRight: 'var(--mg)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ── Rule ── */
function Rule() {
  return <div style={{ width: '100%', height: 1, background: '#DEDEDE', margin: '0' }} />
}

/* ── Section eyebrow ── */
function Label({ children }) {
  return (
    <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', marginBottom: '1rem' }}>
      {children}
    </p>
  )
}

/* ── Insight quote ── */
function Insight({ text }) {
  return (
    <div style={{ borderTop: '2px solid #000', padding: '2rem 0', margin: '2.5rem 0 0' }}>
      <p style={{ fontFamily: HF, fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: '#000', lineHeight: 1.1, letterSpacing: '0.01em', maxWidth: '80%' }}>
        {text}
      </p>
    </div>
  )
}

/* ── Why It Matters ── */
function Why({ text }) {
  return (
    <div style={{ borderLeft: '4px solid #000', padding: '.25rem 1.5rem', margin: '1.75rem 0 0' }}>
      <p style={{ fontFamily: MF, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Why It Matters</p>
      <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, color: '#000', fontStyle: 'italic' }}>{text}</p>
    </div>
  )
}

/* ── Design decision callout ── */
function Decision({ text }) {
  return (
    <div style={{ border: '2px solid #000', padding: '1.25rem 1.5rem', margin: '1.75rem 0 0' }}>
      <p style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Key Design Decision</p>
      <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, color: '#000', fontStyle: 'italic' }}>{text}</p>
    </div>
  )
}

/* ── Hidden complexity callout ── */
function HiddenComplexity({ text }) {
  return (
    <div style={{ background: '#000', padding: '1.25rem 1.5rem', margin: '1.75rem 0 0' }}>
      <p style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'white', marginBottom: '0.5rem' }}>Hidden Complexity</p>
      <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic' }}>{text}</p>
    </div>
  )
}

/* ── Dot list ── */
function Dots({ items }) {
  return (
    <ul style={{ listStyle: 'none', margin: '1rem 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontFamily: MF, fontSize: 13, marginTop: 2, flexShrink: 0 }}>-</span>
          <span style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.65, color: '#000', fontWeight: 300 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ── Moment / Layer number + title ── */
function MomentHead({ num, tag, title }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'start', columnGap: 'clamp(24px, 3vw, 40px)', borderLeft: '8px solid #000', paddingLeft: '1.5rem' }}>
        <span style={{ fontFamily: HF, fontSize: 'clamp(4rem, 6vw, 6rem)', color: '#000', lineHeight: 1.1, userSelect: 'none', letterSpacing: '-0.02em' }}>{num}</span>
        <div>
          <p style={{ fontFamily: MF, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', margin: 0 }}>{tag}</p>
          <h3 style={{ fontFamily: HF, fontSize: 'clamp(2.25rem, 4.5vw, 4rem)', color: '#000', lineHeight: 0.95, letterSpacing: '0.01em', margin: 0 }}>{title}</h3>
        </div>
      </div>
      <Rule />
    </div>
  )
}

/* ── Reflection banner ── */
function Reflection({ text }) {
  return (
    <div className="dark-section" style={{ background: '#000', padding: '5rem var(--mg)' }}>
      <p style={{ fontFamily: HF, fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: 'white', lineHeight: 1.15, letterSpacing: '0.01em', maxWidth: 900 }}>
        {text}
      </p>
    </div>
  )
}

/* ── Video figure — autoplay on scroll into view, screendoor + vignette ── */
let _sdIdx = 0
function VideoFigure({ src, caption }) {
  const patId = 'sdv' + (++_sdIdx)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <figure style={{ margin: '3rem calc(-1 * var(--mg)) 0', padding: 0 }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <video
          ref={ref}
          src={src}
          playsInline
          preload="auto"
          muted
          loop
          style={{ width: '100%', display: 'block', maxHeight: '80vh', objectFit: 'cover' }}
        />
        {/* screendoor */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={patId} width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="1" height="1" fill="rgba(0,0,0,0.10)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patId})`} />
        </svg>
        {/* vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, transparent 5%, transparent 95%, rgba(0,0,0,0.10) 100%)', pointerEvents: 'none' }} />
      </div>
      {caption && (
        <figcaption style={{ fontFamily: MF, fontSize: 11, color: '#666', marginTop: '0.75rem', lineHeight: 1.6, borderLeft: '2px solid #000', paddingLeft: '0.75rem', marginLeft: 'var(--mg)', marginRight: 'var(--mg)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ────────────────────────────────────────────────
   MAIN
─────────────────────────────────────────────── */
export default function CaseStudy() {
  const [navVisible, setNavVisible] = useState(false)
  const [navDark, setNavDark] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS
    document.head.appendChild(link)
    return () => { try { document.head.removeChild(link) } catch (_) {} }
  }, [])

  useEffect(() => {
    const NAV_H = 52
    const fn = () => {
      setNavVisible(window.scrollY > 80)
      const dark = [...document.querySelectorAll('.dark-section')].some(el => {
        const r = el.getBoundingClientRect()
        return r.top < NAV_H && r.bottom > 0
      })
      setNavDark(dark)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div style={{ fontFamily: BF, background: '#fff', color: '#000', '--mg': '10vw' }} className="cs-root">
      <style>{`
        .cs-root p {
          line-height: 1.8;
          margin-bottom: 1.25rem;
          max-width: 720px;
        }
        .cs-root p:last-child { margin-bottom: 0; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: `1px solid ${navDark ? 'rgba(255,255,255,0.15)' : '#E0E0E0'}`,
        background: navDark ? '#000' : '#fff',
        transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: navVisible ? 1 : 0,
        transition: 'transform 0.25s ease, opacity 0.25s ease, background 0.2s ease, border-color 0.2s ease',
      }}>
        <div style={{ padding: '0 var(--mg)', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontFamily: HF, fontSize: 22, letterSpacing: '0.05em', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: navDark ? '#fff' : '#000', transition: 'color 0.2s ease' }}>
            <span className="nav-full-name">Serafin Vazquez</span>
            <span className="nav-short-name">SV</span>
          </button>
          <div style={{ display: 'flex', gap: '3rem' }}>
            {[['cs1', 'Hiring'], ['cs2', 'Payroll'], ['how', 'How I Work']].map(([id, label]) => (
              <button key={id} onClick={() => go(id)} style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', color: navDark ? '#fff' : '#000', padding: 0, transition: 'color 0.2s ease' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: 'var(--mg) var(--mg) 6vw', borderBottom: '1px solid #E0E0E0', position: 'relative', overflow: 'hidden' }}>

      {/* Faint system / data flow background */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          right: 'calc(var(--mg) * 0.5)',
          top: -210,
          width: 'clamp(320px, 42vw, 620px)',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >

        {/* primary flow paths */}
        <g stroke="rgba(0,0,0,0.07)" strokeWidth="1.5">
          <path d="M40 300 C120 260, 200 200, 340 120" />
          <path d="M60 260 C140 220, 220 160, 360 80" />
          <path d="M80 340 C160 300, 240 240, 360 160" />
        </g>

        {/* secondary branching */}
        <g stroke="rgba(0,0,0,0.05)" strokeWidth="1">
          <path d="M200 200 L260 160" />
          <path d="M200 200 L240 260" />
          <path d="M260 160 L300 140" />
          <path d="M240 260 L300 280" />
        </g>

        {/* nodes (varying weight = hierarchy) */}
        <g fill="rgba(0,0,0,0.12)">
          <circle cx="40" cy="300" r="3" />
          <circle cx="60" cy="260" r="2.5" />
          <circle cx="80" cy="340" r="2.5" />

          <circle cx="200" cy="200" r="4" /> {/* hub */}

          <circle cx="260" cy="160" r="3" />
          <circle cx="240" cy="260" r="3" />

          <circle cx="300" cy="140" r="2.5" />
          <circle cx="300" cy="280" r="2.5" />

          <circle cx="340" cy="120" r="3" />
          <circle cx="360" cy="80" r="2.5" />
          <circle cx="360" cy="160" r="2.5" />
        </g>

      </svg>
        <p style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
          AI-Driven Product Design Case Studies
        </p>

        <h1 style={{ fontFamily: HF, fontSize: 'clamp(5rem, 14vw, 14rem)', lineHeight: 0.88, letterSpacing: '-0.01em', margin: '0 0 1rem', maxWidth: '100%', position: 'relative', zIndex: 1 }}>
          Serafin<br />Vazquez
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '3.5rem', position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 'clamp(1.125rem, 1.8vw, 1.375rem)', lineHeight: 1.4, fontWeight: 700, margin: '0 0 1rem' }}>
            I design systems that bring clarity to complex, high stakes decisions.
          </p>
          <p style={{ fontFamily: BF, fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)', lineHeight: 1.8, fontWeight: 300, margin: '0 0 1rem' }}>
            I lead UX at ADP, working with product, engineering, and research to design intelligent systems in complex, high stakes environments. Over the last few years, AI has changed how I approach these problems. What once looked like workflows are actually systems of signals, decisions, and coordination across people and technology.
          </p>
          <p style={{ fontFamily: BF, fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
            I stay hands on, working closely with design, content, and research, and partnering with senior product and engineering leaders. We debate where AI should lead, where humans must stay in control, and what responsibility looks like in systems that make real decisions. These are not always easy calls, and there is often tension across teams. That tension is part of the work. It is how better systems get built.
          </p>
        </div>

        {/* Case index */}

        {/* Current State label */}
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Case Studies</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #E0E0E0', position: 'relative', zIndex: 1 }} className="case-index">
          {[
            { num: '01', label: 'Case Study 1', title: 'Reimagining Hiring as an Intelligent, Human-in-the-Loop System', id: 'cs1' },
            { num: '02', label: 'Case Study 2', title: 'Ensuring Payroll Accuracy at Scale Through Agent-Guided Systems', id: 'cs2' },
            { num: '03', label: 'Framework', title: 'Think - Shape - Realize', id: 'how' },
          ].map(({ num, label, title, id }, i) => (
            <button key={id} onClick={() => go(id)} className="case-card" style={{
              borderTop: 'none',
              borderRight: i < 2 ? '1px solid #E0E0E0' : 'none',
              padding: '2rem',
              textAlign: 'left', background: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
            }}>
              <span style={{ fontFamily: HF, fontSize: '3.5rem', color: '#000', display: 'block', lineHeight: 1, marginBottom: '0.5rem' }}>{num}</span>
              <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {label}
                <span className="case-arrow" style={{ display: 'inline-block', opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.2s ease, transform 0.2s ease' }}>→</span>
              </p>
              <p style={{ fontFamily: BF, fontSize: 20, fontWeight: 500, lineHeight: 1.4, color: '#000', margin: 0 }}>{title}</p>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CASE STUDY 1
      ══════════════════════════════════════════ */}
      <section id="cs1" style={{ padding: '6vw var(--mg) 0' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '0' }}>
          <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 01</span>
        </div>

        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          Reimagining Hiring<br />as an Intelligent,<br />Human-in-the-Loop System
        </h2>

        <p>Hiring fails at scale because it is treated as a workflow instead of a system.</p>

        {/* Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0',  }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Overview</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              Hiring at scale breaks down under complexity. Work is fragmented across teams, tools, and approvals, slowing the process when speed matters most. Roles take too long to open, candidates wait, and decisions drag. This is not just operational. Hiring is often the first real interaction with a company, and a slow, inconsistent experience erodes trust before a relationship even begins.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              We reframed hiring as a coordinated system powered by AI with humans in the loop. AI accelerates execution and surfaces meaningful signals, while people remain accountable for decisions. The goal was not full automation. It was to help teams move faster, stay aligned, and make better decisions at scale.
            </p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Redefine hiring as a coordinated system, not a sequence of tasks.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              Align product, engineering, and business partners around a shared model for how decisions are made, how signals are surfaced, and how work moves across the system. The challenge was not just speed. It was establishing clear ownership, boundaries, and control in a system where AI and humans operate together.
            </p>
          </div>
        </div>

        {/* Current State label */}
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>
              Hiring slows down early and never recovers.
            </p>
        <Rule weight={3} />

        {/* Current State stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid #E0E0E0' }} className="stats-row">
          {[
            {
              n: '7–10', d: 'days to create and open a job requisition',
              insight: 'Manual intake and approvals create early delays.',
              icon: (
                <svg width="48" height="48" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="30" height="27" rx="3"/>
                  <line x1="3" y1="14" x2="33" y2="14"/>
                  <line x1="11" y1="3" x2="11" y2="9"/>
                  <line x1="25" y1="3" x2="25" y2="9"/>
                  <rect x="9.5" y="19" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="16.5" y="19" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="23.5" y="19" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="9.5" y="25" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="16.5" y="25" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="23.5" y="25" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                </svg>
              )
            },
            {
              n: '12–18', d: 'days to schedule an initial screening',
              insight: 'Coordination across calendars and systems slows the process.',
              icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              )
            },
            {
              n: '~45', d: 'average days, time to hire',
              insight: 'Lengthy cycles impact speed, candidate experience, and business.',
              icon: (
                <svg width="48" height="48" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="14"/>
                  <line x1="18" y1="9" x2="18" y2="18"/>
                  <line x1="18" y1="18" x2="24" y2="22"/>
                </svg>
              )
            },
          ].map(({ n, d, icon }, i) => (
            <div key={n} style={{ padding: '3rem', borderRight: i < 2 ? '1px solid #E0E0E0' : 'none' }}>
              <div style={{ height: 64, display: 'flex', alignItems: 'flex-end', marginBottom: '0.75rem', color: '#000' }}>{icon}</div>
              <div style={{ fontFamily: HF, fontSize: 'clamp(4rem, 7vw, 7rem)', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: '0.5rem' }}>{n}</div>
              <div style={{ fontFamily: BF, fontSize: 14, color: '#444', lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '2rem', maxWidth: 720 }}>
              Delays compound across the process. Work stalls early, coordination breaks down, and teams struggle to move with confidence. The issue is not any single step. It is how the system fails to move together.
            </p>

        {/* Role + Approach */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Led the definition of an AI-driven hiring system, aligning product, engineering, and research around a shared model for how humans and agents operate together.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              Established the operating model, interaction patterns, and decision frameworks that guided cross-functional teams in designing, building, and scaling the system.
            </p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Approach</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
             Hiring breaks down at scale because coordination is distributed across systems, stakeholders, and tools. We saw this play out across the process, but the bigger issue was ownership. No one owns the full system, so no one can fix it.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              We reframed hiring as a coordinated system. I worked closely with product and engineering leaders to define how humans and agents operate together. This was not straightforward. There were real debates on how much control to give AI, when to bring humans into the loop, and what accountability looks like in a system making decisions at scale.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              We aligned on a model where AI surfaces, synthesizes, and recommends, while humans remain accountable for decisions. The result is a multi-agent system that accelerates execution, improves consistency, and scales decision-making with trust.
            </p>
          </div>
        </div>

        {/* ── KEY MOMENT 1 ── */}
        <div style={{ padding: '4rem 0 0', marginBottom: 0, paddingBottom: '1rem' }}>
          <MomentHead num="01" tag="Key Moment" title="Proactive Signal Detection" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ maxWidth: 720 }}>
              <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
                Hiring typically starts too late.
              </p>
              <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
                In large organizations, the need is recognized after the problem has already formed. By the time a requisition is opened, teams are reacting, not planning.
              </p>
              <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
                We shifted hiring from reactive to proactive. The system surfaces signals early, using data like budget, engagement, team performance, and skill gaps to identify when action is needed.
              </p>
              <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
                AI brings these signals into context, helping managers recognize and act before the situation becomes urgent.
              </p>
              <Why text="The earlier hiring starts, the faster and more confidently teams can act." />
            </div>
            <div> 
              <Label>Role Checklist</Label>
              <Dots items={['Defining the end-to-end experience narrative', 'Shaping key product moments across the hiring journey', 'Partnering with research to validate trust and adoption points', 'Aligning product and engineering around human + agent collaboration', 'Supporting the keynote presented to enterprise clients']} />
            </div>
          </div>
          <VideoFigure src="/assets/Org-chart.mp4" caption="AI surfaces organizational risk in context, helping teams recognize what matters and act faster with confidence." />
          <Insight text="Hiring does not start when a requisition is opened. It starts when a need is recognized." />
        </div>

        {/* ── KEY MOMENT 2 ── */}
        <div style={{ padding: '4rem 0 0', marginBottom: 0, paddingBottom: '1rem' }}>
          <MomentHead num="02" tag="Key Moment" title="Orchestrating Talent Selection" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              After a hiring need is identified, defining the role becomes the next point of friction, fragmented across systems, tools, and stakeholders.
            </p>
             <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              We introduced a coordinated system for talent selection. Hiring managers define the role, while AI agents work in parallel to support sourcing, screening, and role definition.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              AI supports the process by:
            </p>
            <Dots items={['Generating and refining job descriptions', 'Identifying the skills that matter most', 'Recommending sourcing approaches', 'Shaping screening criteria', 'Creating structured interview questions']} />
            <Why text="The value is not automation. It is coordination that makes the system faster, more consistent, and easier to trust." />
          </div>
          <VideoFigure src="/assets/Open-requisition.mp4" caption="This experience shows how hiring managers and recruiters coordinate sourcing and interview agents, using signals aggregated across systems to move candidates through the process with speed and clarity." />
          <Insight text="AI helps shape the role, reducing manual effort while improving the quality of candidate signals." />
        </div>

        {/* ── KEY MOMENT 3 ── */}
        <div style={{ padding: '4rem 0 0', marginBottom: 0, paddingBottom: '1rem' }}>
          <MomentHead num="03" tag="Key Moment" title="Accelerating Decisions" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Hiring decisions slow down when information is fragmented.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              Signals are spread across interviews, systems, and stakeholders, making it difficult for teams to evaluate candidates with confidence.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              We introduced a unified candidate intelligence layer that brings these signals together. AI synthesizes interviews, feedback, and data into structured summaries, helping teams compare candidates side by side and move forward with clarity.
            </p>
            <Why text="The value is not more data. It is shared understanding that enables faster, more confident decisions." />
          </div>
          <VideoFigure src="/assets/Candidate-match.mp4" caption="AI brings candidate information together, helping teams compare, align, and make decisions with confidence." />
          <Insight text="The challenge is not collecting information. It is turning it into shared understanding." />
        </div>

        {/* ── SUPPORTING CAPABILITY ── */}
        <div style={{ padding: '4rem 0', borderBottom: '1px solid #E0E0E0' }}>
          <Label>Supporting Capability</Label>
          <h3 style={{ fontFamily: HF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, letterSpacing: '0.02em', margin: '0.5rem 0 2rem' }}>Context-Aware Evaluation</h3>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              This capability focuses on candidate screening at scale, where speed matters most. For high-volume roles, some clients see 200+ applicants per requisition, making it difficult to evaluate candidates quickly and consistently.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              The system adapts screening based on role requirements, but only where it adds value. In areas like language validation, AI can move quickly and in context. If a role requires bilingual ability, the agent follows up in Spanish to validate real-world capability, not just self-reported input. Clients responded strongly to this. It showed how AI can be precise without feeling generic or robotic.
            </p>
          </div>
          <VideoFigure src="/assets/Candidate-screening.mp4" caption="Visual simulation of recorded agent interactions from the live demo. Applauded by clients for demonstrating multilingual support and real-time conversational adaptability, including seamless handling of interruptions." />
        </div>

      </section>

      {/* CS1 Impact */}
      <div className="dark-section" style={{ background: '#000', padding: '5vw var(--mg)' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white', margin: '0 0 1rem' }}>Impact</p>
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: '0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="stats-row">
          {[
            {
              big: '~40%', mid: 'Reduction in time to hire', sub: 'early indicators',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="14" cy="14" r="11"/>
                  <polyline points="14 8 14 14 18 16"/>
                </svg>
              )
            },
            {
              big: '10X', mid: 'Faster requisition setup', sub: 'reduced manual coordination',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 8 16 14 16 12 25 20 12 14 12 16 3"/>
                </svg>
              )
            },
            {
              big: 'Keynote', mid: 'Presented to 1,200+ enterprise clients and executive leadership', sub: 'to 1,200 clients and executive leadership',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="24" height="16" rx="1.5"/>
                  <line x1="14" y1="19" x2="14" y2="23"/>
                  <line x1="14" y1="23" x2="9" y2="27"/>
                  <line x1="14" y1="23" x2="19" y2="27"/>
                </svg>
              )
            },
          ].map(({ big, mid, sub, icon }, i) => (
            <div key={big} style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', paddingRight: i < 2 ? '3rem' : 0, paddingLeft: i > 0 ? '3rem' : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
              <div style={{ height: 64, display: 'flex', alignItems: 'flex-end', marginBottom: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>{icon}</div>
              <div style={{ fontFamily: HF, fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'white', lineHeight: 0.9, marginBottom: '0.625rem' }}>{big}</div>
              <div style={{ fontFamily: BF, fontSize: 14, color: 'rgba(255,255,255,0.87)' }}>{mid}</div>
            </div>
          ))}
        </div>
        <figure style={{ margin: '3rem calc(-1 * var(--mg)) 0', padding: 0 }}>
          <div style={{ position: 'relative' }}>
            <img src="/assets/Apr 30, 2026, 06_23_17 PM.png" alt="ADP Meeting of the Minds keynote stage" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '60vh' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 25%, transparent 45%, transparent 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.92) 100%)', pointerEvents: 'none' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="sdimg" width="4" height="4" patternUnits="userSpaceOnUse">
                  <rect width="1" height="1" fill="rgba(0,0,0,0.18)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sdimg)" />
            </svg>
          </div>
          <figcaption style={{ fontFamily: MF, fontSize: 11, color: '#666', marginTop: '0.75rem', lineHeight: 1.6, borderLeft: '2px solid #000', paddingLeft: '0.75rem', marginLeft: 'var(--mg)', marginRight: 'var(--mg)' }}>
            The experience was presented as part of ADP's flagship client conference to enterprise clients and executive leadership.
          </figcaption>
        </figure>
      </div>

      {/* CS1 System Design */}
      <div style={{ padding: '5vw var(--mg)', borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0' }}>
        <Label>Designing the System</Label>
        <h3 style={{ fontFamily: HF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, letterSpacing: '0.02em', margin: '0.5rem 0 2rem' }}>Agentic Blueprint &amp; Canvas</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              To make this system real, we needed a shared way to think about how it should work.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              We mapped how humans and agents operate together across the experience, from frontstage interactions to backend orchestration, including where decisions are made and where trust and control must stay with people. This became a blueprint teams could align around, especially in areas where there was disagreement on how much responsibility to give AI.
            </p>
            <Dots items={['Clear boundaries between human judgment and AI execution', 'Shared understanding across product, design, and engineering', 'Alignment around legal, ethical, and trust considerations', 'A reusable model for future agent-driven workflows']} />
          </div>
          <figure style={{ margin: '3rem calc(-1 * var(--mg)) 0', padding: 0 }}>
            <div style={{ position: 'relative' }}>
              <img src="/assets/Agentic-canvas.png" alt="Agentic AI Blueprint - human and agent responsibilities" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="sdcanvas" width="4" height="4" patternUnits="userSpaceOnUse">
                    <rect width="1" height="1" fill="rgba(0,0,0,0.18)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#sdcanvas)" />
              </svg>
            </div>
            <figcaption style={{ fontFamily: MF, fontSize: 11, color: '#666', marginTop: '0.75rem', lineHeight: 1.6, borderLeft: '2px solid #000', paddingLeft: '0.75rem', marginLeft: 'var(--mg)', marginRight: 'var(--mg)' }}>
              A system-level blueprint helped align product, design, and engineering around human and agent responsibilities.
            </figcaption>
          </figure>
        </div>
      </div>

      <Reflection text="AI does not replace hiring decisions. It improves how those decisions are made. The most important design work was not making AI feel magical. It was making AI feel useful, transparent, and accountable in a workflow where trust matters." />

      {/* ══════════════════════════════════════════
          CASE STUDY 2
      ══════════════════════════════════════════ */}
      <section id="cs2" style={{ padding: '6vw var(--mg) 0' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
          <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 02</span>
        </div>

        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          Designing for Accuracy<br /> in a high stakes,<br /> Human System
        </h2>

        {/* Problem + Opportunity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Problem</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Payroll is inherently human and imperfect. Employees forget to clock time, make mistakes, or occasionally game the system, while managers juggle approvals across competing priorities. Yet expectations are absolute. People must be paid accurately and on time.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, marginTop: '1rem', fontWeight: 300 }}>
              For payroll practitioners, this creates constant pressure. They reconcile fragmented inputs, resolve issues across systems, and ensure accuracy before payroll is committed. The work is manual, error-prone, and difficult to scale, with limited visibility into where issues originate or how they cascade.
              </p>
            <Dots items={['Timesheet errors', 'Missing punches', 'Policy exceptions', 'Approval problems', 'Employee data issues', 'Pay statement variances']} />
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Design systems that ensure employees are paid accurately, reliably, and on time, while reducing operational complexity. The opportunity was not simply to create a better issue list. It was to help users understand what is wrong, why it is happening, and what to do next.
            </p>
          </div>
        </div>

        {/* Current State label */}
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State of Payroll</p>

        <Rule weight={3} />

        {/* Current State stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid #E0E0E0' }} className="stats-row">
          {[
            {
              n: '1 in 5', d: 'working Americans paid by ADP',
              insight: 'Payroll errors have a direct impact on millions of paychecks.',
              icon: <img src="/assets/icon 3 ppl.png" width="64" height="64" alt="" style={{ display: 'block' }} />
            },
            {
              n: 'High stakes', d: 'Errors directly impact paycheck accuracy',
              insight: 'Every mistake creates financial stress for real employees.',
              icon: (
                <img src="/assets/icon target.png" width="74" height="74" alt="" style={{ display: 'block' }} />
              )
            },
            {
              n: '60%', d: 'of employees receive variable pay',
              insight: 'Complexity grows with every pay type and policy variation.',
              icon: <img src="/assets/icon dollar.png" width="64" height="64" alt="" style={{ display: 'block' }} />
            },
          ].map(({ n, d, icon, insight }, i) => (
            <div key={n} style={{ padding: '3rem', borderRight: i < 2 ? '1px solid #E0E0E0' : 'none' }}>
              <div style={{ height: 80, display: 'flex', alignItems: 'flex-end', marginBottom: '0.75rem', color: '#000' }}>{icon}</div>
              <div style={{ fontFamily: HF, fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: '0.5rem' }}>{n}</div>
              <div style={{ fontFamily: BF, fontSize: 14, color: '#444', lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
          
        </div>
        <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '1rem', maxWidth: 720 }}>
            Every payroll run carries risk. Errors originate upstream, but are often discovered too late, forcing practitioners to reconcile issues under time pressure. The challenge is not just accuracy. It is knowing what matters, when to act, and how issues propagate across the system.
          </p>

        {/* Role + Approach */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Led the definition of a system for managing payroll accuracy at scale, aligning product and engineering around how issues are identified, prioritized, and resolved.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              Established the operating model and decision frameworks that shaped how risk is surfaced, understood, and addressed across the system.
            </p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Approach</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
             Payroll accuracy is a system reliability problem, not a UX problem.
            </p> 
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
             We saw that while customers focus on fixing errors before payroll is committed, the biggest source of risk originates upstream in time data maintained by managers. 
             </p>
              <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '1rem' }}>
             We reframed payroll as a coordinated system. Product and engineering aligned around how data flows, where errors are introduced, and how they propagate. This led to a model that surfaces issues earlier, guides action, and reduces downstream risk.
            </p>
          </div>
        </div>

        {/* ── LAYER 1 ── */}
        <div style={{ padding: '4rem 0 0', marginBottom: 0, paddingBottom: '1rem' }}>
          <MomentHead num="01" tag="Key Moment" title="Shifting Accountability Upstream" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              The primary source of payroll risk originated in time data maintained by managers. However, managers lacked visibility into errors and their downstream impact, resulting in issues being discovered too late in the process. We introduced mechanisms directly into the timecard experience to surface issues earlier, enabling managers to identify and correct errors before they enter payroll workflows.
            </p>
            <Dots items={['Identify timesheet issues', 'Explain what needs attention', 'Guide the manager through resolution', 'Move through issues one by one', 'Help complete the work in a single sitting']} />
            <HiddenComplexity text="Although the happy path appears simple, the underlying system supports many variations across policy rules, pay types, approval paths, employee scenarios, issue severity, manager permissions, and legacy constraints." />
            <Decision text="Early on, we explored whether more of the issue resolution could be fully automated. Through SME collaboration and workflow analysis, we found that variability in policy, context, and risk required human judgment in many situations. We shifted toward a guided, human-in-the-loop model: AI surfaces the issue, AI recommends the next action, the human reviews and confirms, and the system helps complete the workflow." />
          </div>
          <VideoFigure src="/assets/Timecard issues.mp4" caption="AI helps shift issue resolution upstream, enabling managers to correct errors before they impact payroll." />
          <Insight text="Simplicity in high stakes systems requires absorbing complexity behind the scenes." />
        </div>

        {/* ── LAYER 2 ── */}
        <div style={{ padding: '4rem 0'}}>
          <MomentHead num="02" tag="Key Moment" title="Making Variance Visible and Actionable" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Even with upstream improvements, practitioners still needed to identify and resolve discrepancies before payroll could be committed.
            </p>
             <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, marginTop: '1rem', fontWeight: 300 }}>
              This work was slow and manual. Important issues were hard to spot, and teams struggled to separate real risk from noise under time pressure.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, marginTop: '1rem', fontWeight: 300 }}>
              We introduced a system that surfaces and prioritizes meaningful change. Instead of scanning for issues, practitioners are guided to what matters most, with context on impact and risk.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, marginTop: '1rem', fontWeight: 300 }}>
              This enabled practitioners to focus on what matters most, reducing time spent scanning for issues and improving confidence in payroll accuracy before submission
            </p>
            <Dots items={['Detect differences across pay statements', 'Highlight unexpected changes in hours, pay, or deductions', 'Surface potential issues before payroll is committed', 'Help practitioners prioritize where to investigate']} />
            <Why text="The value is not finding more issues. It is knowing which ones matter before they affect paychecks." />
          </div>
          <VideoFigure src="/assets/Pay Anomalies.mp4" caption="AI surfaces and prioritizes payroll risk, enabling teams to act before issues impact outcomes." />
        </div>

        {/* ── LAYER 3 ── */}
        <div style={{ padding: '4rem 0', borderBottom: '1px solid #E0E0E0' }}>
          <MomentHead num="03" tag="Key Moment" title="Root Cause & Pay Statement Insights" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Finding a variance is only the first step. Practitioners also need to understand why it happened and whether it requires action. We shifted the experience from detection to explanation. AI explains why changes occurred, connecting data across systems to enable faster and more accurate resolution.
            </p>
            <Dots items={['Surface differences at the employee level', 'Explain likely causes using system context', 'Connect data across timesheets, policies, employee records, and prior pay cycles', 'Guide practitioners on whether action is needed']} />
            <Why text="The system does not just surface change. It helps users understand what changed, why it changed, and whether it matters." />
          </div>
          <VideoFigure src="/assets/Paycheck-summary.mp4" caption="AI explains why changes occurred, connecting data across systems to enable faster and more accurate resolution." />
          <Insight text="Payroll is not just processing data. It is creating confidence at scale." />
        </div>

      </section>

      {/* CS2 Impact */}
      <div className="dark-section" style={{ background: '#000', padding: '5vw var(--mg)' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white', margin: '0 0 1rem' }}>Impact</p>
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: '0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="stats-row">
          {[
            {
              big: '22%', mid: 'Investigation time reduced', sub: 'from ~3.5 hrs to ~2.4 hrs per payroll run',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="14" cy="14" r="11"/>
                  <polyline points="14 8 14 14 18 16"/>
                </svg>
              )
            },
            {
              big: '50%', mid: 'Faster resolution', sub: 'for managers',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 8 16 14 16 12 25 20 12 14 12 16 3"/>
                </svg>
              )
            },
            {
              big: 'Improved', mid: 'Payroll confidence before commit', sub: 'before payroll commit',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3L4 7v8c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V7L14 3z"/>
                  <polyline points="10 14 13 17 18 11"/>
                </svg>
              )
            },
          ].map(({ big, mid, sub, icon }, i) => (
            <div key={big} style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', paddingRight: i < 2 ? '3rem' : 0, paddingLeft: i > 0 ? '3rem' : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
              <div style={{ height: 64, display: 'flex', alignItems: 'flex-end', marginBottom: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>{icon}</div>
              <div style={{ fontFamily: HF, fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'white', lineHeight: 0.9, marginBottom: '0.625rem' }}>{big}</div>
              <div style={{ fontFamily: BF, fontSize: 14, color: 'rgba(255,255,255,0.87)' }}>{mid}</div>
            </div>
          ))}
        </div>
      </div>

      <Reflection text="The most critical systems are often invisible when they work well. Payroll is one of those systems. This work was not about making the experience look simple. It was about making a complex, high stakes system feel manageable for the people responsible for getting employees paid correctly and on time." />

      {/* ══════════════════════════════════════════
          HOW I WORK
      ══════════════════════════════════════════ */}
      <section id="how" style={{ padding: '6vw var(--mg) 0', borderTop: '1px solid #E0E0E0' }}>
        <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Framework</span>
        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 3rem' }}>
          How I Work:<br />Think, Shape, Realize
        </h2>

        <Rule weight={3} />

        <p style={{ fontFamily: BF, fontSize: 'clamp(1rem, 1.75vw, 1.25rem)', lineHeight: 1.75, fontWeight: 300, maxWidth: 680, padding: '2.5rem 0' }}>
          I design systems that bring clarity to complexity at scale. My work aligns product, engineering, and research around shared models so teams can navigate fragmented workflows, make decisions under pressure, and deliver high stakes outcomes with confidence.
        </p>

        {/* Three phases */}
          <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Operating Model</p>
          <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}> 
            AI did not just change the product. It changed how we work.
          </p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}> 
            We aligned design and engineering around shared models and system-first thinking, giving teams a consistent way to make decisions and build at scale.
          </p>
          </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0' }} className="stats-row">
          {[
            {
              phase: 'Think', sub: 'Vet Ideas Quickly and Collaboratively',
              desc: 'Use AI to explore ideas, pressure-test assumptions, and surface risks early, so teams can move faster with confidence.',
              icon: <img src="/assets/icon-think.png" width="84" height="84" alt="" style={{ display: 'block' }} />
            },
            {
              phase: 'Shape', sub: 'Define How Systems Behave',
              desc: 'Define how the system behaves by clarifying how humans, agents, data, and workflows work together.',
              icon: <img src="/assets/icon-shape.png" width="84" height="84" alt="" style={{ display: 'block' }} />
            },
            {
              phase: 'Realize', sub: 'Deliver and Scale',
              desc: 'Turn systems into shipped outcomes, enabling teams to deliver, learn, and scale across domains and regions.',
              icon: <img src="/assets/icon-realize.png" width="84" height="84" alt="" style={{ display: 'block' }} />
            },
          ].map(({ phase, sub, desc, icon }, i) => (
            <div key={phase} style={{ padding: '3rem', borderRight: i < 2 ? '1px solid rgba(0,0,0,0.15)' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '0.75rem' }}>
                {icon}
                <h3 style={{ fontFamily: HF, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#000', lineHeight: 1, margin: 0, letterSpacing: '0.02em' }}>{phase}</h3>
              </div>
              <p style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.65)', marginBottom: '0.75rem' }}>{sub}</p>
              <p style={{ fontFamily: BF, fontSize: 14, lineHeight: 1.75, color: '#444', fontWeight: 300, margin: 0 }}>{desc}</p>
            </div>
            
          ))}
        </div>

        {/* Scaling + Deterministic AI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0', borderBottom: '1px solid #E0E0E0', maxWidth: 720 }}>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Scaling the Capability</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
              Scaling AI required more than new features. It required a shared way of working.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
              We introduced models, frameworks, and workflows that aligned teams around system thinking and made decision-making more consistent at scale.
            </p>
            <Dots items={["Established the Agentic Canvas as a shared model for human and AI workflows", "Introduced structured AI learning to move teams from experimentation to intentional design", "Reframed design from feature delivery to system orchestration across UX, product, and engineering", "Created a shared language for human and agent collaboration"]} />
          </div>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Enabling Deterministic AI in Builder Workflows</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
              Early AI-generated experiences were fast, but inconsistent and difficult to scale.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
              We shifted from prompt-driven outputs to structured, system-driven generation, making AI reliable enough for real product use.
            </p>
            <Dots items={["Translated product patterns into structured system definitions, not just documentation", "Defined interaction rules and constraints to guide AI behavior", "Encoded decision logic into reusable models to ensure consistency", "Introduced human-in-the-loop feedback to continuously improve outputs", "Evolved AI from a creative tool into a reliable system component"]} />
          </div>
        </div>
      </section>

      {/* Final Thought */}
      <div className="dark-section" style={{ background: '#000', padding: '5vw var(--mg)' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white', marginBottom: '1rem' }}>Final Thought</p>
        <p style={{ fontFamily: HF, fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: 'white', lineHeight: 1.05, letterSpacing: '0.01em', maxWidth: 900 }}>
          The opportunity is not simply to add AI to products. It is to design systems where intelligence flows across workflows, supports human judgment, and helps organizations operate with more confidence.
        </p>
      </div>

      {/* Contact */}
      <div style={{ borderTop: '1px solid #E0E0E0', padding: 'var(--mg)',display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: HF, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1, letterSpacing: '0.02em', margin: '0 0 0.5rem' }}>Let's Connect</h2>
          <p style={{ fontFamily: MF, fontSize: 12, letterSpacing: '0.1em', color: '#666', textTransform: 'uppercase' }}>Product Design Leader · AI & Enterprise UX</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="mailto:serafin.vazquez@gmail.com" style={{ fontFamily: MF, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: '#000', padding: '0.875rem 2rem', textDecoration: 'none', border: '2px solid #000', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff' }}>
            Email
          </a>
          <a href="https://www.linkedin.com/in/serafinvazquez" style={{ fontFamily: MF, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', background: '#fff', padding: '0.875rem 2rem', textDecoration: 'none', border: '2px solid #000', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#000'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}>
            LinkedIn
          </a>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #E0E0E0', padding: '1rem var(--mg)' }}>
        <p style={{ fontFamily: MF, fontSize: 11, color: '#aaa' }}>© 2026 Serafin Vazquez</p>
      </div>

      <style>{`
        .case-card:hover .case-arrow { opacity: 1 !important; transform: translateX(3px) !important; }
        .nav-short-name { display: none; }
        .case-card { transition: background 0.15s; }
        .case-card:hover { background: #000 !important; }
        .case-card:hover p, .case-card:hover span { color: #fff !important; }
        @media (max-width: 768px) {
          .nav-full-name { display: none; }
          .nav-short-name { display: inline; }
          .hero-split, .two-col, .role-col, .dot-2col { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: 1fr !important; }
          .case-index { grid-template-columns: 1fr !important; }
          .stats-row > div { border-right: none !important; padding-left: 0 !important; border-top: 1px solid rgba(128,128,128,0.3); }
        }
      `}</style>
    </div>
  )
}
