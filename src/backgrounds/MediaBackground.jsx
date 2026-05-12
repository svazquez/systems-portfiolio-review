import { useEffect, useRef, useCallback } from 'react'

const PHI = 1.6180339887
const RT2  = 1.4142135623
const TAU  = Math.PI * 2

function seededRng(seed) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}

// ── Parabolic dish geometry ──
// Dish opens toward +z (viewer). Paraboloid: z = r²/(4·FL) − DEPTH
// Rim at z=0, apex (deepest) at z=−DEPTH, feed horn at z=+FH_Z
const DISH_R = 80
const FL     = 50
const DEPTH  = DISH_R * DISH_R / (4 * FL)   // = 32
const FH_Z   = FL - DEPTH                    // = 18 (in front of rim)
const FH_S   = 5

function zAt(r) { return r * r / (4 * FL) - DEPTH }

// ── Build node list ──
const DISH = []

// Apex
DISH.push({ x: 0, y: 0, z: -DEPTH, r: 1.6 })

// Ring 1 (r=20): 6 nodes
for (let i = 0; i < 6; i++) {
  const a = (i / 6) * TAU
  DISH.push({ x: 20 * Math.cos(a), y: 20 * Math.sin(a), z: zAt(20), r: 1.4 })
}

// Ring 2 (r=40): 8 nodes, half-step offset
for (let i = 0; i < 8; i++) {
  const a = (i / 8) * TAU + TAU / 16
  DISH.push({ x: 40 * Math.cos(a), y: 40 * Math.sin(a), z: zAt(40), r: 1.4 })
}

// Ring 3 (r=60): 10 nodes
for (let i = 0; i < 10; i++) {
  const a = (i / 10) * TAU
  DISH.push({ x: 60 * Math.cos(a), y: 60 * Math.sin(a), z: zAt(60), r: 1.5 })
}

// Ring 4 (r=80, rim): 12 nodes, half-step offset
for (let i = 0; i < 12; i++) {
  const a = (i / 12) * TAU + TAU / 24
  DISH.push({ x: 80 * Math.cos(a), y: 80 * Math.sin(a), z: 0, r: 1.6 })
}

// Support arm (z-axis, apex → rim plane → feed horn)
DISH.push({ x: 0, y: 0, z: -DEPTH * 0.6, r: 1.2 })
DISH.push({ x: 0, y: 0, z: 0,             r: 1.2 })
DISH.push({ x: 0, y: 0, z: FH_Z * 0.55,  r: 1.2 })

// Feed horn
DISH.push({ x:     0, y:     0, z: FH_Z,        r: 2.0 })
DISH.push({ x: -FH_S, y: -FH_S, z: FH_Z + FH_S, r: 1.4 })
DISH.push({ x:  FH_S, y: -FH_S, z: FH_Z + FH_S, r: 1.4 })
DISH.push({ x:  FH_S, y:  FH_S, z: FH_Z + FH_S, r: 1.4 })
DISH.push({ x: -FH_S, y:  FH_S, z: FH_Z + FH_S, r: 1.4 })

// Total: 1+6+8+10+12+3+5 = 45 nodes
const N = DISH.length

// ── Node reveal ──
const NODE_FADE = 0.20
const _rnd = seededRng(55)
const NODE_DELAYS = DISH.map(() => _rnd() * 1.0)

// ── Edges (3D proximity) ──
const CONN        = 50
const EDGE_START  = 0.7
const EDGE_SPREAD = 3.5
const _rne = seededRng(77)
const _rnt = seededRng(23)

const PRESET_EDGES = []
const edelay = new Float32Array(N * N).fill(Infinity)

for (let a = 0; a < N; a++) {
  for (let b = a + 1; b < N; b++) {
    const dx = DISH[a].x - DISH[b].x
    const dy = DISH[a].y - DISH[b].y
    const dz = DISH[a].z - DISH[b].z
    if (Math.sqrt(dx*dx + dy*dy + dz*dz) < CONN) {
      const delay = EDGE_START + _rne() * EDGE_SPREAD
      const thin  = _rnt() < 0.4
      PRESET_EDGES.push({ a, b, delay, thin })
      edelay[a * N + b] = delay
      edelay[b * N + a] = delay
    }
  }
}

// ── Triangles (area filter in XY plane) ──
const MIN_AREA = 100

function triArea(ax, ay, bx, by, cx, cy) {
  return Math.abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay)) * 0.5
}

