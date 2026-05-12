import { useEffect, useRef, useCallback } from 'react'

const PHI = 1.6180339887
const RT2  = 1.4142135623
const TAU  = Math.PI * 2

function seededRng(seed) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}

// Shared animation time — survives component remounts so new instances
// continue from the exact same position as the previous one.
let _sharedT = 0

const N_NODES   = 30
const CONN_NEAR = 70
const CONN_FAR  = 110

const _rp = seededRng(42)
const MESH_NODES = Array.from({ length: N_NODES }, () => ({
  x: 20 + _rp() * 360,
  y: 20 + _rp() * 360,
  r: 1.6 + _rp() * 1.8,
}))

const _rm = seededRng(137)
const MESH_MOTION = MESH_NODES.map(() => {
  const fx = (0.04 + _rm() * 0.09) * (_rm() > 0.5 ? PHI : 1)
  const fy = (0.04 + _rm() * 0.09) * (_rm() > 0.5 ? RT2 : 1)
  const ax = 5 + _rm() * 8
  const ay = 5 + _rm() * 8
  return { fx, fy, ax, ay, fx2: fx * PHI, fy2: fy * RT2, ax2: ax * 0.38, ay2: ay * 0.38 }
})

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedGlobe — rotating node-graph sphere for the AI/Agentic era page
// ─────────────────────────────────────────────────────────────────────────────

const GLOBE_N      = 38          // nodes on sphere
const GLOBE_R      = 152         // sphere radius (SVG units)
const GLOBE_CX     = 200         // sphere center x
const GLOBE_CY     = 200         // sphere center y
const ROT_SPEED    = TAU / 110   // one full rotation every ~110 s
const TILT         = 0.28        // axial tilt in radians (~16°)
const CONN_3D      = 1.0         // chord-distance threshold for edges (unit sphere)

// Fibonacci sphere — evenly distributed nodes on unit sphere
const _ga = Math.PI * (3 - Math.sqrt(5))   // golden angle
const GLOBE_NODES = Array.from({ length: GLOBE_N }, (_, i) => {
  const y   = 1 - (i / (GLOBE_N - 1)) * 2
  const rad = Math.sqrt(Math.max(0, 1 - y * y))
  const phi = _ga * i
  return { x: Math.cos(phi) * rad, y, z: Math.sin(phi) * rad }
})

// Pre-compute edges with random appearance delays (restarts each mount)
const GLOBE_EDGE_START  = 0.6
const GLOBE_EDGE_SPREAD = 3.8
const GLOBE_NODE_SPREAD = 0.9   // all nodes fade in within this window
const GLOBE_NODE_FADE   = 0.20
const _gre = seededRng(19)
const _grn = seededRng(53)

const GLOBE_EDGES = []
for (let a = 0; a < GLOBE_N - 1; a++) {
  for (let b = a + 1; b < GLOBE_N; b++) {
    const dx = GLOBE_NODES[a].x - GLOBE_NODES[b].x
    const dy = GLOBE_NODES[a].y - GLOBE_NODES[b].y
    const dz = GLOBE_NODES[a].z - GLOBE_NODES[b].z
    if (Math.sqrt(dx*dx + dy*dy + dz*dz) < CONN_3D)
      GLOBE_EDGES.push({
        a, b,
        delay: GLOBE_EDGE_START + _gre() * GLOBE_EDGE_SPREAD,
        thin:  _gre() < 0.45,   // ~45% of edges are thinner/dimmer
      })
  }
}

const GLOBE_NODE_DELAYS = Array.from({ length: GLOBE_N }, () => _grn() * GLOBE_NODE_SPREAD)

// Shared rotation time — survives remounts so the globe keeps spinning
let _globeT = 0

