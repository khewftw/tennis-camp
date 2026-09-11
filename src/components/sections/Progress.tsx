"use client";

import clsx from "clsx";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import {
  Reveal,
  Stagger,
  StaggerItem,
  motionEase,
  motionViewport,
} from "@/src/components/ui/Reveal";

const badgeTilt = ["-rotate-[8deg]", "rotate-[7deg]", "-rotate-[4deg]"] as const;

export function Progress() {
  const { title, lead, steps, cta } = site.progress;
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <Section id="progress" tone="ball">
      <Container>
        <Reveal>
          <SectionHeading
            title={title}
            lead={lead}
            tone="light"
            align="center"
            titleClassName="text-[clamp(1.7rem,4.2vw,3.4rem)] [text-wrap:wrap]"
          />
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {steps.map((step, index) => {
            const selected = active === index;
            return (
              <StaggerItem key={step.n}>
                <motion.button
                  type="button"
                  onClick={() => setActive(index)}
                  animate={{ scale: selected ? 1.02 : 1 }}
                  transition={{ duration: 0.35, ease: motionEase }}
                  className={clsx(
                    "relative flex min-h-[16rem] w-full flex-col rounded-[20px] border-[1.5px] bg-ink p-6 pt-12 text-left transition-colors duration-150 md:p-8 md:pt-14",
                    selected ? "border-line" : "border-line/25",
                  )}
                >
                  <motion.span
                    className={clsx(
                      "absolute -top-5 left-5 flex h-14 min-w-14 items-center justify-center rounded-[14px] bg-ball px-3 font-display text-[1.75rem] font-extrabold text-ink",
                      badgeTilt[index],
                    )}
                    initial={reduceMotion ? false : { scale: 0.6 }}
                    whileInView={{ scale: 1 }}
                    viewport={motionViewport}
                    transition={{ duration: 0.5, ease: motionEase, delay: 0.12 }}
                  >
                    {step.n}
                  </motion.span>
                  <h3 className="text-h3 text-ball">{step.title}</h3>
                  <p className="mt-4 max-w-[36ch] text-body text-line/80">
                    {step.body}
                  </p>
                </motion.button>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal className="mt-12 flex justify-center">
          <Button href={cta.href} variant="ink" className="h-16 px-10">
            {cta.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
