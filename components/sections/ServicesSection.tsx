'use client'

import { useState } from 'react'
import { services } from '@/data/services'
import { Section } from '@/components/ui/Section'

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeService = services[activeIndex]

  return (
    <Section id="services" eyebrow="Services" title="四個暫存的主題">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
        <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-1">
          {services.map((service, index) => {
            const active = activeIndex === index

            return (
              <button
                key={service.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="w-full rounded-2xl border border-line p-4 text-left transition hover:bg-ink hover:text-paper data-[active=true]:bg-ink data-[active=true]:text-paper sm:rounded-3xl sm:p-5"
                data-active={active}
              >
                <span className={active ? 'text-xs uppercase tracking-[0.2em] text-paper/60 sm:text-sm sm:tracking-[0.25em]' : 'text-xs uppercase tracking-[0.2em] text-muted sm:text-sm sm:tracking-[0.25em]'}>{service.part}</span>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl">{service.title}</h3>
              </button>
            )
          })}
        </div>
        <article className="rounded-[1.5rem] border border-line bg-paper/70 p-5 sm:rounded-[2rem] sm:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-muted sm:text-sm sm:tracking-[0.35em]">{activeService.part}</p>
          <h3 className="mt-4 font-display text-4xl sm:mt-6 sm:text-5xl">{activeService.title}</h3>
          <p className="mt-5 text-lg leading-8 text-muted sm:mt-8 sm:text-xl sm:leading-9">{activeService.body}</p>
        </article>
      </div>
    </Section>
  )
}
