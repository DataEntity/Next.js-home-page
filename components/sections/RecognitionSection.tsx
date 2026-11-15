import { recognitionGroups } from '@/data/recognition'
import { Section } from '@/components/ui/Section'

export function RecognitionSection() {
  return (
    <Section id="recognition" eyebrow="Recognition" title="不是榮譽，而是可回看的材料">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {recognitionGroups.map((group) => (
          <div key={group.title} className="rounded-3xl border border-line p-5 sm:p-6">
            <h3 className="font-display text-2xl sm:text-3xl">{group.title}</h3>
            <ul className="mt-8 space-y-3 text-muted">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
