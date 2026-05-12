import { useEffect, useRef, useCallback } from 'react'

const TAU = Math.PI * 2

function seededRng(seed) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}

// ── 3D scene constants ──
const BHW   = 11      // body half-width  (x)
const BHD   = 7.5     // body half-depth  (z)
const WHW   = 2.2     // wick half-size
const SCALE = 1.95
const FOV   = 700
const ZDOFF = 155

const SVG_W = 500
const SVG_H = 360
const CX = SVG_W * 0.44
const CY = SVG_H * 0.52

const BASE_ROT_Y = 0.50
const BASE_ROT_X = 0.38

// ── Candle definitions ──
const CDEFS = [
  { x: -112, z: 28, yBase: -10, bodyH: 42, wickT: 22, wickB: 14 },
  { x:  -80, z: -8, yBase: -10, bodyH: 26, wickT: 14, wickB:  9 },
  { x:  -48, z: 22, yBase: -10, bodyH: 50, wickT: 20, wickB: 16 },
  { x:  -16, z: -5, yBase: -10, bodyH: 32, wickT: 24, wickB: 12 },
  { x:   16, z: 26, yBase: -10, bodyH: 38, wickT: 16, wickB: 20 },
  { x:   48, z: -8, yBase: -10, bodyH: 28, wickT: 26, wickB: 10 },
  { x:   80, z: 20, yBase: -10, bodyH: 46, wickT: 14, wickB: 18 },
  { x:  112, z:  2, yBase: -10, bodyH: 54, wickT: 22, wickB:  8 },
]

// ── Float motion ──
const _rf = seededRng(77)
const FLOAT = CDEFS.map(() => ({
  amp:   4 + _rf() * 8,
  freq:  0.08 + _rf() * 0.14,
  phase: _rf() * TAU,
}))

// ── Reveal: dots first, then edges ──
const DOT_FADE  = 0.22
const EDGE_FADE = 0.32
const _rd = seededRng(29)
const DOT_DELAYS  = CDEFS.map(() => _rd() * 0.8)
const EDGE_DELAYS = CDEFS.map(() => 0.4 + _rd() * 1.4)

// ── Box vertex builder (bottom 0-3, top 4-7) ──
function makeBox(cx, yBot, yTop, cz, hw, hd) {
  return [
    [cx - hw, yBot, cz - hd],
    [cx + hw, yBot, cz - hd],
    [cx + hw, yBot, cz + hd],
    [cx - hw, yBot, cz + hd],
    [cx - hw, yTop, cz - hd],
    [cx + hw, yTop, cz - hd],
    [cx + hw, yTop, cz + hd],
    [cx - hw, yTop, cz + hd],
  ]
}

const BOX_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
]

let _sharedT = 0

export function AnimatedCandleChart({ ref: fwdRef }) {
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

    // One <g> per candle: children[0..5] = 6 dot circles, [6] = body path, [7] = wick path
    const groups = [...svg.querySelectorAll(':scope > g')]

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

      const rotY = BASE_ROT_Y + Math.sin(t * 0.07) * 0.18
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

      for (let i = 0; i < CDEFS.length; i++) {
        const c  = CDEFS[i]
        const f  = FLOAT[i]
        const fy = Math.sin(t * f.freq * TAU + f.phase) * f.amp

        const yBot = c.yBase + fy
        const yTop = yBot + c.bodyH
        const yWB  = yBot - c.wickB
        const yWT  = yTop + c.wickT

        // 6 key vertex positions for dot nodes
        const dots = [
          proj(c.x - BHW, yTop, c.z - BHD),  // body TFL
          proj(c.x + BHW, yTop, c.z - BHD),  // body TFR
          proj(c.x - BHW, yBot, c.z - BHD),  // body BFL
          proj(c.x + BHW, yBot, c.z - BHD),  // body BFR
          proj(c.x,       yWT,  c.z),         // wick top tip
          proj(c.x,       yWB,  c.z),         // wick bot tip
        ]

        const g      = groups[i]
        const dotOp  = (Math.min(1, Math.max(0, (local - DOT_DELAYS[i])  / DOT_FADE))  * 0.32).toFixed(3)
        const edgeOp = (Math.min(1, Math.max(0, (local - EDGE_DELAYS[i]) / EDGE_FADE))).toFixed(3)

        dots.forEach((p, j) => {
          g.children[j].setAttribute('cx', p[0])
          g.children[j].setAttribute('cy', p[1])
          g.children[j].setAttribute('opacity', dotOp)
        })

        const body    = makeBox(c.x, yBot, yTop, c.z, BHW, BHD)
        const wickTop = makeBox(c.x, yTop, yWT,  c.z, WHW, WHW)
        const wickBot = makeBox(c.x, yWB,  yBot, c.z, WHW, WHW)

        g.children[6].setAttribute('d', boxPath(body))
        g.children[6].setAttribute('opacity', edgeOp)
        g.children[7].setAttribute('d', boxPath(wickTop) + boxPath(wickBot))
        g.children[7].setAttribute('opacity', edgeOp)
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
      {CDEFS.map((_, i) => (
        <g key={i}>
          {/* 6 dot nodes — appear first */}
          <circle r="1.6" cx="0" cy="0" fill="white" opacity="0" />
          <circle r="1.6" cx="0" cy="0" fill="white" opacity="0" />
          <circle r="1.4" cx="0" cy="0" fill="white" opacity="0" />
          <circle r="1.4" cx="0" cy="0" fill="white" opacity="0" />
          <circle r="1.5" cx="0" cy="0" fill="white" opacity="0" />
          <circle r="1.5" cx="0" cy="0" fill="white" opacity="0" />
          {/* Box edges — appear after dots */}
          <path stroke="rgba(255,255,255,0.30)" strokeWidth="1.05" d="M0,0" opacity="0" />
          <path stroke="rgba(255,255,255,0.18)" strokeWidth="0.65" d="M0,0" opacity="0" />
        </g>
      ))}
    </svg>
  )
}
