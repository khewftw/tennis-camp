"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { motionEase } from "@/src/components/ui/Reveal";

export function HeroMedia() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="absolute inset-0 overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        aria-hidden
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: motionEase }}
      >
        <Image
          src="/hero-mobile.png"
          alt=""
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center md:hidden"
        />
        <Image
          src="/hero-pc.png"
          alt=""
          fill
          priority
          quality={95}
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
        <div className="absolute inset-0 bg-ink/55" />
      </motion.div>
    </section>
  );
}
