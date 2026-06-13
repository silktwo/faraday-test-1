"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"

/**
 * TARGET SCANNER — single hero section.
 * Real dark OpenStreetMap tiles (CARTO dark_nolabels) · Kostiantynivka region @ z11.
 * Outline-only green range circles roam to new positions. Red targets spawn
 * & vanish ONLY inside a radar circle.
 *
 * Drop into v0 / Next.js as the default export of app/page.tsx.
 */

const ACCENT = "#25F860"
const TARGET = "#ff4638"
// CARTO "dark_nolabels" raster basemap (OpenStreetMap data) — several cities around Kostiantynivka @ z11
const TILE_Z = 11
const TILE_X0 = 1236
const TILE_Y0 = 705
const TILE_N = 5
const SUBS = ["a", "b", "c"]

type Cluster = {
  id: string
  x: number // center %
  y: number // center %
  ring: number // ring diameter, vmax
  sweep: number // conic sweep start angle, deg
  speed: number // sweep duration, seconds
  tone: "green"
  label: string
}

const INITIAL: Cluster[] = [
  { id: "rdf1", x: 18, y: 34, ring: 22, sweep: 28, speed: 6.4, tone: "green", label: "RADIO DIRECTION FINDER 01" },
  { id: "rdf2", x: 82, y: 38, ring: 22, sweep: 162, speed: 4.9, tone: "green", label: "RADIO DIRECTION FINDER 02" },
  { id: "rdf3", x: 50, y: 80, ring: 20, sweep: 276, speed: 7.2, tone: "green", label: "RADIO DIRECTION FINDER 03" },
]

type Blip = { id: number; x: number; y: number; zone: "target"; born: number; life: number }

let _id = 0
const rand = (a: number, b: number) => a + Math.random() * (b - a)

function randomEdgeClusterPosition() {
  const zone = Math.floor(Math.random() * 4)

  if (zone === 0) {
    return { x: rand(13, 24), y: rand(24, 76), ring: rand(18, 24) }
  }

  if (zone === 1) {
    return { x: rand(76, 87), y: rand(24, 76), ring: rand(18, 24) }
  }

  if (zone === 2) {
    return { x: rand(28, 72), y: rand(14, 24), ring: rand(16, 21) }
  }

  return { x: rand(28, 72), y: rand(76, 86), ring: rand(16, 21) }
}

