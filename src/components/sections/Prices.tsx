import { site } from "@/src/content/site";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Prices() {
  const { title, lead, items, note } = site.prices;

  return (
    <Section id="prices" tone="ink">
      <Container>
        <SectionHeading
          title={title}
          lead={lead}
          tone="dark"
          align="center"
          titleClassName="text-[clamp(1.7rem,4.2vw,3.4rem)]"
        />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-[28px] border-[1.5px] border-ball bg-ink p-6 text-line md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-h3 text-ball">{item.title}</h3>
                {item.badge ? (
                  <Badge tone={item.badgeTone}>{item.badge}</Badge>
                ) : null}
              </div>
              <p className="mt-6 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold uppercase tracking-[-0.03em] text-ball">
                {item.price}
              </p>
              {item.extra ? (
                <p className="mt-3 max-w-[42ch] text-body text-line/85">{item.extra}</p>
              ) : null}
              <ul className="mt-5 flex flex-col gap-2 text-body text-line/80">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button href={item.cta.href} variant="accent" className="h-14 w-full">
                  {item.cta.label}
                </Button>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-[50ch] text-center text-small text-line/70">
          {note}
        </p>
      </Container>
    </Section>
  );
}
