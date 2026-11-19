import { links } from '@/data/links'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'

export function LinksSection() {
  return (
    <Section id="links" eyebrow="Links" title="可以前往的地方">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="group">
            <Card className="h-full transition fine:group-hover:-translate-y-1 fine:group-hover:bg-ink fine:group-hover:text-paper group-focus-visible:-translate-y-1 group-focus-visible:bg-ink group-focus-visible:text-paper group-active:-translate-y-1 group-active:bg-ink group-active:text-paper">
              <h3 className="font-display text-3xl sm:text-4xl">{link.title}</h3>
              <p className="mt-3 text-muted fine:group-hover:text-paper/70 group-focus-visible:text-paper/70 group-active:text-paper/70 sm:mt-4">{link.description}</p>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  )
}
