import { HF, MF, BF } from '../shared.jsx'

export function Footer() {
  return (
    <footer style={{
      background: '#000',
      color: '#fff',
      padding: '5rem 10vw 3.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem',
    }}>

      {/* Top rule */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }} />

      {/* Content row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>

        {/* Left: name + tagline */}
        <div>
          <p style={{
            fontFamily: MF,
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            margin: '0 0 0.6rem',
          }}>
            Product Design Leader · AI & Enterprise UX
          </p>
          <h2 style={{
            fontFamily: HF,
            fontSize: 'clamp(2.75rem, 5vw, 4rem)',
            letterSpacing: '0.01em',
            lineHeight: 1,
            color: '#fff',
            margin: 0,
          }}>
            Serafin Vazquez
          </h2>
        </div>

        {/* Right: contact buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="mailto:serafin.vazquez@gmail.com"
            className="contact-btn contact-btn-dark"
            style={{
              fontFamily: MF,
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 999,
              padding: '0.55rem 1.25rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              background: 'none',
              transition: 'border-color 0.25s ease',
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Email</span>
          </a>

          <a
            href="https://www.linkedin.com/in/serafinvazquez"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn contact-btn-dark"
            style={{
              fontFamily: MF,
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 999,
              padding: '0.55rem 1.25rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              background: 'none',
              transition: 'border-color 0.25s ease',
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Bottom: copyright */}
      <p style={{
        fontFamily: MF,
        fontSize: 9,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.2)',
        margin: 0,
      }}>
        © {new Date().getFullYear()} Serafin Vazquez
      </p>

    </footer>
  )
}
