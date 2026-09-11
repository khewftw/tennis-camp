import { site } from "@/src/content/site";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { RecognizeFooter } from "@/src/components/sections/RecognizeFooter";
import { RecognizeGrid } from "@/src/components/sections/RecognizeGrid";
import { Reveal } from "@/src/components/ui/Reveal";

export function Recognize() {
  const { caption, title } = site.recognize;

  return (
    <Section className="relative z-0 !pt-28 !pb-20 md:!pt-52 md:!pb-32">
      <Container>
        <Reveal>
          <SectionHeading
            caption={caption}
            title={title}
            stroke="underline"
            captionStroke
            align="center"
            titleClassName="text-[clamp(1.7rem,4.2vw,3.25rem)]"
          />
        </Reveal>
        <RecognizeGrid />
        <Reveal delay={0.12}>
          <RecognizeFooter />
        </Reveal>
      </Container>
    </Section>
  );
}
