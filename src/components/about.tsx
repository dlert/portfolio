import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="px-6 pt-24 sm:pt-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-12"
      >
        <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase lg:col-span-3 lg:pt-2">
          About
        </p>
        <div className="space-y-5 text-[clamp(1.15rem,2vw,1.5rem)] leading-snug tracking-tight lg:col-span-9">
          <p>
            I build software by pairing my own engineering judgment with AI
            agents. That’s how I took a face recognition attendance system to
            98% accuracy, and how I’m building Daily Loop
            <span className="opacity-50">, an app with an AI companion at its core.</span>
          </p>
          <p className="text-muted-foreground">
            I’m strongest at turning a problem into a working product: scoping
            it, directing the AI tooling and debugging what breaks. Now I’m
            deepening my foundations in <b>JavaScript, backend and machine learning.</b>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
