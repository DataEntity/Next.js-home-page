import { writers } from '@/data/writers'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'

export function WritersSection() {
  return (
    <Section id="writers" eyebrow="Writers" title="我喜歡的作家">
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {writers.map((writer) => (
          <Card key={writer.name} className="flex flex-col justify-between p-4 lg:min-h-80 lg:p-6">
            <div>
              <h3 className="font-display text-2xl lg:text-4xl">{writer.name}</h3>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted">{writer.role}</p>
            </div>
            <p className="mt-4 text-base leading-7 text-muted lg:mt-12 lg:text-lg lg:leading-8">{writer.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
