import { useRef } from 'react'
import { HF, MF, BF } from '../shared.jsx'
import { ERA_CARDS } from '../constants.js'
import { AnimatedSystemGraph } from '../backgrounds/AIBackground.jsx'
import { EraTimeline } from '../components/EraTimeline.jsx'
import { Footer } from '../components/Footer.jsx'

export function HomePage({ navigate }) {
  const svgRef = useRef(null)

  return (
    <div style={{ fontFamily: BF, background: '#fff', color: '#000', '--mg': '10vw' }} className="cs-root">

      {/* ── HERO ── */}
      <section className="dark-section" style={{ padding: '5.8vw var(--mg) 0vw', position: 'relative', overflow: 'hidden', background: '#000', color: '#fff' }}>
        <AnimatedSystemGraph ref={svgRef} />

        <p style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem', position: 'relative', zIndex: 1 }}>
          AI Systems & Transformation Case Studies
        </p>

        <h1 style={{ fontFamily: HF, fontSize: 'clamp(4.25rem, 11.9vw, 11.9rem)', lineHeight: 0.88, letterSpacing: '-0.01em', margin: '0 0 1rem', maxWidth: '100%', position: 'relative', zIndex: 1 }}>
          Serafin<br />Vazquez
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '0rem', position: 'relative', zIndex: 1, maxWidth: 600 }}>
          <p style={{ fontFamily: BF, fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
            From media networks to institutional platforms to AI-native systems, I've helped organizations navigate major technology shifts and redesign how people and systems work together.
          </p>
          <p style={{ fontFamily: BF, fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
            The work spans publishing networks, trading platforms, workforce systems, and emerging AI-native experiences.
          </p>
          <p style={{ fontFamily: BF, fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
            Across each era, the focus was on simplifying complexity, connecting workflows, and building systems designed to scale.
          </p>
          <p style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '2.5rem 0 0' }}>
            Select an era to explore the work.
          </p>
        </div>
      </section>

      {/* ── ERA TIMELINE ── */}
      <div style={{ background: '#000', paddingBottom: '3rem' }}>
        <EraTimeline
          activeEra={null}
          onSwitch={(eraId) => navigate(eraId)}
          onHome={() => navigate('home')}
          stuck={false}
          dark={true}
          showInline={true}
        />
      </div>

      <Footer />

    </div>
  )
}
