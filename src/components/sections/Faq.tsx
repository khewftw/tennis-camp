import { site } from "@/src/content/site";
import { Accordion } from "@/src/components/ui/Accordion";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Faq() {
  const { title, items } = site.faq;

  return (
    <Section id="faq" tone="ink">
      <Container>
        <SectionHeading title={title} tone="dark" align="center" titleClassName="text-[clamp(1.55rem,3.6vw,3.2rem)]" />
        <div className="mt-12">
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}
