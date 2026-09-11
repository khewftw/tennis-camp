import { CourtsMap } from "@/src/components/sections/CourtsMap";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function Courts() {
  const { title, lead, note, telegramCta, cta } = site.courts;

  return (
    <Section id="courts" tone="ink">
      <Container>
        <SectionHeading
          title={title}
          lead={lead}
          tone="dark"
          align="center"
        />
        <div className="mt-10 md:mt-14">
          <CourtsMap />
        </div>
        <div className="mt-10 flex flex-col items-center gap-6 text-center md:mt-12">
          <p className="max-w-[46ch] text-lead text-line/80">{note}</p>
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              href={telegramCta.href}
              variant="outline"
              className="h-16 w-full max-w-xl px-8 sm:w-auto"
            >
              {telegramCta.label}
            </Button>
            <Button
              href={cta.href}
              variant="accent"
              className="h-16 w-full max-w-xl px-10 sm:w-auto"
            >
              {cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
