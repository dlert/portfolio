import { motion } from 'motion/react'
import { ArrowUpRight, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/projects'
import { ProjectImage } from './project-image'
import { GithubIcon } from './github-icon'

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.1, ease }}
      className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      <motion.div
        initial={{ scale: 0.96, filter: 'blur(6px)' }}
        whileInView={{ scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 1.3, ease }}
        className={cn('lg:col-span-7', flip && 'lg:order-2')}
      >
        <ProjectImage src={project.image} alt={`${project.title} screenshot`} />
      </motion.div>

      <div className={cn('lg:col-span-5', flip && 'lg:order-1')}>
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-wider text-muted-foreground">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-6 bg-border" />
          {project.repo ? <span>PUBLIC</span> : <span className="inline-flex items-center gap-1"><Lock className="size-3" /> PRIVATE</span>}
          {project.status && (
            <>
              <span className="h-px w-6 bg-border" />
              <span className="uppercase">{project.status}</span>
            </>
          )}
        </div>

        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{project.title}</h3>
        <p className="mt-2 text-[15px] text-muted-foreground">{project.tagline}</p>

        <p className="mt-5 text-[15px] leading-relaxed text-foreground/80">{project.description}</p>

        <ul className="mt-5 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[13.5px] leading-snug text-muted-foreground">
              <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-foreground/40" />
              {h}
            </li>
          ))}
        </ul>

        {project.stack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
        )}

        {(project.repo || project.live) && (
          <div className="mt-7 flex gap-2">
            {project.repo && (
              <Button asChild variant="outline" size="sm" className="group/btn">
                <a href={project.repo} target="_blank" rel="noreferrer">
                  <GithubIcon className="size-3.5" />
                  Code
                </a>
              </Button>
            )}
            {project.live && (
              <Button asChild size="sm" className="group/btn">
                <a href={project.live} target="_blank" rel="noreferrer">
                  Live
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}
