import { useState, useEffect, useRef } from 'react'
import { HF, MF, BF } from '../shared.jsx'
import { ERAS, ERA_CARDS } from '../constants.js'
import { Footer } from '../components/Footer.jsx'

import { CS1Hiring, CS2Payroll, HowFramework } from '../studies/AIStudies.jsx'
import { WP1MyADP } from '../studies/WorkforceStudies.jsx'
import { IS1Marquee, IS2GSNow, IS3QuickPoll } from '../studies/InstitutionalStudies.jsx'
import { MT1MTV, MT3CBS, MT4Audio } from '../studies/MediaStudies.jsx'

const STUDY_MAP = {
  cs1: CS1Hiring,
  cs2: CS2Payroll,
  how: HowFramework,
  wp1: WP1MyADP,
  is1: IS1Marquee,
  is2: IS2GSNow,
  is3: IS3QuickPoll,
  mt1: MT1MTV,
  mt3: MT3CBS,
  mt4: MT4Audio,
}

/* ── Study nav — back to era · dot position · prev / next ── */
function StudyNav({ eraId, studyId, navigate }) {
  const studies  = ERA_CARDS[eraId] || []
  const era      = ERAS.find(e => e.id === eraId)
  const idx      = studies.findIndex(s => s.id === studyId)
  const prevStudy = idx > 0                  ? studies[idx - 1] : null
  const nextStudy = idx < studies.length - 1 ? studies[idx + 1] : null

  const [hoveredId,   setHoveredId]   = useState(null)
  const [hoveredBack, setHoveredBack] = useState(false)
  const [hoveredPrev, setHoveredPrev] = useState(false)
  const [hoveredNext, setHoveredNext] = useState(false)
  const [bouncingId,  setBouncingId]  = useState(null)

  if (studies.length < 1) return null

  const handleDot = (id) => {
    setBouncingId(id)
    setTimeout(() => setBouncingId(null), 400)
    navigate(`${eraId}/${id}`, 'fade')
  }

  const tooltipStyle = (visible) => ({
    position: 'absolute', right: 'calc(100% + 10px)',
    background: 'rgba(0,0,0,0.85)', color: '#fff',
    fontFamily: MF, fontSize: 10, letterSpacing: '0.12em',
    textTransform: 'uppercase', whiteSpace: 'nowrap',
    padding: '4px 8px', borderRadius: 4,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(4px)',
    transition: 'opacity 0.18s ease, transform 0.18s ease',
    pointerEvents: 'none',
  })

  const arrowBtn = (enabled, hovered) => ({
    width: 20, height: 20, border: 'none', background: 'none', padding: 0,
    color: '#fff', fontSize: 14, lineHeight: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: enabled ? (hovered ? 1 : 0.55) : 0.18,
    cursor: enabled ? 'pointer' : 'default',
    transition: 'opacity 0.18s ease',
    flexShrink: 0,
  })

  const rule = { width: '100%', height: 1, background: 'rgba(255,255,255,0.15)', margin: '5px 0' }

  return (
    <div className="cs-dot-nav" style={{
      position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 150,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '8px 8px', borderRadius: 999,
      background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    }}>

      {/* ── Back to era ── */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div style={tooltipStyle(hoveredBack)}>{era?.label}</div>
        <button
          onClick={() => navigate(eraId)}
          onMouseEnter={() => setHoveredBack(true)}
          onMouseLeave={() => setHoveredBack(false)}
          style={{
            width: 20, height: 20, borderRadius: '50%', border: 'none', padding: 0,
            background: hoveredBack ? 'rgba(255,255,255,0.15)' : 'transparent',
            color: '#fff', fontSize: 12, lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', opacity: hoveredBack ? 1 : 0.55,
            transition: 'background 0.18s ease, opacity 0.18s ease',
          }}
        >↩</button>
      </div>

      <div style={rule} />

      {/* ── Position dots ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', padding: '2px 0' }}>
        {studies.map(({ id, label }) => {
          const isActive   = studyId === id
          const isHovered  = hoveredId === id
          const isBouncing = bouncingId === id
          return (
            <div key={id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={tooltipStyle(isHovered)}>{label}</div>
              <button
                onClick={() => handleDot(id)}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className={isBouncing ? 'dot-nav-bounce' : ''}
                style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#fff',
                  opacity: isActive ? 1 : 0.35,
                  border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
                  transition: 'opacity 0.25s ease',
                }}
              />
            </div>
          )
        })}
      </div>

      <div style={rule} />

      {/* ── Prev / Next ── */}
      <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {prevStudy && <div style={{ ...tooltipStyle(hoveredPrev), fontSize: 9 }}>{prevStudy.label}</div>}
          <button
            onClick={() => prevStudy && navigate(`${eraId}/${prevStudy.id}`, 'fade')}
            onMouseEnter={() => setHoveredPrev(true)}
            onMouseLeave={() => setHoveredPrev(false)}
            style={arrowBtn(!!prevStudy, hoveredPrev)}
          >‹</button>
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {nextStudy && <div style={{ ...tooltipStyle(hoveredNext), fontSize: 9 }}>{nextStudy.label}</div>}
          <button
            onClick={() => nextStudy && navigate(`${eraId}/${nextStudy.id}`, 'fade')}
            onMouseEnter={() => setHoveredNext(true)}
            onMouseLeave={() => setHoveredNext(false)}
            style={arrowBtn(!!nextStudy, hoveredNext)}
          >›</button>
        </div>
      </div>

    </div>
  )
}

/* ── Top bar for study pages ── */
function StudyTopBar({ eraId, studyId, navigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const NAV_H = 52
    const fn = () => {
      setScrolled(window.scrollY > 80)
      const isDark = [...document.querySelectorAll('.dark-section')].some(el => {
        const r = el.getBoundingClientRect()
        return r.top < NAV_H && r.bottom > 0
      })
      setDark(isDark)
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const era = ERAS.find(e => e.id === eraId)
  const studies = ERA_CARDS[eraId] || []
  const currentStudy = studies.find(s => s.id === studyId)

  const pillBg     = dark ? 'rgba(22,22,22,0.82)'    : 'rgba(255,255,255,0.88)'
  const pillBorder = dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.10)'
  const pillColor  = dark ? '#fff'                    : '#000'

  return (
    <div style={{
      position: 'fixed', top: 16, left: '50%',
      transform: scrolled
        ? 'translateX(-50%) translateY(0) scale(1)'
        : 'translateX(-50%) translateY(-12px) scale(0.97)',
      width: 'calc(100% - 4rem)', maxWidth: 860, zIndex: 200,
      borderRadius: 20,
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
      opacity: scrolled ? 1 : 0,
      pointerEvents: scrolled ? 'auto' : 'none',
      transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <div style={{
        borderRadius: 20,
        background: pillBg,
        border: `1px solid ${pillBorder}`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem 0 1.5rem',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        {/* Left: back to era */}
        <button onClick={() => navigate(eraId)}
          style={{ fontFamily: HF, fontSize: 20, letterSpacing: '0.05em', color: pillColor, background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
          <span className="nav-full-name">Trevor</span>
          <span className="nav-short-name">TN</span>
        </button>

        {/* Center: era + study label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="pill-desktop-links" style={{ fontFamily: MF, fontSize: 'clamp(9px,1vw,11px)', letterSpacing: '0.12em', textTransform: 'uppercase', color: pillColor, opacity: 0.45, whiteSpace: 'nowrap' }}>
            {era?.label}
          </span>
          {currentStudy && (
            <>
              <span style={{ color: pillColor, opacity: 0.25, fontFamily: MF, fontSize: 10 }}>·</span>
              <span className="pill-desktop-links" style={{ fontFamily: MF, fontSize: 'clamp(9px,1vw,11px)', letterSpacing: '0.12em', textTransform: 'uppercase', color: pillColor, opacity: 1, whiteSpace: 'nowrap' }}>
                {currentStudy.label}
              </span>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

/* ── Mobile bottom bar — prev / position / next ── */
function StudyBottomBar({ eraId, studyId, navigate }) {
  const studies    = ERA_CARDS[eraId] || []
  const idx        = studies.findIndex(s => s.id === studyId)
  const prevStudy  = idx > 0                  ? studies[idx - 1] : null
  const nextStudy  = idx < studies.length - 1 ? studies[idx + 1] : null

  // Only render when there are multiple studies to navigate between
  if (studies.length <= 1) return null

  return (
    <nav className="study-bottom-bar" style={{
      position: 'fixed', bottom: 'calc(16px + env(safe-area-inset-bottom))',
      left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 3rem)', zIndex: 200,
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(0,0,0,0.10)',
      borderRadius: 999,
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      display: 'flex', alignItems: 'stretch', height: 48, overflow: 'hidden',
    }}>

      {/* ‹ Prev */}
      <button
        onClick={() => prevStudy && navigate(`${eraId}/${prevStudy.id}`, 'fade')}
        disabled={!prevStudy}
        style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 1.25rem',
          background: 'none', border: 'none', cursor: prevStudy ? 'pointer' : 'default',
          opacity: prevStudy ? 1 : 0.2,
        }}
      >
        <span style={{ fontFamily: MF, fontSize: 16, color: '#000', lineHeight: 1 }}>‹</span>
        {prevStudy && (
          <span style={{ fontFamily: MF, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.55)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {prevStudy.label}
          </span>
        )}
      </button>

      {/* Position indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 0.75rem', flexShrink: 0 }}>
        {studies.map((s, i) => (
          <button
            key={s.id}
            onClick={() => navigate(`${eraId}/${s.id}`, 'fade')}
            style={{
              width: i === idx ? 16 : 5, height: 5,
              borderRadius: 3,
              background: i === idx ? '#000' : 'rgba(0,0,0,0.2)',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'width 0.25s ease, background 0.25s ease',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Next › */}
      <button
        onClick={() => nextStudy && navigate(`${eraId}/${nextStudy.id}`, 'fade')}
        disabled={!nextStudy}
        style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8,
          padding: '0 1.25rem',
          background: 'none', border: 'none', cursor: nextStudy ? 'pointer' : 'default',
          opacity: nextStudy ? 1 : 0.2,
        }}
      >
        {nextStudy && (
          <span style={{ fontFamily: MF, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.55)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {nextStudy.label}
          </span>
        )}
        <span style={{ fontFamily: MF, fontSize: 16, color: '#000', lineHeight: 1 }}>›</span>
      </button>

    </nav>
  )
}

/* ── StudyPage ── */
export function StudyPage({ eraId, studyId, navigate }) {
  const StudyContent = STUDY_MAP[studyId]

  useEffect(() => { window.scrollTo(0, 0) }, [studyId])

  if (!StudyContent) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MF, color: '#666' }}>
        Study not found.{' '}
        <button onClick={() => navigate(eraId)} style={{ marginLeft: 8, fontFamily: MF, cursor: 'pointer', color: '#000', background: 'none', border: 'none', textDecoration: 'underline' }}>
          Back to {eraId}
        </button>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: BF, background: '#fff', color: '#000', '--mg': '10vw' }} className="cs-root">
      <style>{`
        .cs-root p { line-height: 1.8; margin-bottom: 1.25rem; max-width: 720px; }
        .cs-root p:last-child { margin-bottom: 0; }
        @keyframes era-nav-bounce {
          0%   { transform: scale(1);     box-shadow: 0 4px 24px rgba(0,0,0,.20); }
          22%  { transform: scale(0.99);  box-shadow: 0 1px 6px rgba(0,0,0,.25); }
          58%  { transform: scale(1.005); box-shadow: 0 5px 16px rgba(0,0,0,.18); }
          100% { transform: scale(1);     box-shadow: 0 4px 24px rgba(0,0,0,.20); }
        }
        .era-nav-bounce { animation: era-nav-bounce 0.4s cubic-bezier(0.22,1,0.36,1); }
        @keyframes dot-nav-bounce {
          0%   { transform: scale(1);   }
          22%  { transform: scale(0.7); }
          58%  { transform: scale(1.25);}
          100% { transform: scale(1);   }
        }
        .dot-nav-bounce { animation: dot-nav-bounce 0.4s cubic-bezier(0.22,1,0.36,1); }
        @keyframes node-idle-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          50%     { box-shadow: 0 0 0 4px rgba(255,255,255,.12); }
        }
        .stats-row { display: grid; }
        .stats-row > div { text-align: center; display: flex; flex-direction: column; align-items: center; }
        .stats-row > div > div:first-child { justify-content: center; }
        @media (max-width: 640px) {
          .stats-row { grid-template-columns: 1fr !important; }
          .stats-row > div { border-right: none !important; border-top: 1px solid rgba(128,128,128,0.25) !important; text-align: center !important; padding: 2rem 1.5rem !important; display: flex !important; flex-direction: column !important; align-items: center !important; }
          .stats-row > div:first-child { border-top: none !important; }
          .dark-section .stats-row > div { border-top: 1px solid rgba(255,255,255,.12) !important; text-align: center !important; padding: 2rem 1.5rem !important; }
          .dark-section .stats-row > div:first-child { border-top: none !important; }
          .case-index { grid-template-columns: 1fr !important; }
          .cs-root section { padding-top: 2rem !important; scroll-margin-top: 2rem !important; }
          .pill-clearance { height: 4rem !important; }
          .cs-dot-nav { display: none !important; }
          .nav-full-name { display: none; }
          .nav-short-name { display: inline; }
        }
        @media (min-width: 641px) {
          .nav-short-name { display: none; }
          .nav-full-name { display: inline; }
        }
        @media (min-width: 641px) and (max-width: 1100px) {
          .stats-row { grid-template-columns: repeat(3,1fr) !important; }
          .stats-row > div:nth-child(n+4) { border-top: 1px solid #E0E0E0; }
          .dark-section .stats-row > div:nth-child(n+4) { border-top: 1px solid rgba(255,255,255,.12); }
          .stats-row > div { padding-left:1.25rem !important; padding-right:1.25rem !important; }
        }
        @media (max-width: 960px) { .cs-dot-nav { display: none !important; } }
        /* Bottom bar: mobile only */
        .study-bottom-bar { display: none !important; }
        @media (max-width: 900px) {
          .study-bottom-bar { display: flex !important; }
          .study-footer-wrap { padding-bottom: calc(80px + env(safe-area-inset-bottom)) !important; }
        }
      `}</style>

      <StudyNav eraId={eraId} studyId={studyId} navigate={navigate} />
      <StudyBottomBar eraId={eraId} studyId={studyId} navigate={navigate} />

      {/* Pill nav clearance: guaranteed 2rem base + deficit when 6vw < 7rem (≈1867px breakpoint) */}
      <div aria-hidden="true" className="pill-clearance" style={{ height: 'max(2rem, calc(7rem - 6vw))' }} />

      <StudyContent />

      <div className="study-footer-wrap" style={{ background: '#000' }}>
        <Footer />
      </div>
    </div>
  )
}
