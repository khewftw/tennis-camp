"use client";

import clsx from "clsx";
import { useState } from "react";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const badgeTilt = ["-rotate-[8deg]", "rotate-[7deg]", "-rotate-[4deg]"] as const;

export function Progress() {
  const { title, lead, steps, cta } = site.progress;
  const [active, setActive] = useState(0);

  return (
    <Section id="progress" tone="ball">
      <Container>
        <SectionHeading
          title={title}
          lead={lead}
          tone="light"
          align="center"
          titleClassName="text-[clamp(1.7rem,4.2vw,3.4rem)] [text-wrap:wrap]"
        />
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, index) => {
            const selected = active === index;
            return (
              <button
                key={step.n}
                type="button"
                onClick={() => setActive(index)}
                className={clsx(
                  "relative flex min-h-[16rem] flex-col rounded-[20px] border-[1.5px] bg-ink p-6 pt-12 text-left transition-colors duration-150 md:p-8 md:pt-14",
                  selected ? "border-line" : "border-line/25",
                )}
              >
                <span
                  className={clsx(
                    "absolute -top-5 left-5 flex h-14 min-w-14 items-center justify-center rounded-[14px] bg-ball px-3 font-display text-[1.75rem] font-extrabold text-ink",
                    badgeTilt[index],
                  )}
                >
                  {step.n}
                </span>
                <h3 className="text-h3 text-ball">{step.title}</h3>
                <p className="mt-4 max-w-[36ch] text-body text-line/80">
                  {step.body}
                </p>
              </button>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <Button href={cta.href} variant="ink" className="h-16 px-10">
            {cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