const PRESET_TRIS = []
for (let a = 0; a < N - 2; a++) {
  for (let b = a + 1; b < N - 1; b++) {
    if (edelay[a * N + b] === Infinity) continue
    for (let c = b + 1; c < N; c++) {
      if (edelay[a * N + c] === Infinity) continue
      if (edelay[b * N + c] === Infinity) continue
      const area = triArea(DISH[a].x, DISH[a].y, DISH[b].x, DISH[b].y, DISH[c].x, DISH[c].y)
      if (area < MIN_AREA) continue
      PRESET_TRIS.push({
        a, b, c,
        delay: Math.max(edelay[a*N+b], edelay[a*N+c], edelay[b*N+c]),
      })
    }
  }
}

// ── 3D projection ──
const SCALE = 2.20
const FOV   = 660
const ZDOFF = 120

const SVG_W = 500
const SVG_H = 360
const CX = SVG_W * 0.46
const CY = SVG_H * 0.52

const BASE_ROT_Y = 0.48   // ~27° — shows depth from the side
const BASE_ROT_X = 0.36   // ~21° — slight tilt looking into the dish

// ── Dual-sine floating motion ──
const _rm = seededRng(91)
const MOTION = DISH.map(() => {
  const fx = (0.04 + _rm() * 0.09) * (_rm() > 0.5 ? PHI : 1)
  const fy = (0.04 + _rm() * 0.09) * (_rm() > 0.5 ? RT2 : 1)
  const ax = 3 + _rm() * 5
  const ay = 3 + _rm() * 5
  return { fx, fy, ax, ay, fx2: fx * PHI, fy2: fy * RT2, ax2: ax * 0.38, ay2: ay * 0.38 }
})

let _sharedT = 0

export function AnimatedTriMesh({ ref: fwdRef }) {
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

    const triPath  = svg.querySelector('#mt')
    const edgePath = svg.querySelector('#me')
    const edgeThin = svg.querySelector('#me2')
    const circles  = [...svg.querySelector('g').querySelectorAll('circle')]

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

      // Slow camera rock
      const rotY = BASE_ROT_Y + Math.sin(t * 0.07) * 0.14
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

      // Node positions — x/y drift, z fixed (preserves dish depth)
      const pos = DISH.map((n, i) => {
        const m = MOTION[i]
        return {
          x: n.x + Math.sin(t * m.fx * TAU) * m.ax + Math.sin(t * m.fx2 * TAU) * m.ax2,
          y: n.y + Math.cos(t * m.fy * TAU) * m.ay + Math.cos(t * m.fy2 * TAU) * m.ay2,
          z: n.z,
        }
      })

      // ── Dot nodes ──
      circles.forEach((el, i) => {
        const op = Math.min(1, Math.max(0, (local - NODE_DELAYS[i]) / NODE_FADE)) * 0.30
        const p  = proj(pos[i].x, pos[i].y, pos[i].z)
        el.setAttribute('cx', p[0])
        el.setAttribute('cy', p[1])
        el.setAttribute('opacity', op.toFixed(3))
      })

      // ── Edges ──
      let dEdge = '', dThin = ''
      for (const { a, b, delay, thin } of PRESET_EDGES) {
        if (local < delay) continue
        const pa = proj(pos[a].x, pos[a].y, pos[a].z)
        const pb = proj(pos[b].x, pos[b].y, pos[b].z)
        const seg = `M${pa[0]},${pa[1]}L${pb[0]},${pb[1]}`
        if (thin) dThin += seg; else dEdge += seg
      }
      edgePath.setAttribute('d', dEdge || 'M0,0')
      edgeThin.setAttribute('d', dThin || 'M0,0')

      // ── Triangle fills ──
      let dTris = ''
      for (const { a, b, c, delay } of PRESET_TRIS) {
        if (local < delay) continue
        const pa = proj(pos[a].x, pos[a].y, pos[a].z)
        const pb = proj(pos[b].x, pos[b].y, pos[b].z)
        const pc = proj(pos[c].x, pos[c].y, pos[c].z)
        dTris += `M${pa[0]},${pa[1]}L${pb[0]},${pb[1]}L${pc[0]},${pc[1]}Z`
      }
      triPath.setAttribute('d', dTris || 'M0,0')
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
      <path id="mt"  fill="rgba(255,255,255,0.04)"  d="M0,0" />
      <path id="me2" stroke="rgba(255,255,255,0.10)" strokeWidth="0.55" d="M0,0" />
      <path id="me"  stroke="rgba(255,255,255,0.20)" strokeWidth="0.90" d="M0,0" />
      <g>
        {DISH.map((n, i) => (
          <circle key={i} cx="0" cy="0" r={n.r} fill="white" opacity="0" />
        ))}
      </g>
    </svg>
  )
}
