import { motion } from 'motion/react'
import { fadeUp } from '@/lib/motion'

export function Story() {
  return (
    <section id="writing" className="px-6 pb-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-12"
      >
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
          Writing
        </p>
        <div className="space-y-5 text-[clamp(1.15rem,2vw,1.5rem)] leading-snug tracking-tight lg:col-span-9">
          <p className="font-mono text-[12px] tracking-wider text-muted-foreground">Web3 · X · Substack · Medium · Reddit</p>
          <p>
            Before most of my code, I wrote. I’ve written a lot about Web3 projects, mainly as threads on X, with
            longer pieces on Substack, Medium and Reddit.
          </p>
          <p className="text-muted-foreground">
            It taught me to explain technical ideas clearly, and I bring that to every spec and prompt I write.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
