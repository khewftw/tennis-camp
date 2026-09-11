"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

export const motionEase = [0.22, 1, 0.36, 1] as const;
export const motionDuration = 0.55;
export const motionViewport = { once: true, amount: 0.25 } as const;

export function useHoverMotion() {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  return Boolean(hover && !reduceMotion);
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={motionViewport}
      transition={{ duration: motionDuration, ease: motionEase, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={motionViewport}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduceMotion ? 0 : stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 20,
  x = 0,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: { opacity: 0, y, x },
              show: {
                opacity: 1,
                y: 0,
                x: 0,
                transition: { duration: motionDuration, ease: motionEase },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}
