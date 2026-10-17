import { motion } from 'motion/react'
import {
  siClaude,
  siExpo,
  siGooglecolab,
  siJavascript,
  siOpencv,
  siPython,
  siReact,
  siSqlite,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons'
import { ease, fadeUp } from '@/lib/motion'

const icons: SimpleIcon[] = [
  siClaude,
  siPython,
  siOpencv,
  siGooglecolab,
  siJavascript,
  siTypescript,
  siReact,
  siExpo,
  siSqlite,
]

export function Stack() {
  return (
    <section id="stack" className="px-6 pt-24 sm:pt-32">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-12">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase lg:col-span-3 lg:pt-2">Stack</p>
        <div className="lg:col-span-9">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="max-w-2xl text-[clamp(1.05rem,1.7vw,1.25rem)] leading-snug tracking-tight text-muted-foreground"
          >
            <span className="text-foreground">The pieces I reach for.</span> AI agents to plan, write and review the
            code, Python and OpenCV for computer vision, and React Native with Expo for mobile.
          </motion.p>

          <ul className="mt-10 flex flex-wrap gap-3">
            {icons.map((icon, i) => (
              <motion.li
                key={icon.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.04 }}
              >
                <span
                  tabIndex={0}
                  aria-label={icon.title}
                  className="group/icon relative flex h-14 w-[4.5rem] items-center justify-center rounded-xl border border-border bg-muted/40 text-muted-foreground outline-none transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-foreground/20 hover:text-foreground focus-visible:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-6">
                    <path d={icon.path} />
                  </svg>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 rounded-md bg-primary px-2 py-1 font-mono text-[11px] whitespace-nowrap text-primary-foreground opacity-0 transition-all duration-200 group-hover/icon:translate-y-0 group-hover/icon:opacity-100 group-focus-visible/icon:translate-y-0 group-focus-visible/icon:opacity-100"
                  >
                    {icon.title}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
