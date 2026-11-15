import { cn } from '@/lib/utils'

type SectionProps = {
  id: string
  eyebrow?: string
  title?: string
  className?: string
  children: React.ReactNode
}

export function Section({ id, eyebrow, title, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('section-shell', className)}>
      <div className="section-inner">
        {(eyebrow || title) && (
          <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:gap-3 lg:mb-12">
            {eyebrow && <p className="text-xs uppercase tracking-[0.28em] text-muted sm:text-sm sm:tracking-[0.35em]">{eyebrow}</p>}
            {title && <h2 className="display-title max-w-5xl">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