export default function TargetScanner() {
  const [clusters, setClusters] = useState<Cluster[]>(INITIAL)
  const [blips, setBlips] = useState<Blip[]>([])
  const [now, setNow] = useState(() => Date.now())
  const reduced = useReducedMotion()
  const clustersRef = useRef(clusters)
  clustersRef.current = clusters

  const tiles = useMemo(() => {
    const out: { src: string; key: string }[] = []
    for (let row = 0; row < TILE_N; row++) {
      for (let col = 0; col < TILE_N; col++) {
        const x = TILE_X0 + col
        const y = TILE_Y0 + row
        const s = SUBS[(x + y) % SUBS.length]
        out.push({ key: `${x}-${y}`, src: `https://${s}.basemaps.cartocdn.com/dark_nolabels/${TILE_Z}/${x}/${y}.png` })
      }
    }
    return out
  }, [])

  // clock
  useEffect(() => {
    let raf: number
    const tick = () => { setNow(Date.now()); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // radars roam to new positions
  useEffect(() => {
    if (reduced) return
    let idx = 0
    const iv = setInterval(() => {
      setClusters((prev) =>
        prev.map((c, i) => {
          if (i !== idx % prev.length) return c
          const nextPosition = randomEdgeClusterPosition()
          return {
            ...c,
            ...nextPosition,
          }
        }),
      )
      idx++
    }, 4200)
    return () => clearInterval(iv)
  }, [reduced])

  // spawn / despawn — ONLY inside a radar circle (uniform over the disk)
  useEffect(() => {
    if (reduced) return
    const spawn = () => {
      setBlips((prev) => {
        const next = prev.filter((b) => Date.now() - b.born < b.life)
        if (next.length >= 8) return next
        const cs = clustersRef.current
        const c = cs[Math.floor(Math.random() * cs.length)]
        const vw = window.innerWidth, vh = window.innerHeight
        const vmax = Math.max(vw, vh)
        const Rpx = (c.ring / 2) * (vmax / 100) * 0.8 // stay inside the ring
        const ang = Math.random() * Math.PI * 2
        const radius = Math.sqrt(Math.random()) * Rpx
        next.push({
          id: _id++,
          x: c.x + (Math.cos(ang) * radius) / vw * 100,
          y: c.y + (Math.sin(ang) * radius) / vh * 100,
          zone: "target",
          born: Date.now(),
          life: 2400 + Math.random() * 3800,
        })
        return next
      })
    }
    for (let i = 0; i < 4; i++) setTimeout(spawn, i * 300)
    const iv = setInterval(spawn, 850)
    return () => clearInterval(iv)
  }, [reduced])

  return (
    <div className="ts-root">
      <style>{css}</style>

      {/* ---------- REAL MAP TILES ---------- */}
      <div className="ts-map" aria-hidden>
        <div className="ts-tilegrid">
          {tiles.map((t) => (
            <img key={t.key} className="ts-tile" src={t.src} alt="" draggable={false} loading="eager" />
          ))}
        </div>
      </div>
      <div className="ts-map-tint" aria-hidden />

      {/* ---------- RANGE CIRCLES (outline only) ---------- */}
      <div className="ts-rings" aria-hidden>
        {clusters.map((c) => (
          <Ring key={c.id} cx={c.x} cy={c.y} size={c.ring} sweep={c.sweep} speed={c.speed} tone={c.tone} />
        ))}
      </div>

      {/* ---------- TARGET BLIPS (appear / disappear in-circle) ---------- */}
      <div className="ts-blips" aria-hidden>
        {blips.map((b) => {
          const age = now - b.born
          const o = Math.min(Math.min(1, age / 420), Math.min(1, Math.max(0, (b.life - age) / 600)))
          return (
            <div key={b.id} className={`ts-blip ${b.zone}`} style={{ left: `${b.x}%`, top: `${b.y}%`, opacity: o }}>
              <span className="ts-blip-ping" />
              <DroneIcon color={TARGET} />
            </div>
          )
        })}
      </div>

      {/* atmosphere */}
      <div className="ts-scanline" aria-hidden />
      <div className="ts-grain" aria-hidden />
      <div className="ts-vignette" aria-hidden />
    </div>
  )
}

/* ---------------- sub components ---------------- */

function Ring({
  cx,
  cy,
  size,
  sweep,
  speed,
  tone = "green",
}: {
  cx: number
  cy: number
  size: number
  sweep: number
  speed: number
  tone?: "green"
}) {
  const style = {
    left: `${cx}%`,
    top: `${cy}%`,
    width: `${size}vmax`,
    height: `${size}vmax`,
    "--sweep-start": `${sweep}deg`,
    "--sweep-duration": `${speed}s`,
  } as CSSProperties

  return (
    <div className={`ts-ring ${tone}`}
      style={style}>
      <span className="ts-ring-edge" />
      <span className="ts-ring-cross-h" />
      <span className="ts-ring-cross-v" />
      <span className="ts-sweep" />
      <span className="ts-ring-core" />
    </div>
  )
}

/* center node + 4 corner nodes joined by diagonals — matches the reference mark */
function DroneIcon({ color }: { color: string }) {
  return (
    <svg className="ts-drone" width="26" height="26" viewBox="0 0 40 40" fill="none">
      <path d="M15.8 15.8 10.8 10.8M24.2 15.8 29.2 10.8M15.8 24.2 10.8 29.2M24.2 24.2 29.2 29.2"
        stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="20" cy="20" r="5.4" stroke={color} strokeWidth="2.4" />
      <circle cx="8" cy="8" r="3.4" stroke={color} strokeWidth="2.2" />
      <circle cx="32" cy="8" r="3.4" stroke={color} strokeWidth="2.2" />
      <circle cx="8" cy="32" r="3.4" stroke={color} strokeWidth="2.2" />
      <circle cx="32" cy="32" r="3.4" stroke={color} strokeWidth="2.2" />
    </svg>
  )
}

function useReducedMotion() {
  const [r, setR] = useState(false)
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    setR(m.matches)
    const h = () => setR(m.matches)
    m.addEventListener?.("change", h)
    return () => m.removeEventListener?.("change", h)
  }, [])
  return r
}

/* ---------------- styles ---------------- */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

.ts-root{
  --accent:${ACCENT};
  --target:${TARGET};
  --bg:#05070a;
  position:relative;width:100%;min-height:100svh;height:100svh;overflow:hidden;
  background:var(--bg);color:#cfe9d8;
  font-family:'Share Tech Mono',ui-monospace,monospace;letter-spacing:.04em;
  isolation:isolate;cursor:crosshair;
}

/* ---- real map tiles ---- */
.ts-map{position:absolute;top:50%;left:50%;translate:-50% -50%;width:112vmax;height:112vmax;z-index:0;}
.ts-tilegrid{display:grid;width:100%;height:100%;
  grid-template-columns:repeat(${TILE_N},1fr);grid-template-rows:repeat(${TILE_N},1fr);}
.ts-tile{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.92) contrast(1.05) saturate(.7);}
.ts-map-tint{position:absolute;inset:0;z-index:0;pointer-events:none;
  background:radial-gradient(120% 90% at 50% 45%,rgba(37,248,96,.04),transparent 55%);}

/* ---- range circles: OUTLINE ONLY, roam smoothly ---- */
.ts-rings{position:absolute;inset:0;z-index:2;pointer-events:none;}
.ts-ring{position:absolute;translate:-50% -50%;border-radius:50%;background:transparent;
  transition:left 2.4s cubic-bezier(.6,0,.2,1),top 2.4s cubic-bezier(.6,0,.2,1),width 2.4s ease,height 2.4s ease;}
