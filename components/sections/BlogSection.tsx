import { Section } from '@/components/ui/Section'

export function BlogSection() {
  return (
    <Section id="blog" eyebrow="Blog" title="Fragments and logs">
      <div className="grid gap-4 sm:gap-8 lg:grid-cols-2">
        <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
          My Blog
        </p>
        <a
          href="https://blog.kirishima.dev/"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-40 items-end rounded-[1.5rem] border border-line bg-ink p-6 text-paper transition fine:hover:-translate-y-1 focus-visible:-translate-y-1 active:-translate-y-1 sm:min-h-64 sm:rounded-[2rem] sm:p-8"
        >
          <span className="font-display text-4xl sm:text-5xl">Open Blog</span>
        </a>
      </div>
    </Section>
  )
}
