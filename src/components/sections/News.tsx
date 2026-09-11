import { Send } from "lucide-react";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function News() {
  const { title, items, social } = site.news;

  return (
    <Section id="news" tone="court">
      <Container>
        <SectionHeading title={title} tone="dark" align="center" />
        <div className="mt-12 flex flex-col gap-0">
          {items.map((item) => (
            <article
              key={item.title}
              className="border-b-[1.5px] border-line/25 py-6"
            >
              <p className="text-small text-ball">
                {item.date} · {item.tag}
              </p>
              <h3 className="mt-2 max-w-[50ch] text-h3 text-line">{item.title}</h3>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-[28px] bg-ball p-8 text-ink md:p-12">
          <p className="max-w-[46ch] text-lead">{social.title}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={social.telegram.href} variant="ink" className="h-14 px-8">
              <span className="inline-flex items-center gap-2">
                <Send strokeWidth={1.75} className="h-4 w-4" />
                {social.telegram.label}
              </span>
            </Button>
            <Button
              href={social.vk.href}
              variant="outlineInk"
              className="h-14 px-8"
            >
              {social.vk.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