.ts-ring-edge{position:absolute;inset:0;border-radius:50%;border:1px dashed rgba(180,200,192,.4);}
.ts-ring-cross-h,.ts-ring-cross-v{position:absolute;background:rgba(180,200,192,.14);}
.ts-ring-cross-h{left:0;right:0;top:50%;height:1px;}
.ts-ring-cross-v{top:0;bottom:0;left:50%;width:1px;}
.ts-ring-core{position:absolute;top:50%;left:50%;width:5px;height:5px;translate:-50% -50%;border-radius:50%;background:var(--accent);box-shadow:0 0 10px var(--accent);}

/* radar sweep (transparent center) */
.ts-sweep{position:absolute;inset:0;border-radius:50%;
  background:conic-gradient(from var(--sweep-start),rgba(37,248,96,0) 0deg,rgba(37,248,96,0) 308deg,rgba(37,248,96,.08) 348deg,rgba(37,248,96,.34) 360deg);
  -webkit-mask:radial-gradient(circle,transparent 0,#000 1%);mask:radial-gradient(circle,transparent 0,#000 1%);
  animation:sweep var(--sweep-duration) linear infinite;}
@keyframes sweep{to{transform:rotate(360deg)}}

/* ---- blips ---- */
.ts-blips{position:absolute;inset:0;z-index:3;pointer-events:none;}
.ts-blip{position:absolute;translate:-50% -50%;display:flex;align-items:center;justify-content:center;will-change:opacity;}
.ts-blip .ts-drone{filter:drop-shadow(0 0 6px currentColor);}
.ts-blip.target .ts-drone{color:var(--target)}
.ts-blip-ping{position:absolute;top:50%;left:50%;width:26px;height:26px;border-radius:50%;border:1px solid var(--target);opacity:0;animation:ping 2.4s ease-out infinite;}
@keyframes ping{0%{transform:translate(-50%,-50%) scale(.4);opacity:.7}80%,100%{transform:translate(-50%,-50%) scale(2.6);opacity:0}}

/* ---- zone tags ---- */
.ts-labels{position:absolute;inset:0;z-index:4;pointer-events:none;}
.ts-tag{position:absolute;translate:-50% -50%;display:flex;align-items:center;gap:8px;
  transition:left 2.4s cubic-bezier(.6,0,.2,1),top 2.4s cubic-bezier(.6,0,.2,1);}
.ts-tag-anchor{width:8px;height:8px;background:var(--accent);box-shadow:0 0 10px var(--accent);}
.ts-tag-box{font-family:'Chakra Petch',sans-serif;font-weight:600;font-size:12px;letter-spacing:.18em;
  padding:5px 11px;color:#04130a;background:var(--accent);
  clip-path:polygon(0 0,100% 0,100% 100%,7px 100%,0 calc(100% - 7px));
  box-shadow:0 0 18px rgba(37,248,96,.35);white-space:nowrap;}

/* ---- minimal HUD ---- */
.ts-hud{position:absolute;inset:0;z-index:5;pointer-events:none;display:flex;flex-direction:column;justify-content:flex-end;padding:clamp(16px,3vw,34px);}
.ts-readout{position:absolute;left:clamp(16px,3vw,34px);bottom:clamp(16px,3vw,34px);display:flex;border:1px solid rgba(140,165,155,.18);background:rgba(5,10,9,.5);backdrop-filter:blur(3px);}
.ts-stat{display:flex;flex-direction:column;gap:3px;padding:10px 16px;border-right:1px solid rgba(140,165,155,.14);min-width:78px;}
.ts-stat:last-child{border-right:none}
.ts-stat-k{font-size:9px;letter-spacing:.24em;color:rgba(150,180,166,.55)}
.ts-stat-v{font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:19px;color:#eafff2;letter-spacing:.06em}
.ts-stat-v.live{color:var(--target);text-shadow:0 0 12px rgba(255,70,56,.45)}

/* atmosphere */
.ts-scanline{position:absolute;inset:0;z-index:6;pointer-events:none;
  background:repeating-linear-gradient(0deg,rgba(0,0,0,0) 0,rgba(0,0,0,0) 2px,rgba(0,0,0,.1) 3px,rgba(0,0,0,0) 4px);
  mix-blend-mode:multiply;opacity:.4;}
.ts-scanline::after{content:"";position:absolute;left:0;right:0;height:120px;background:linear-gradient(180deg,transparent,rgba(37,248,96,.05),transparent);animation:scanMove 6s linear infinite;}
@keyframes scanMove{0%{top:-15%}100%{top:115%}}
.ts-grain{position:absolute;inset:0;z-index:7;pointer-events:none;opacity:.05;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
.ts-vignette{position:absolute;inset:0;z-index:8;pointer-events:none;background:radial-gradient(125% 95% at 50% 45%,transparent 58%,rgba(0,0,0,.6) 100%);}

@media (max-width:680px){
  .ts-tag-box{font-size:10px;padding:4px 8px;letter-spacing:.12em}
  .ts-readout{flex-wrap:wrap}
  .ts-stat{min-width:64px;padding:8px 11px}
}
@media (prefers-reduced-motion:reduce){.ts-sweep,.ts-scanline::after,.ts-blip-ping{animation:none}}
`
