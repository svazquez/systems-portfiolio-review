import { useState, useEffect, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { ERAS } from './constants.js'
import { HomePage } from './pages/HomePage.jsx'
import { EraPage } from './pages/EraPage.jsx'
import { StudyPage } from './pages/StudyPage.jsx'
import { EraTimeline } from './components/EraTimeline.jsx'

const VALID_ERAS = new Set(ERAS.map(e => e.id))

const parseHash = (hash) => {
  const clean = (hash || '').replace(/^#/, '').trim()
  if (!clean || clean === 'home') return { view: 'home', era: null, study: null }
  const parts = clean.split('/')
  const era = parts[0]
  if (!VALID_ERAS.has(era)) return { view: 'home', era: null, study: null }
  if (parts[1]) return { view: 'study', era, study: parts[1] }
  return { view: 'era', era, study: null }
}

export default function CaseStudy() {
  const [navState, setNavState] = useState(() => parseHash(window.location.hash))
  const [fadeKey, setFadeKey] = useState(0)

  useEffect(() => {
    const onHashChange = () => {
      setNavState(parseHash(window.location.hash))
      setFadeKey(k => k + 1)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((hash, type) => {
    const newState = parseHash('#' + hash)
    const isToHome    = newState.view === 'home'
    const goingDeeper = (navState.view === 'home'  && newState.view === 'era')
                     || (navState.view === 'era'   && newState.view === 'study')
    const goingBack   = isToHome
                     || (navState.view === 'study' && newState.view === 'era')

    if (document.startViewTransition) {
      let vtStyle = null
      if (goingDeeper || goingBack) {
        // Directional scroll always wins over the fade hint
        const oldKf = goingDeeper ? 'vt-scroll-old'      : 'vt-scroll-old-down'
        const newKf = goingDeeper ? 'vt-scroll-new'      : 'vt-scroll-new-down'
        vtStyle = document.createElement('style')
        vtStyle.textContent = `
          ::view-transition-old(root) {
            animation: 0.5s cubic-bezier(0.76,0,0.24,1) both ${oldKf} !important;
            mix-blend-mode: normal !important;
          }
          ::view-transition-new(root) {
            animation: 0.5s cubic-bezier(0.76,0,0.24,1) both ${newKf} !important;
            mix-blend-mode: normal !important;
          }
          ${isToHome ? `
          ::view-transition-old(era-pill) {
            animation: 0.35s ease-in both era-pill-exit !important;
            mix-blend-mode: normal !important;
          }
          ` : ''}
        `
        document.head.appendChild(vtStyle)
      } else if (type === 'fade') {
        window.__bgPaused = true
        vtStyle = document.createElement('style')
        vtStyle.textContent = `
          ::view-transition-old(root) {
            animation: none !important;
            mix-blend-mode: normal !important;
          }
          ::view-transition-new(root) {
            animation: 0.35s cubic-bezier(0.22,1,0.36,1) both vt-fade-in !important;
            mix-blend-mode: normal !important;
          }
        `
        document.head.appendChild(vtStyle)
      }
      const vt = document.startViewTransition(() => {
        flushSync(() => {
          history.pushState(null, '', '#' + hash)
          setNavState(newState)
        })
        window.scrollTo(0, 0)
      })
      vt.finished.finally(() => {
        vtStyle?.remove()
        window.__bgPaused = false
      })
    } else {
      window.location.hash = hash
    }
  }, [navState])

  const { view, era, study } = navState

  return (
    <>
      <style>{`
        /* ── Page fade transition (fallback for no View Transitions) ── */
        @keyframes pageFadeIn {
          from { opacity: 0.15; }
          to   { opacity: 1; }
        }
        .page-fade { animation: pageFadeIn 0.25s ease forwards; }

        /* ── View Transitions ── */
        /* Default: no animation */
        ::view-transition-old(root),
        ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }

        /* Scroll keyframes (injected dynamically via JS per direction) */
        @keyframes vt-scroll-old      { to   { transform: translateY(-100vh); } }
        @keyframes vt-scroll-new      { from { transform: translateY(100vh);  } }
        @keyframes vt-scroll-old-down { to   { transform: translateY(100vh);  } }
        @keyframes vt-scroll-new-down { from { transform: translateY(-100vh); } }
        @keyframes era-pill-exit      { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-10px) scale(0.97); } }
        /* Fade keyframes (pill-nav / dot-nav switches) */
        @keyframes vt-fade-out { to   { opacity: 0; transform: translateY(-10px); } }
        @keyframes vt-fade-in  { from { opacity: 0; transform: translateY(14px);  } }

        /* ── Pill nav: lift out of root VT so it never scrolls with the page ── */
        .era-pill-vt { view-transition-name: era-pill; }
        /* Hide old snapshot by default — prevents double-shadow during any transition.
           Restored (with animation) only when navigating home. */
        ::view-transition-old(era-pill) { animation: none; mix-blend-mode: normal; opacity: 0; }
        ::view-transition-new(era-pill) { animation: none; mix-blend-mode: normal; }

        /* ── Case study card hover ripple + text inversion ── */
        .case-card { position: relative; overflow: hidden; }
        .case-card::before {
          content: '';
          position: absolute; inset: 0;
          background: #fff;
          clip-path: circle(0% at var(--ox,50%) var(--oy,50%));
          transition: clip-path 0.5s ease;
          pointer-events: none;
          z-index: 0;
        }
        .case-card:hover::before { clip-path: circle(150% at var(--ox,50%) var(--oy,50%)); }
        .case-card > * { position: relative; z-index: 1; }
        /* Text transitions to dark as the white circle expands */
        .case-card .case-num,
        .case-card p,
        .case-card .case-arrow { transition: color 0.45s ease, opacity 0.45s ease; }
        .case-card:hover .case-num  { color: #000 !important; }
        .case-card:hover p          { color: rgba(0,0,0,0.6) !important; }
        .case-card:hover .case-arrow { opacity: 1; }

        /* ── Era timeline animations ── */
        @keyframes era-nav-bounce {
          0%   { transform: scale(1);     box-shadow: 0 4px 24px rgba(0,0,0,.20); }
          22%  { transform: scale(0.99);  box-shadow: 0 1px 6px  rgba(0,0,0,.25); }
          58%  { transform: scale(1.005); box-shadow: 0 5px 16px rgba(0,0,0,.18); }
          100% { transform: scale(1);     box-shadow: 0 4px 24px rgba(0,0,0,.20); }
        }
        .era-nav-bounce { animation: era-nav-bounce 0.4s cubic-bezier(0.22,1,0.36,1); }
        @keyframes dot-nav-bounce {
          0%   { transform: scale(1);    }
          22%  { transform: scale(0.7);  }
          58%  { transform: scale(1.25); }
          100% { transform: scale(1);    }
        }
        .dot-nav-bounce { animation: dot-nav-bounce 0.4s cubic-bezier(0.22,1,0.36,1); }
        @keyframes node-select {
          0%   { transform: scale(1);    }
          35%  { transform: scale(1.6);  }
          70%  { transform: scale(0.95); }
          100% { transform: scale(1);    }
        }
        .era-node-active { animation: node-select 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes node-idle-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0);    }
          50%     { box-shadow: 0 0 0 4px rgba(255,255,255,.12); }
        }
        .era-node-inactive { animation: node-idle-pulse 2.8s ease-in-out infinite; }
        @keyframes node-glow {
          0%,100% { border-color: rgba(255,255,255,0.35); }
          50%     { border-color: rgba(255,255,255,0.9);  }
        }
        @keyframes eyebrow-pulse-hover {
          0%,100% { color: rgba(255,255,255,0.4);  }
          50%     { color: rgba(255,255,255,0.9);  }
        }
        @keyframes label-pulse-hover {
          0%,100% { color: rgba(255,255,255,0.5);  }
          50%     { color: rgba(255,255,255,1);     }
        }
        .era-tl-inactive:hover .era-node-inactive { animation: node-glow           1.6s ease-in-out infinite; }
        .era-tl-inactive:hover .era-tl-eyebrow    { animation: eyebrow-pulse-hover 1.6s ease-in-out infinite; }
        .era-tl-inactive:hover .era-tl-label      { animation: label-pulse-hover   1.6s ease-in-out infinite; }

        /* ── Pill nav item hover pulse ── */
        @keyframes pill-hover-pulse {
          0%,100% { opacity: 0.45; }
          50%     { opacity: 1;    }
        }
        .pill-btn-inactive:hover { animation: pill-hover-pulse 1.6s ease-in-out infinite; }

        /* ── Contact button ripple ── */
        .contact-btn { position: relative; overflow: hidden; }
        .contact-btn::before { content:''; position:absolute; inset:0; clip-path:circle(0% at 50% 50%); transition:clip-path 0.4s ease; z-index:0; pointer-events:none; }
        .contact-btn-dark::before  { background: #fff; }
        .contact-btn-dark:hover::before  { clip-path: circle(142% at 50% 50%); }
        .contact-btn-dark:hover span     { color: #000; transition: color 0.25s ease; }
        .contact-btn-light::before { background: #000; }
        .contact-btn-light:hover::before { clip-path: circle(142% at 50% 50%); }
        .contact-btn-light:hover span    { color: #fff; transition: color 0.25s ease; }

        /* ── Nav name: Serafin on desktop, SV on mobile ── */
        .nav-full-name  { display: inline; }
        .nav-short-name { display: none; }
        @media (max-width: 640px) {
          .nav-full-name  { display: none; }
          .nav-short-name { display: inline; }
        }

        /* ── Pill nav: switch to hamburger below 960px ── */
        @media (max-width: 960px) {
          .pill-desktop-links { display: none !important; }
          .pill-mobile-header { display: flex !important; }
        }
        @media (min-width: 961px) {
          .pill-mobile-header { display: none !important; }
          .pill-mobile-menu   { display: none !important; }
          .pill-nav-wrap, .pill-nav-inner { border-radius: 999px !important; }
        }

        /* ── Era timeline: mobile layout ── */
        @media (max-width: 640px) {
          .era-tl-grid        { grid-template-columns: repeat(2,1fr) !important; row-gap: 1.5rem !important; }
          .era-tl-connector   { display: none !important; }
          .era-tl-btn         { min-height: 90px !important; }
          .era-tl-grid button:nth-child(3) { order: 4; }
          .era-tl-grid button:nth-child(4) { order: 3; }
          .era-tl-connector-mobile {
            display: block !important;
            top: calc(1.25rem + 83px); bottom: calc(1.5rem + 7px);
            left: 1.5rem; right: calc(50% - 14px);
            border-top:    1px solid rgba(255,255,255,.2);
            border-right:  1px solid rgba(255,255,255,.2);
            border-bottom: 1px solid rgba(255,255,255,.2);
            border-top-right-radius:    999px;
            border-bottom-right-radius: 999px;
            width: 85%;
          }
          .era-tl-label-l2 { display: block !important; }
          .era-tl-grid button:nth-child(1) .era-node,
          .era-tl-grid button:nth-child(2) .era-node { transform: translateY(6px) !important; }
          .era-tl-grid button:nth-child(3) .era-node,
          .era-tl-grid button:nth-child(4) .era-node { transform: translateY(-4px) !important; }
          .pill-mobile-header span { font-size: 13px !important; }
          .pill-mobile-menu button { font-size: 12px !important; }
          .era-tl-label            { font-size: 15px !important; }
          .pill-nav-wrap { width: calc(100% - 4rem) !important; border-radius: 16px !important; }
          .pill-nav-inner { border-radius: 16px !important; }
          .cs-dot-nav { display: none !important; }
        }
        @media (min-width: 641px) {
          .era-tl-connector-mobile  { display: none !important; }
          .era-tl-label-l2          { display: inline; }
          .era-tl-label-l2::before  { content: ' '; }
        }
        @media (max-width: 900px) { .cs-dot-nav { display: none !important; } }

        /* ── Case index: responsive ── */
        @media (min-width: 641px) and (max-width: 1100px) {
          .case-index { grid-template-columns: repeat(3,1fr) !important; }
          .case-index .case-card { border-right: none !important; }
          .case-index .case-card:not(:nth-child(3n)) { border-right: 1px solid rgba(255,255,255,.15) !important; }
        }
        @media (max-width: 640px) {
          .case-index { grid-template-columns: 1fr !important; }
          .case-index .case-card { border-right: none !important; border-top: 1px solid rgba(255,255,255,.15) !important; }
        }
      `}</style>

      {(view === 'era' || view === 'study') && (
        <EraTimeline
          activeEra={era}
          onSwitch={(id) => navigate(id, 'fade')}
          onHome={() => navigate('home')}
          stuck={true}
          dark={true}
          showInline={false}
          pageKey={`${era}-${study}`}
        />
      )}

      <div key={fadeKey} className="page-fade">
        {view === 'home'  && <HomePage navigate={navigate} />}
        {view === 'era'   && <EraPage  eraId={era}  navigate={navigate} />}
        {view === 'study' && <StudyPage eraId={era} studyId={study} navigate={navigate} />}
      </div>
    </>
  )
}
