"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { pageGutter } from "@/src/components/ui/Container";
import { HeroFacts } from "@/src/components/sections/HeroFacts";

export function HeroContent() {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div
        className={`pointer-events-auto flex h-full w-full flex-col items-center justify-center ${pageGutter} pt-[72px] pb-24 text-center md:pt-[96px] md:pb-28`}
      >
        <h1 className="max-w-[18ch] text-[clamp(1.7rem,8.4vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-ball">
          {site.hero.titleLines.map((line, index) => (
            <motion.span
              key={line}
              className="block"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...enter,
                delay: reduceMotion ? 0 : index * 0.08,
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-4 max-w-[40rem] text-[16px] font-medium leading-[1.45] text-line md:mt-6 md:text-[20px] md:leading-[1.5]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enter, delay: reduceMotion ? 0 : 0.2 }}
        >
          {site.hero.lead}
        </motion.p>

        <motion.div
          className="mt-6 flex w-full max-w-xl flex-col items-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enter, delay: reduceMotion ? 0 : 0.28 }}
        >
          <Button href={site.hero.primaryCta.href} className="w-full sm:w-auto">
            {site.hero.primaryCta.label}
          </Button>
          <Button
            href={site.hero.secondaryCta.href}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {site.hero.secondaryCta.label}
          </Button>
        </motion.div>

        <div className="[@media(max-height:680px)]:hidden">
          <HeroFacts />
        </div>
      </div>
    </div>
  );
}
