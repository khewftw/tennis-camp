"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/src/content/site";
import { TennisBall } from "@/src/components/ui/TennisBall";

export function HeroFacts() {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.ul
      className="mt-8 grid w-full max-w-[880px] gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...enter, delay: reduceMotion ? 0 : 0.4 }}
    >
      {site.hero.facts.map((fact) => (
        <li
          key={fact.text}
          className="flex flex-col items-center gap-1.5 text-center"
        >
          {fact.value ? (
            <span className="font-display text-[1.75rem] font-extrabold uppercase leading-none tracking-[-0.03em] text-ball md:text-[2rem]">
              {fact.value}
            </span>
          ) : (
            <span className="flex h-8 items-center md:h-9" aria-hidden>
              <TennisBall
                variant="filled"
                className="h-7 w-7 text-ball md:h-8 md:w-8"
              />
            </span>
          )}
          <span className="max-w-[22ch] text-small text-line/75">
            {fact.text}
          </span>
        </li>
      ))}
    </motion.ul>
  );
}
