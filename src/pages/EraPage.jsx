import { useEffect, useRef } from 'react'
import { HF, MF, BF } from '../shared.jsx'
import { ERAS, ERA_CARDS } from '../constants.js'
import { AnimatedSystemGraph, AnimatedGlobe } from '../backgrounds/AIBackground.jsx'
import { AnimatedTriMesh } from '../backgrounds/MediaBackground.jsx'
import { AnimatedCandleChart } from '../backgrounds/InstitutionalBackground.jsx'
import { AnimatedOrgChart } from '../backgrounds/WorkforceBackground.jsx'
import { Footer } from '../components/Footer.jsx'

const ERA_INTROS = {
  ai: {
    title: 'AI / Agentic Systems',
    body: [
      'As AI began reshaping product development, my work shifted toward helping teams understand where automation speeds things up, where people still need control, and how decisions move across increasingly connected products.',
      'This era explores AI-assisted hiring, payroll accuracy, agent-driven workflows, and new ways of designing products alongside intelligent systems.',
    ],
  },
  institutional: {
    title: 'Institutional Systems',
    body: [
      'Institutional environments are built around precision, speed, and trust. My work in this era focused on bringing coherence to complex financial tools — from trading terminals to mobile research platforms — where information fragmentation created risk.',
      'Each project required understanding deeply specialized workflows before rethinking how the right information reaches the right person at the right moment.',
    ],
  },
  workforce: {
    title: 'Workforce Platforms',
    body: [
      'Workforce software has historically been designed around the needs of administrators and HR teams rather than the employees who use it every day. This era is about flipping that equation.',
      'The work here centers on reimagining how employees engage with payroll, scheduling, benefits, and career tools — making complex systems feel human.',
    ],
  },
  media: {
    title: 'Media Transformation',
    body: [
      'Legacy broadcast and print media faced a fundamental disruption as audiences moved online and mobile. My work in this era helped media organizations rebuild their digital infrastructure from the ground up.',
      'From college publishing platforms to talk radio reinvented as participatory media, these projects explored what it means to design for audiences who are now also participants.',
    ],
  },
}

export function EraPage({ eraId, navigate }) {
  const svgRef = useRef(null)
  const era = ERAS.find(e => e.id === eraId)
  const cards = ERA_CARDS[eraId] || []
  const intro = ERA_INTROS[eraId]

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [eraId])

  if (!era || !intro) return null

  return (
    <div style={{ fontFamily: BF, background: '#fff', color: '#000', '--mg': '10vw' }} className="cs-root">

      {/* ── Era intro + case study index (matches original site style) ── */}
      <div className="dark-section era-content-section" style={{ background: '#000', padding: '0 var(--mg) 4rem', position: 'relative', overflow: 'hidden' }}>
        {eraId === 'ai'             ? <AnimatedGlobe       ref={svgRef} />
       : eraId === 'media'          ? <AnimatedTriMesh     ref={svgRef} />
       : eraId === 'institutional'  ? <AnimatedCandleChart ref={svgRef} />
       : eraId === 'workforce'      ? <AnimatedOrgChart    ref={svgRef} />
       : <AnimatedSystemGraph ref={svgRef} />}

        {/* Era intro */}
        <div style={{ padding: '6.6rem 0 2.5rem', maxWidth: 760, marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: HF, fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#fff', lineHeight: 1.05, letterSpacing: '0.01em', margin: '0 0 1.5rem' }}>
            {intro.title}
          </h2>
          {intro.body.map((p, i) => (
            <p key={i} style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, color: 'rgba(255,255,255,0.7)', margin: i < intro.body.length - 1 ? '0 0 1rem' : 0, maxWidth: 520 }}>{p}</p>
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', margin: '0 0 0.75rem' }}>Case Studies</p>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.2)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cards.length}, 1fr)`, position: 'relative', zIndex: 1 }} className="case-index">
          {cards.map(({ num, label, title, id }, i) => (
            <button key={id}
              onClick={() => navigate(`${eraId}/${id}`)}
              className="case-card"
              style={{
                borderTop: 'none',
                borderRight: i < cards.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                padding: '2rem', textAlign: 'left', background: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
              }}
              onMouseEnter={e => {
                const card = e.currentTarget
                const numEl = card.querySelector('.case-num')
                if (!numEl) return
                const cr = card.getBoundingClientRect()
                const nr = numEl.getBoundingClientRect()
                card.style.setProperty('--ox', `${((nr.left + nr.width / 2 - cr.left) / cr.width * 100).toFixed(1)}%`)
                card.style.setProperty('--oy', `${((nr.top + nr.height / 2 - cr.top) / cr.height * 100).toFixed(1)}%`)
              }}
            >
              <span className="case-num" style={{ fontFamily: HF, fontSize: '3.5rem', color: '#fff', display: 'block', lineHeight: 1, marginBottom: '0.5rem' }}>{num}</span>
              <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {label}<span className="case-arrow" style={{ display: 'inline-block', transition: 'transform 0.2s ease', marginLeft: '6px' }}>→</span>
              </p>
              <p style={{ fontFamily: BF, fontSize: 20, fontWeight: 500, lineHeight: 1.4, color: '#fff', margin: 0 }}>{title}</p>
            </button>
          ))}
        </div>
      </div>

      <Footer />

    </div>
  )
}
