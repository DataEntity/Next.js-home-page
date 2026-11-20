import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  eyebrow?: string
  title?: string
  subtitle?: string
  className?: string
  children: React.ReactNode
}

export function Section({ id, eyebrow, title, subtitle, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('section-shell', className)}>
      <div className="section-inner">
        {(eyebrow || title || subtitle) && (
          <div className="section-heading mb-4 flex flex-col gap-2 lg:mb-12 lg:gap-3">
            {eyebrow && <p className="text-xs uppercase tracking-[0.28em] text-muted lg:text-sm lg:tracking-[0.35em]">{eyebrow}</p>}
            {title && <h2 className="display-title max-w-5xl">{title}</h2>}
            {subtitle && <p className="max-w-3xl text-lg leading-7 text-muted lg:text-xl lg:leading-8">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
