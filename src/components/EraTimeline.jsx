import { useState, useEffect, useRef } from 'react'
import { ERAS } from '../constants.js'
import { HF, MF, BF } from '../shared.jsx'

export function EraTimeline({ activeEra, onSwitch, onHome, stuck, dark, showInline = true, pageKey }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentDark, setCurrentDark] = useState(dark)
  const pulseEls = useRef([])

  useEffect(() => { setMenuOpen(false) }, [activeEra])

  // Adaptive dark/light based on what's behind the pill nav
  useEffect(() => {
    if (!stuck) { setCurrentDark(dark); return }
    const NAV_H = 68 // top:16 + height:52
    const update = () => {
      const hasDark = [...document.querySelectorAll('.dark-section')].some(el => {
        const r = el.getBoundingClientRect()
        return r.top < NAV_H && r.bottom > 0
      })
      setCurrentDark(hasDark)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [stuck, dark])

  // Re-check color after any navigation (new page content may differ)
  useEffect(() => {
    if (!stuck) return
    const check = () => {
      const NAV_H = 68
      const hasDark = [...document.querySelectorAll('.dark-section')].some(el => {
        const r = el.getBoundingClientRect()
        return r.top < NAV_H && r.bottom > 0
      })
      setCurrentDark(hasDark)
    }
    // Small delay lets the new page DOM settle after the transition
    const t = setTimeout(check, 50)
    return () => clearTimeout(t)
  }, [pageKey, stuck])

  const pillBg     = currentDark ? 'rgba(22,22,22,0.82)'    : 'rgba(255,255,255,0.88)'
  const pillBorder = currentDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.10)'
  const pillColor  = currentDark ? '#fff'                    : '#000'
  const activeLabel = ERAS.find(e => e.id === activeEra)?.label || 'Portfolio'

  return (
    <>
      {/* ── Floating pill nav (appears when stuck=true) ── */}
      <div className="pill-nav-wrap era-pill-vt" style={{
        position: 'fixed', top: 24, left: '50%',
        transform: stuck ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(-12px) scale(0.97)',
        width: 'calc(100% - 20vw)', zIndex: 200,
        borderRadius: 20,
        backdropFilter: stuck ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: stuck ? 'blur(24px)' : 'none',
        opacity: stuck ? 1 : 0,
        pointerEvents: stuck ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }}
        onPointerDown={() => {
          const el = pulseEls.current[0]
          if (!el) return
          el.classList.remove('era-nav-bounce')
          void el.offsetWidth
          el.classList.add('era-nav-bounce')
        }}
      >
        <div ref={el => { pulseEls.current[0] = el }} className="pill-nav-inner" style={{
          borderRadius: 20,
          background: pillBg,
          border: `1px solid ${pillBorder}`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}>
          {/* Main row */}
          <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem 0 1.5rem' }}>
            <button onClick={onHome || (() => {})}
              style={{ fontFamily: HF, fontSize: 20, letterSpacing: '0.05em', color: pillColor, background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, transition: 'color 0.3s ease' }}>
              <span className="nav-full-name">Portfolio</span>
              <span className="nav-short-name">P</span>
            </button>
            {/* Desktop era links */}
            <div className="pill-desktop-links" style={{ display: 'flex', gap: 'clamp(1rem, 2.5vw, 2.5rem)' }}>
              {ERAS.map(era => (
                <button key={era.id} onClick={() => onSwitch(era.id)}
                  className={activeEra === era.id ? '' : 'pill-btn-inactive'}
                  style={{ fontFamily: MF, fontSize: 'clamp(9px,1vw,11px)', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: pillColor, opacity: activeEra === era.id ? 1 : 0.45, transition: 'opacity 0.2s, color 0.3s ease', whiteSpace: 'nowrap' }}>
                  {era.label}
                </button>
              ))}
            </div>
            {/* Mobile header */}
            <div className="pill-mobile-header" style={{ display: 'none', alignItems: 'center', gap: '0.625rem', flex: 1, justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: pillColor, opacity: 0.85, whiteSpace: 'nowrap' }}>
                {activeLabel}
              </span>
              <button onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close' : 'Menu'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: pillColor, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {menuOpen
                  ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/><line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="2" y1="4.5" x2="14" y2="4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/><line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/><line x1="2" y1="11.5" x2="14" y2="11.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>
                }
              </button>
            </div>
          </div>
          {/* Mobile dropdown */}
          <div className="pill-mobile-menu" style={{ maxHeight: menuOpen ? '240px' : 0, overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
            <div style={{ borderTop: `1px solid ${pillBorder}`, padding: '0.375rem 0 0.625rem' }}>
              {ERAS.map(era => (
                <button key={era.id} onClick={() => { onSwitch(era.id); setMenuOpen(false) }}
                  className={activeEra === era.id ? '' : 'pill-btn-inactive'}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0.625rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: MF, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: pillColor, opacity: activeEra === era.id ? 1 : 0.45, textAlign: 'left' }}>
                  <span>{era.label}</span>
                  {activeEra === era.id && <span style={{ width: 5, height: 5, borderRadius: '50%', background: pillColor, display: 'inline-block' }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Inline timeline (shown on page, fades out when pill nav takes over) ── */}
      {showInline && (
      <div className="dark-section" style={{
        position: 'sticky', top: 0, zIndex: 99, background: '#000',
        padding: '1rem var(--mg) 1.2rem',
        pointerEvents: stuck ? 'none' : 'auto',
      }}>
        <div style={{ opacity: stuck ? 0 : 1, transition: 'opacity 0.2s ease' }}>
          <div className="era-inline-nav" style={{ border: '1px solid rgba(255,255,255,0.35)', borderRadius: 20, padding: '1rem 1.5rem 1.2rem', position: 'relative', overflow: 'hidden' }}>
            <div className="era-tl-connector" style={{ position: 'absolute', bottom: 'calc(1.2rem + 5px)', left: 'calc(1.5rem + 7px)', right: 'calc(1.5rem + 7px)', height: 1, background: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }} />
            <div className="era-tl-connector-mobile" style={{ position: 'absolute', pointerEvents: 'none' }} />
            <div className="era-tl-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {ERAS.map(era => {
                const active = activeEra === era.id
                return (
                  <button key={era.id} onClick={() => onSwitch(era.id)}
                    className={active ? 'era-tl-btn era-tl-active' : 'era-tl-btn era-tl-inactive'}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, display: 'flex', flexDirection: 'column' }}>
                    <span className="era-tl-eyebrow" style={{ fontFamily: MF, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)', marginBottom: '0.2rem', display: 'block', transition: 'color 0.2s' }}>Era {era.eraNum}</span>
                    <span className="era-tl-label" style={{ fontFamily: BF, fontSize: 13, fontWeight: 500, color: active ? '#fff' : 'rgba(255,255,255,0.5)', marginBottom: '0.8rem', display: 'block', transition: 'color 0.2s' }}>
                      {era.line1}<span className="era-tl-label-l2">{era.line2}</span>
                    </span>
                    <div
                      key={active ? activeEra : era.id}
                      className={active ? 'era-node era-node-active' : 'era-node era-node-inactive'}
                      style={{ width: 14, height: 14, borderRadius: '50%', border: `1.5px solid ${active ? '#fff' : 'rgba(255,255,255,0.35)'}`, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, transition: 'border-color 0.2s', marginTop: 'auto' }}>
                      {active && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  )
}
