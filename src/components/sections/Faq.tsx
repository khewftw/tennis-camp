import { site } from "@/src/content/site";
import { Accordion } from "@/src/components/ui/Accordion";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { Reveal } from "@/src/components/ui/Reveal";

export function Faq() {
  const { title, items } = site.faq;

  return (
    <Section id="faq" tone="ink">
      <Container>
        <Reveal>
          <SectionHeading
            title={title}
            tone="dark"
            align="center"
            titleClassName="text-[clamp(1.55rem,3.6vw,3.2rem)]"
          />
        </Reveal>
        <Reveal className="mt-12">
          <Accordion items={items} />
        </Reveal>
      </Container>
    </Section>
  );
}
