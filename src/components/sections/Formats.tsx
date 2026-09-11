import Image from "next/image";
import clsx from "clsx";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

type Format = (typeof site.formats.items)[number];

function FormatCard({
  format,
  reverse,
}: {
  format: Format;
  reverse: boolean;
}) {
  return (
    <article className="grid min-h-[min(70svh,46rem)] w-full min-w-0 overflow-hidden rounded-[28px] bg-ink text-line lg:min-h-[70svh] lg:grid-cols-2">
      <div
        className={clsx(
          "flex min-w-0 flex-col justify-center px-4 py-8 sm:px-10 md:px-12 lg:px-16 xl:px-[4.5rem] @container",
          reverse && "lg:order-2",
        )}
      >
        <h3 className="text-[min(3.15rem,8.1cqw)] font-extrabold tracking-[-0.04em] text-ball">
          {format.title}
        </h3>
        <p className="mt-5 max-w-[36ch] text-lead text-line md:mt-6">{format.body}</p>
        <p className="mt-4 max-w-[36ch] text-body text-line/80">
          <span className="font-medium text-line">Для кого:</span> {format.audience}
        </p>
        <div className="mt-8 flex w-full min-w-0 flex-col items-start gap-5 sm:mt-10">
          <p className="font-display text-[clamp(1.35rem,2.2vw,2rem)] font-extrabold uppercase tracking-[-0.03em] text-ball">
            {format.price}
          </p>
          <Button
            href={format.cta.href}
            variant="accent"
            className="h-16 w-full max-w-md"
          >
            {format.cta.label}
          </Button>
        </div>
      </div>

      <div
        className={clsx(
          "relative min-h-[42svh] min-w-0 bg-ink md:min-h-[48svh] lg:min-h-0",
          reverse && "lg:order-1",
        )}
      >
        <Image
          src={format.image.src}
          alt={format.image.alt}
          fill
          quality={95}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>
    </article>
  );
}

export function Formats() {
  const { title, lead, items } = site.formats;

  return (
    <Section id="formats" tone="line">
      <Container>
        <SectionHeading
          title={title}
          lead={lead}
          tone="light"
          align="center"
          stroke="none"
        />
        <div className="mt-10 flex flex-col gap-5 md:mt-14 md:gap-6">
          {items.map((format, index) => (
            <FormatCard
              key={format.id}
              format={format}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
