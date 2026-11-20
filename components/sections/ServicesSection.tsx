'use client'

import { useState } from 'react'
import { services } from '@/data/services'
import { Section } from '@/components/ui/Section'

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeService = services[activeIndex]

  return (
    <Section id="services" eyebrow="Services" title="四個暫存的主題">
      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)] lg:items-stretch lg:gap-8">
        <div className="grid min-w-0 grid-cols-2 gap-2 lg:content-center lg:grid-cols-1">
          {services.map((service, index) => {
            const active = activeIndex === index

            return (
              <button
                key={service.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="flex min-h-11 w-full min-w-0 items-center justify-between gap-2 rounded-2xl border border-line px-3 py-2 text-left transition fine:hover:bg-ink fine:hover:text-paper focus-visible:bg-ink focus-visible:text-paper active:bg-ink active:text-paper data-[active=true]:bg-ink data-[active=true]:text-paper lg:gap-4 lg:px-5 lg:py-3"
                data-active={active}
              >
                <span className={`shrink-0 text-xs uppercase tracking-[0.2em] lg:text-sm lg:tracking-[0.25em] ${active ? 'text-paper/60' : 'text-muted'}`}>{service.part}</span>
                <h3 className="min-w-0 text-right font-display text-xl leading-tight lg:text-2xl">{service.title}</h3>
              </button>
            )
          })}
        </div>
        <article className="min-w-0 rounded-[1.5rem] border border-line bg-paper/70 p-4 lg:flex lg:h-full lg:flex-col lg:justify-center lg:rounded-[2rem] lg:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-muted lg:text-sm lg:tracking-[0.35em]">{activeService.part}</p>
          <h3 className="mt-3 font-display text-2xl lg:mt-4 lg:text-4xl xl:text-5xl">{activeService.title}</h3>
          <p className="mt-3 text-base leading-6 text-muted lg:mt-5 lg:max-w-xl lg:text-lg lg:leading-8">{activeService.body}</p>
        </article>
      </div>
    </Section>
  )
}
