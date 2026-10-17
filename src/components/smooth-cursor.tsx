import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useSpring } from 'motion/react'
import { MousePointer2, MousePointer2Off } from 'lucide-react'

// Ported from sv-animations' Smooth Cursor (https://sv-animations.vercel.app/magic/docs/components/smooth-cursor)
const spring = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }

/** Only for real mice: touch screens and reduced-motion visitors keep the native cursor. */
function useSupported() {
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setSupported(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])
  return supported
}

// On/off preference, shared by the cursor and its nav toggle, remembered across visits.
const STORAGE_KEY = 'smooth-cursor'
const listeners = new Set<() => void>()
let on = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
})()

function setOn(next: boolean) {
  on = next
  try {
    localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
  listeners.forEach((l) => l())
}

function usePreference() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => on,
  )
}

export function SmoothCursor() {
  const supported = useSupported()
  const enabled = usePreference()
  return supported && enabled ? <Cursor /> : null
}

export function SmoothCursorToggle() {
  const supported = useSupported()
  const enabled = usePreference()
  if (!supported) return null

  const label = enabled ? 'Turn off smooth cursor' : 'Turn on smooth cursor'
  return (
    <button
      type="button"
      onClick={() => setOn(!enabled)}
      aria-label={label}
      aria-pressed={enabled}
      title={label}
      className="flex size-4 items-center justify-center transition-colors hover:text-foreground"
    >
      {enabled ? <MousePointer2 className="size-4" /> : <MousePointer2Off className="size-4" />}
    </button>
  )
}

function Cursor() {
  const [visible, setVisible] = useState(false)
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)
  const rotate = useSpring(0, { ...spring, damping: 60, stiffness: 300 })
  const scale = useSpring(1, { ...spring, damping: 35, stiffness: 500 })

  useEffect(() => {
    const root = document.documentElement
    // <html> is zoomed (see --page-zoom), which scales `left`/`top` of fixed elements; divide it back out.
    const zoom = () => parseFloat(getComputedStyle(root).zoom) || 1

    let last = { x: 0, y: 0, t: performance.now() }
    let prevAngle = 0
    let totalRotation = 0
    let first = true
    let raf = 0
    let settle = 0

    const move = (e: MouseEvent) => {
      const z = zoom()
      const pos = { x: e.clientX / z, y: e.clientY / z }
      const now = performance.now()
      const dt = now - last.t
      const vx = dt > 0 ? (pos.x - last.x) / dt : 0
      const vy = dt > 0 ? (pos.y - last.y) / dt : 0
      last = { ...pos, t: now }

      if (first) {
        // Start at the pointer instead of flying in from the corner.
        x.jump(pos.x)
        y.jump(pos.y)
        first = false
        setVisible(true)
        return
      }
      x.set(pos.x)
      y.set(pos.y)

      if (Math.hypot(vx, vy) > 0.1) {
        const angle = (Math.atan2(vy, vx) * 180) / Math.PI + 90
        let diff = angle - prevAngle
        if (diff > 180) diff -= 360
        if (diff < -180) diff += 360
        totalRotation += diff
        prevAngle = angle
        rotate.set(totalRotation)

        scale.set(0.95)
        window.clearTimeout(settle)
        settle = window.setTimeout(() => scale.set(1), 150)
      }
    }

    const onMove = (e: MouseEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        move(e)
        raf = 0
      })
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => !first && setVisible(true)

    root.classList.add('smooth-cursor')
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      root.classList.remove('smooth-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
      window.clearTimeout(settle)
    }
  }, [x, y, rotate, scale])

  return (
    <motion.div
      aria-hidden
      style={{ left: x, top: y, rotate, scale, translateX: '-50%', translateY: '-50%' }}
      className="pointer-events-none fixed z-[100] will-change-transform"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <svg width={25} height={27} viewBox="0 0 50 54" fill="none">
          <g filter="url(#smooth-cursor-shadow)">
            <path
              d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
              fill="var(--foreground)"
            />
            <path
              d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
              stroke="var(--background)"
              strokeWidth={2.25825}
            />
          </g>
          <defs>
            <filter
              id="smooth-cursor-shadow"
              x={0.602397}
              y={0.952444}
              width={49.0584}
              height={52.428}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy={2.25825} />
              <feGaussianBlur stdDeviation={2.25825} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  )
}
