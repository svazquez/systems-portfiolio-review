import { useEffect, useRef, useCallback } from 'react'

const TAU = Math.PI * 2

function seededRng(seed) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}

// ── Card geometry (thin flat box = org chart node) ──
const NHW  = 24
const NHH  = 9
const NHD  = 2
const SCALE = 1.90
const FOV   = 720
const ZDOFF = 145

const SVG_W = 500
const SVG_H = 360
const CX = SVG_W * 0.46
const CY = SVG_H * 0.50

const BASE_ROT_Y = 0.44
const BASE_ROT_X = 0.33

// ── Org chart node positions (3 levels) ──
const NODES = [
  // L0 — executive
  { x:   0, y:  88, z:   4 },
  // L1 — managers
  { x: -82, y:  14, z: -12 },
  { x:   0, y:  14, z:   9 },
  { x:  82, y:  14, z:  -6 },
  // L2 — individual contributors
  { x:-128, y: -62, z:  14 },
  { x: -78, y: -62, z:  -5 },
  { x: -26, y: -62, z:  11 },
  { x:  22, y: -62, z:  -3 },
  { x:  66, y: -62, z:  16 },
  { x: 108, y: -62, z:  -7 },
  { x: 148, y: -62, z:   9 },
]

// ── Edges: [parentIdx, childIdx] ──
const EDGES = [
  [0, 1], [0, 2], [0, 3],
  [1, 4], [1, 5],
  [2, 6], [2, 7], [2, 8],
  [3, 9], [3, 10],
]

// ── Float motion ──
const _rf = seededRng(81)
const FLOAT = NODES.map(() => ({
  amp:   3 + _rf() * 5,
  freq:  0.07 + _rf() * 0.11,
  phase: _rf() * TAU,
}))

// ── Reveal: dots → card edges → connectors ──
const DOT_FADE  = 0.22
const CARD_FADE = 0.30
const CONN_FADE = 0.28
const _rd = seededRng(44)
const DOT_DELAYS  = NODES.map(() => _rd() * 0.8)
const CARD_DELAYS = NODES.map(() => 0.4 + _rd() * 1.2)
const _re = seededRng(66)
const CONN_DELAYS = EDGES.map(() => 0.8 + _re() * 2.4)

// ── Box vertex builder ──
function makeCard(cx, cy, cz) {
  return [
    [cx - NHW, cy - NHH, cz - NHD],
    [cx + NHW, cy - NHH, cz - NHD],
    [cx + NHW, cy - NHH, cz + NHD],
    [cx - NHW, cy - NHH, cz + NHD],
    [cx - NHW, cy + NHH, cz - NHD],
    [cx + NHW, cy + NHH, cz - NHD],
    [cx + NHW, cy + NHH, cz + NHD],
    [cx - NHW, cy + NHH, cz + NHD],
  ]
}

const BOX_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
]

let _sharedT = 0

