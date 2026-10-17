import { motion } from 'motion/react'
import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

const email = 'ferdar4444@gmail.com'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard unavailable (e.g. insecure context): the mailto link still works
    }
  }

  return (
    <section id="contact" className="px-6 pb-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="mx-auto max-w-5xl"
      >
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Contact</p>
        <h2 className="mt-3 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]">
          Let’s build something.
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          A website, an app, an AI-powered tool or a role on your team. Email me with what you have in mind.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-2 font-mono text-[clamp(1rem,2.4vw,1.35rem)] underline decoration-border underline-offset-[6px] transition-colors hover:decoration-foreground"
          >
            {email}
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy email address"
            className="inline-flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      </motion.div>
    </section>
  )
}