export function AnimatedGlobe({ ref: fwdRef }) {
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

    const edgePath     = svg.querySelector('#ge')
    const edgePathThin = svg.querySelector('#ge2')
    const circles      = [...svg.querySelector('g').querySelectorAll('circle')]
    let t0 = null
    let pauseStart = null

    const cosT = Math.cos(TILT)
    const sinT = Math.sin(TILT)
    let localT0 = null  // local time for build-up reveal (restarts each mount)

    const tick = (ts) => {
      rafRef.current = requestAnimationFrame(tick)

      if (window.__bgPaused) {
        if (pauseStart === null) pauseStart = ts
        return
      }
      if (pauseStart !== null) {
        if (t0 !== null)     t0     += ts - pauseStart
        if (localT0 !== null) localT0 += ts - pauseStart
        pauseStart = null
      }
      if (t0     === null) t0     = ts - _globeT * 1000
      if (localT0 === null) localT0 = ts

      const t      = (ts - t0)     * 0.001   // shared — drives rotation
      const local  = (ts - localT0) * 0.001  // local  — drives reveal
      _globeT = t

      const angle = t * ROT_SPEED
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)

      // Project each node: Y-spin → X-tilt → orthographic
      const proj = GLOBE_NODES.map(n => {
        const rx = n.x * cosA + n.z * sinA
        const ry = n.y
        const rz = -n.x * sinA + n.z * cosA
        const tx = rx
        const ty = ry * cosT - rz * sinT
        const tz = ry * sinT + rz * cosT
        return {
          px:    GLOBE_CX + tx * GLOBE_R,
          py:    GLOBE_CY - ty * GLOBE_R,
          depth: tz,
        }
      })

      // Update circles — depth opacity × reveal fraction
      circles.forEach((el, i) => {
        const p    = proj[i]
        const rev  = Math.min(1, Math.max(0, (local - GLOBE_NODE_DELAYS[i]) / GLOBE_NODE_FADE))
        const op   = rev * Math.max(0.04, (p.depth + 1) * 0.5) * 0.30
        el.setAttribute('cx', p.px.toFixed(1))
        el.setAttribute('cy', p.py.toFixed(1))
        el.setAttribute('opacity', op.toFixed(3))
      })

      // Draw edges — randomly revealed, split into regular + thin
      let dEdges = '', dThin = ''
      for (const { a, b, delay, thin } of GLOBE_EDGES) {
        if (local < delay) continue
        if (proj[a].depth < -0.3 && proj[b].depth < -0.3) continue
        const seg = `M${proj[a].px.toFixed(1)},${proj[a].py.toFixed(1)}L${proj[b].px.toFixed(1)},${proj[b].py.toFixed(1)}`
        if (thin) dThin += seg; else dEdges += seg
      }
      edgePath.setAttribute('d',     dEdges || 'M0,0')
      edgePathThin.setAttribute('d', dThin  || 'M0,0')
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <svg
      ref={mergedRef}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        right: 'calc(var(--mg) * 0.5)',
        top: -210,
        width: 'clamp(384px, 50vw, 744px)',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
      }}
    >
      {/* Faint sphere outline */}
      <circle cx={GLOBE_CX} cy={GLOBE_CY} r={GLOBE_R} stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" fill="none" />
      {/* Edges — regular + thin variation */}
      <path id="ge2" stroke="rgba(255,255,255,0.10)" strokeWidth="0.55" d="M0,0" />
      <path id="ge"  stroke="rgba(255,255,255,0.20)" strokeWidth="0.90" d="M0,0" />
      {/* Nodes — opacity set per-frame */}
      <g>
        {GLOBE_NODES.map((_, i) => (
          <circle key={i} cx={GLOBE_CX} cy={GLOBE_CY} r={1.4 + (i % 3) * 0.4} fill="white" opacity="0" />
        ))}
      </g>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AnimatedSystemGraph — floating node mesh (used on homepage)
// ─────────────────────────────────────────────────────────────────────────────

// Accepts ref from parent (for parallax) and merges with internal animation ref
export function AnimatedSystemGraph({ ref: fwdRef }) {
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

    const nearPath = svg.querySelector('#mn')
    const farPath  = svg.querySelector('#mf')
    const circles  = svg.querySelectorAll('circle')
    let t0 = null
    let pauseStart = null

    const tick = (ts) => {
      rafRef.current = requestAnimationFrame(tick)

      // Freeze animation during view transitions
      if (window.__bgPaused) {
        if (pauseStart === null) pauseStart = ts
        return
      }
      // Compensate t0 for time spent paused so position resumes exactly where it stopped
      if (pauseStart !== null) {
        if (t0 !== null) t0 += ts - pauseStart
        pauseStart = null
      }

      // On first real frame: continue from the module-level shared time so
      // a remounted instance picks up exactly where the previous one left off.
      if (t0 === null) t0 = ts - _sharedT * 1000
      const t = (ts - t0) * 0.001
      _sharedT = t   // keep shared time current every frame

      const pos = MESH_NODES.map((n, i) => {
        const m = MESH_MOTION[i]
        return {
          x: n.x + Math.sin(t * m.fx * TAU) * m.ax + Math.sin(t * m.fx2 * TAU) * m.ax2,
          y: n.y + Math.cos(t * m.fy * TAU) * m.ay + Math.cos(t * m.fy2 * TAU) * m.ay2,
        }
      })

      circles.forEach((el, i) => {
        if (i < pos.length) {
          el.setAttribute('cx', pos[i].x.toFixed(1))
          el.setAttribute('cy', pos[i].y.toFixed(1))
        }
      })

      let dNear = '', dFar = ''
      for (let a = 0; a < N_NODES - 1; a++) {
        for (let b = a + 1; b < N_NODES; b++) {
          const dx   = pos[a].x - pos[b].x
          const dy   = pos[a].y - pos[b].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const seg  = `M${pos[a].x.toFixed(1)},${pos[a].y.toFixed(1)}L${pos[b].x.toFixed(1)},${pos[b].y.toFixed(1)}`
          if (dist < CONN_NEAR)     dNear += seg
          else if (dist < CONN_FAR) dFar  += seg
        }
      }

      nearPath.setAttribute('d', dNear || 'M0,0')
      farPath.setAttribute('d',  dFar  || 'M0,0')
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <svg
      ref={mergedRef}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        right: 'calc(var(--mg) * 0.5)',
        top: -210,
        width: 'clamp(384px, 50vw, 744px)',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
      }}
    >
      <path id="mf" stroke="rgba(255,255,255,0.10)" strokeWidth="0.75" d="M0,0" />
      <path id="mn" stroke="rgba(255,255,255,0.22)"  strokeWidth="1"    d="M0,0" />
      <g fill="rgba(255,255,255,0.30)">
        {MESH_NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} />
        ))}
      </g>
    </svg>
  )
}