export function AnimatedOrgChart({ ref: fwdRef }) {
  const animRef = useRef(null)
  const rafRef  = useRef(null)

  const mergedRef = useCallback(el => {
    animRef.current = el
    if (typeof fwdRef === 'function') fwdRef(el)
    else if (fwdRef) fwdRef.current = el
  }, [fwdRef])

  useEffect(() => {
    const svg = animRef.current
    if (!svg) return

    // Each card group: children[0..3] = 4 corner dots, [4] = card outline path
    const cardGroups = [...svg.querySelector('#wf-cards').children]
    const connLines  = [...svg.querySelector('#wf-connectors').children]

    let t0 = null, localT0 = null, pauseStart = null

    const tick = (ts) => {
      rafRef.current = requestAnimationFrame(tick)

      if (window.__bgPaused) {
        if (pauseStart === null) pauseStart = ts
        return
      }
      if (pauseStart !== null) {
        if (t0      !== null) t0      += ts - pauseStart
        if (localT0 !== null) localT0 += ts - pauseStart
        pauseStart = null
      }
      if (t0      === null) t0      = ts - _sharedT * 1000
      if (localT0 === null) localT0 = ts

      const t     = (ts - t0)      * 0.001
      const local = (ts - localT0) * 0.001
      _sharedT = t

      const rotY = BASE_ROT_Y + Math.sin(t * 0.07) * 0.16
      const rotX = BASE_ROT_X + Math.cos(t * 0.05) * 0.04
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)

      function proj(wx, wy, wz) {
        const rx = wx * cosY + wz * sinY
        const ry = wy
        const rz = -wx * sinY + wz * cosY
        const ty = ry * cosX - rz * sinX
        const tz = ry * sinX + rz * cosX
        const d  = FOV / (FOV + tz + ZDOFF)
        return [
          (CX + rx * SCALE * d).toFixed(1),
          (CY - ty * SCALE * d).toFixed(1),
        ]
      }

      function boxPath(verts) {
        let d = ''
        for (const [a, b] of BOX_EDGES) {
          const pa = proj(...verts[a])
          const pb = proj(...verts[b])
          d += `M${pa[0]},${pa[1]}L${pb[0]},${pb[1]}`
        }
        return d
      }

      // Current float offset per node
      const fy = NODES.map((_, i) => {
        const f = FLOAT[i]
        return Math.sin(t * f.freq * TAU + f.phase) * f.amp
      })

      // ── Card nodes ──
      for (let i = 0; i < NODES.length; i++) {
        const n = NODES[i]
        const cy3d = n.y + fy[i]

        // 4 front-face corner dots
        const dots = [
          proj(n.x - NHW, cy3d + NHH, n.z - NHD),  // TFL
          proj(n.x + NHW, cy3d + NHH, n.z - NHD),  // TFR
          proj(n.x - NHW, cy3d - NHH, n.z - NHD),  // BFL
          proj(n.x + NHW, cy3d - NHH, n.z - NHD),  // BFR
        ]

        const g      = cardGroups[i]
        const dotOp  = (Math.min(1, Math.max(0, (local - DOT_DELAYS[i])  / DOT_FADE))  * 0.32).toFixed(3)
        const cardOp = (Math.min(1, Math.max(0, (local - CARD_DELAYS[i]) / CARD_FADE))).toFixed(3)

        dots.forEach((p, j) => {
          g.children[j].setAttribute('cx', p[0])
          g.children[j].setAttribute('cy', p[1])
          g.children[j].setAttribute('opacity', dotOp)
        })

        const verts = makeCard(n.x, cy3d, n.z)
        g.children[4].setAttribute('d', boxPath(verts))
        g.children[4].setAttribute('opacity', cardOp)
      }

      // ── Connector lines (bottom-center of parent → top-center of child) ──
      for (let i = 0; i < EDGES.length; i++) {
        const [pi, ci] = EDGES[i]
        const pn = NODES[pi], cn = NODES[ci]
        const p1 = proj(pn.x, pn.y + fy[pi] - NHH, pn.z)
        const p2 = proj(cn.x, cn.y + fy[ci] + NHH, cn.z)
        const op = (Math.min(1, Math.max(0, (local - CONN_DELAYS[i]) / CONN_FADE))).toFixed(3)
        connLines[i].setAttribute('x1', p1[0])
        connLines[i].setAttribute('y1', p1[1])
        connLines[i].setAttribute('x2', p2[0])
        connLines[i].setAttribute('y2', p2[1])
        connLines[i].setAttribute('opacity', op)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <svg
      ref={mergedRef}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        right: 'calc(var(--mg) * 0.5)',
        top: -80,
        width: 'clamp(420px, 54vw, 780px)',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Card groups — dots appear first, then card outline */}
      <g id="wf-cards">
        {NODES.map((_, i) => (
          <g key={i}>
            <circle r={i === 0 ? '2.0' : i < 4 ? '1.7' : '1.4'} cx="0" cy="0" fill="white" opacity="0" />
            <circle r={i === 0 ? '2.0' : i < 4 ? '1.7' : '1.4'} cx="0" cy="0" fill="white" opacity="0" />
            <circle r={i === 0 ? '2.0' : i < 4 ? '1.7' : '1.4'} cx="0" cy="0" fill="white" opacity="0" />
            <circle r={i === 0 ? '2.0' : i < 4 ? '1.7' : '1.4'} cx="0" cy="0" fill="white" opacity="0" />
            <path
              stroke={i === 0 ? 'rgba(255,255,255,0.35)' : i < 4 ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.20)'}
              strokeWidth={i === 0 ? '1.10' : i < 4 ? '0.90' : '0.78'}
              d="M0,0" opacity="0"
            />
          </g>
        ))}
      </g>

      {/* Connector lines — appear last */}
      <g id="wf-connectors">
        {EDGES.map((_, i) => (
          <line key={i}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.65"
            opacity="0"
            x1="0" y1="0" x2="0" y2="0"
          />
        ))}
      </g>
    </svg>
  )
}
