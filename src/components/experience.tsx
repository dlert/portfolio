import { motion } from 'motion/react'
import { experience } from '@/data/experience'
import { ease } from '@/lib/motion'

export function Experience() {
  if (experience.length === 0) return null

  return (
    <section id="experience" className="px-6 pt-24 sm:pt-32">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-12">
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase lg:col-span-3 lg:pt-4">
          Experience
        </p>
        <ul className="divide-y divide-border border-y border-border lg:col-span-9">
          {experience.map((item, i) => (
            <motion.li
              key={`${item.company}-${item.period}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
            >
              <span className="text-[15px] font-medium tracking-tight">
                {item.company}
                <span className="text-muted-foreground"> · {item.role}</span>
              </span>
              <span className="font-mono text-[11.5px] text-muted-foreground">{item.period}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
