import { experienceItems } from '@/data/experience'
import { Section } from '@/components/ui/Section'

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="正在運行的時間線">
      <div className="divide-y divide-line rounded-3xl border border-line">
        {experienceItems.map((item) => (
          <div key={item.title} className="group grid gap-3 p-4 transition hover:bg-ink hover:text-paper sm:gap-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="min-w-0">
              <h3 className="font-display text-3xl sm:text-4xl">{item.title}</h3>
              <p className="mt-2 text-muted group-hover:text-paper/70">{item.status}</p>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted group-hover:text-paper/70 sm:text-sm sm:tracking-[0.25em]">{item.date}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
