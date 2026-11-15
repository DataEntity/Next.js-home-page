import { writers } from '@/data/writers'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'

export function WritersSection() {
  return (
    <Section id="writers" eyebrow="Writers" title="我喜歡的作家">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {writers.map((writer) => (
          <Card key={writer.name} className="flex min-h-52 flex-col justify-between sm:min-h-64 lg:min-h-80">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl">{writer.name}</h3>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted">{writer.role}</p>
            </div>
            <p className="mt-8 text-base leading-7 text-muted sm:mt-12 sm:text-lg sm:leading-8">{writer.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
