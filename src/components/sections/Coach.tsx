import Image from "next/image";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";

export function Coach() {
  const { caption, role, name, quote, bio, stats, cta, image } = site.coach;

  return (
    <Section id="coach" tone="chalk">
      <Container>
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative min-h-[28rem] overflow-hidden rounded-[28px] bg-ink sm:min-h-[34rem] lg:col-span-7 lg:min-h-[46rem]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[center_20%]"
              priority={false}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-5 sm:p-8 lg:hidden">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ball">
                {caption} · {role}
              </p>
              <p className="mt-2 font-display text-[clamp(3rem,14vw,4.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-line">
                {name}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="hidden text-[13px] font-semibold uppercase tracking-[0.18em] text-ink/55 lg:block">
              {caption} · {role}
            </p>
            <h2 className="hidden font-display text-[clamp(4.5rem,8vw,7rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.05em] text-ink lg:block">
              {name}
            </h2>
            <p className="mt-6 border-l-[3px] border-ball pl-5 font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold uppercase leading-[1.15] tracking-[-0.03em] text-ink">
              {quote}
            </p>
            <div className="mt-8 flex flex-col gap-4 text-body text-ink/80">
              {bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t-[1.5px] border-ink/15 pt-3">
                  <dt className="font-display text-[clamp(1.6rem,3vw,2.15rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-ink">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 max-w-[16ch] text-small text-ink/60">{stat.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <Button href={cta.href} variant="ink" className="h-16 w-full sm:w-auto">
                {cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
