import { motion } from 'motion/react'
import { projects } from '@/data/projects'
import { ease } from '@/lib/motion'
import { ProjectRow } from './project-row'

export function Work() {
  return (
    <section id="work" className="px-6 pt-24 pb-40 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1, ease }}
          className="mb-20 sm:mb-28"
        >
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Selected work</p>
          <h2 className="mt-3 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]">
            Things I’ve built.
          </h2>
        </motion.div>

        <div className="space-y-32 sm:space-y-44">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
