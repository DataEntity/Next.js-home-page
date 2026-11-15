import { contacts } from "@/data/contacts";
import { Section } from "@/components/ui/Section";

export function ContactsSection() {
  return (
    <Section id="contacts" eyebrow="Contacts" title="如何聯係我">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
        關於我,不是很喜歡介紹自己,多少有點自賣自誇的原因,所以這裏貼幾個tag,「技术宅」「维基人」「manga愛好」「homelab」「Colemak-DH」「WebDev」「RSS」
        </p>
        <div className="divide-y divide-line rounded-3xl border border-line">
          {contacts.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              className="flex items-center justify-between gap-4 p-4 font-display text-3xl transition hover:bg-ink hover:text-paper sm:p-6 sm:text-4xl"
            >
              {contact.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
