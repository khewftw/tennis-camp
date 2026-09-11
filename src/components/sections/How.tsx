"use client";

import clsx from "clsx";
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
const stair = ["lg:pt-0", "lg:pt-16", "lg:pt-32"] as const;

function StepArrow({ flip = false }: { flip?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 140 64"
      fill="none"
      aria-hidden
      className={clsx(
        "pointer-events-none absolute top-2 -right-[22%] z-10 hidden h-14 w-[44%] text-ball lg:block",
        flip && "top-8 rotate-[8deg]",
      )}
    >
      {[
        "M8 44c22-28 58-36 96-14 10 6 18 12 28 14",
        "M116 28c4 10 10 16 18 18",
        "M122 22l18 28-24-6",
      ].map((d) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={motionViewport}
          transition={{ duration: 0.9, ease: motionEase, delay: 0.2 }}
        />
      ))}
    </svg>
  );
}

export function How() {
  const { caption, title, steps, primaryCta, secondaryCta } = site.how;
  const reduceMotion = useReducedMotion();

  return (
    <Section id="how" tone="chalk">
      <Container>
        <Reveal>
          <SectionHeading
            caption={caption}
            title={title}
            tone="light"
            align="center"
            captionStroke
            stroke="none"
          />
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-1 items-start gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <StaggerItem
              key={step.n}
              className={clsx(
                "relative transition-[z-index] [@media(hover:hover)]:hover:z-10",
                stair[index],
              )}
            >
              <article className="relative flex h-full min-h-[22rem] flex-col rounded-[20px] border-[1.5px] border-ball/40 bg-ink px-6 pb-8 pt-12 text-line transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-h-[26rem] md:px-8 md:pb-10 md:pt-14 [@media(hover:hover)]:hover:-translate-y-2.5">
                <motion.span
                  className={clsx(
                    "absolute -top-5 left-5 flex h-14 w-14 items-center justify-center rounded-[14px] bg-ball font-display text-[1.75rem] font-extrabold text-ink",
                    badgeTilt[index],
                  )}
                  initial={reduceMotion ? false : { scale: 0.6 }}
                  whileInView={{ scale: 1 }}
                  viewport={motionViewport}
                  transition={{ duration: 0.5, ease: motionEase, delay: 0.12 }}
                >
                  {step.n}
                </motion.span>
                {index < steps.length - 1 ? (
                  <StepArrow flip={index === 1} />
                ) : null}
                <h3 className="text-h3 text-ball">{step.title}</h3>
                <p className="mt-4 max-w-[42ch] text-body text-line/85">
                  {step.body}
                </p>
                <p className="mt-3 max-w-[42ch] text-body text-line/70">
                  {step.detail}
                </p>
                <div className="mt-auto pt-8">
                  <Button href={step.cta.href} variant="accent" className="w-full">
                    {step.cta.label}
                  </Button>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:mt-16 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href={primaryCta.href} variant="ink" className="h-16 w-full max-w-xl sm:w-auto">
            {primaryCta.label}
          </Button>
          <Button
            href={secondaryCta.href}
            variant="outlineInk"
            className="h-16 w-full max-w-xl sm:w-auto"
          >
            {secondaryCta.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
