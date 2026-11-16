'use client'

import { useState } from 'react'
import { services } from '@/data/services'
import { Section } from '@/components/ui/Section'

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeService = services[activeIndex]

  return (
    <Section id="services" eyebrow="Services" title="四個暫存的主題">
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)] lg:items-stretch lg:gap-8">
        <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:content-center lg:grid-cols-1 lg:gap-2">
          {services.map((service, index) => {
            const active = activeIndex === index

            return (
              <button
                key={service.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="w-full rounded-2xl border border-line p-4 text-left transition hover:bg-ink hover:text-paper data-[active=true]:bg-ink data-[active=true]:text-paper sm:rounded-3xl sm:p-5 lg:flex lg:items-center lg:justify-between lg:gap-4 lg:rounded-2xl lg:px-5 lg:py-3"
                data-active={active}
              >
                <span className={`text-xs uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.25em] lg:shrink-0 ${active ? 'text-paper/60' : 'text-muted'}`}>{service.part}</span>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl lg:mt-0 lg:text-right lg:text-2xl">{service.title}</h3>
              </button>
            )
          })}
        </div>
        <article className="rounded-[1.5rem] border border-line bg-paper/70 p-5 sm:rounded-[2rem] sm:p-8 lg:flex lg:h-full lg:flex-col lg:justify-center lg:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-muted sm:text-sm sm:tracking-[0.35em]">{activeService.part}</p>
          <h3 className="mt-4 font-display text-4xl sm:mt-6 sm:text-5xl lg:mt-4 lg:text-4xl xl:text-5xl">{activeService.title}</h3>
          <p className="mt-5 text-lg leading-8 text-muted sm:mt-8 sm:text-xl sm:leading-9 lg:mt-5 lg:max-w-xl lg:text-lg lg:leading-8">{activeService.body}</p>
        </article>
      </div>
    </Section>
  )
}
