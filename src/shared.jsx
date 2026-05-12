import { useState, useEffect, useRef } from 'react'

export const HF = "'Bebas Neue', sans-serif"   // headings
export const MF = "'IBM Plex Mono', monospace" // labels / eyebrows
export const BF = "'IBM Plex Sans', sans-serif" // body.

/* ── Real image — screendoor + vignette overlays ── */
export function CaseImg({ src, alt, caption, darkCaption = false }) {
  return (
    <figure style={{ margin: '3rem calc(-1 * var(--mg)) 0', padding: 0 }}>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#000' }}>
        <img
          src={src}
          alt={alt}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
        {/* Screendoor: fine dot grid */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`sd-${alt.replace(/\W/g,'').slice(0,10)}`} width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.65" fill="rgba(0,0,0,0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#sd-${alt.replace(/\W/g,'').slice(0,10)})`} />
        </svg>
        {/* Vignette: radial gradient darkening edges */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.05) 100%)',
        }} />
      </div>
      {caption && (
        <figcaption style={{
          fontFamily: MF, fontSize: 11, lineHeight: 1.6,
          marginTop: 0,
          paddingTop: '0.75rem', paddingBottom: '0.75rem',
          paddingLeft: 'calc(var(--mg) + 0.75rem)',
          paddingRight: 'var(--mg)',
          borderLeft: '2px solid #000',
          borderBottom: darkCaption ? '2px solid #000' : 'none',
          marginLeft: 0, marginRight: 0,
          color: darkCaption ? 'rgba(255,255,255,0.75)' : '#666',
          background: darkCaption ? '#000' : 'transparent',
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ── Visual placeholder - full-width, prominent ── */
export function Placeholder({ label, caption, darkCaption = false }) {
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
        <figcaption style={{
          fontFamily: MF, fontSize: 11, lineHeight: 1.6,
          marginTop: 0,
          paddingTop: '0.75rem', paddingBottom: '0.75rem',
          paddingLeft: 'calc(var(--mg) + 0.75rem)',
          paddingRight: 'var(--mg)',
          borderLeft: '2px solid #000',
          borderBottom: darkCaption ? '2px solid #000' : 'none',
          marginLeft: 0, marginRight: 0,
          color: darkCaption ? 'rgba(255,255,255,0.75)' : '#666',
          background: darkCaption ? '#000' : 'transparent',
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ── Rule ── */
export function Rule() {
  return <div style={{ width: '100%', height: 1, background: '#DEDEDE', margin: '0' }} />
}

/* ── Section eyebrow ── */
export function Label({ children }) {
  return (
    <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', marginBottom: '1rem' }}>
      {children}
    </p>
  )
}

/* ── Insight quote ── */
export function Insight({ text }) {
  return (
    <div style={{ borderTop: '2px solid #000', padding: '2rem 0 0', margin: '2.5rem 0 0' }}>
      <p style={{ fontFamily: HF, fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', color: '#000', lineHeight: 1.1, letterSpacing: '0.01em', maxWidth: '80%' }}>
        {text}
      </p>
    </div>
  )
}

/* ── Why It Matters ── */
export function Why({ text }) {
  return (
    <div style={{ borderLeft: '4px solid #000', padding: '.25rem 1.5rem', margin: '1.75rem 0 0' }}>
      <p style={{ fontFamily: MF, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: '0.5rem' }}>Why It Matters</p>
      <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, color: '#000', fontStyle: 'italic' }}>{text}</p>
    </div>
  )
}

/* ── Design decision callout ── */
export function Decision({ text }) {
  return (
    <div style={{ border: '2px solid #000', padding: '1.25rem 1.5rem', margin: '1.75rem 0 0' }}>
      <p style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Key Design Decision</p>
      <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, color: '#000', fontStyle: 'italic' }}>{text}</p>
    </div>
  )
}

/* ── Hidden complexity callout ── */
export function HiddenComplexity({ text }) {
  return (
    <div style={{ background: '#000', padding: '1.25rem 1.5rem', margin: '1.75rem 0 0' }}>
      <p style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'white', marginBottom: '0.5rem' }}>Design Insight</p>
      <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic' }}>{text}</p>
    </div>
  )
}

/* ── Dot list ── */
export function Dots({ items }) {
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
export function MomentHead({ num, tag, title }) {
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
export function Reflection({ text }) {
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
export function VideoFigure({ src, caption }) {
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
