"use client";

import clsx from "clsx";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const paths = {
  underline:
    "M6 46c88-5 162 5 248 2 76-2 122-10 178-24 38-10 56-30 90-28 36 2 50 30 84 40 46 14 90 2 146-8 88-16 176-6 266 4 52 6 98 2 154-8",
  circle:
    "M36 16C20 23 8 35 9 47c1 15 22 24 52 26 28 2 72-2 104-12 20-6 33-16 32-28-1-14-24-24-62-26C98 5 56 8 36 16Z",
} as const;

export function ChalkStroke({
  variant,
  color = "ball",
  className,
}: {
  variant: keyof typeof paths;
  color?: "ball" | "ink";
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const draw = Boolean(reduceMotion) || inView;

  const isCircle = variant === "circle";

  return (
    <svg
      ref={ref}
      viewBox={isCircle ? "0 0 200 72" : "0 0 1200 72"}
      fill="none"
      preserveAspectRatio="none"
      className={clsx(
        "overflow-visible",
        color === "ink" ? "text-ink" : "text-ball",
        className,
      )}
      aria-hidden
    >
      <motion.path
        d={paths[variant]}
        stroke="currentColor"
        strokeWidth={isCircle ? 2.1 : 3}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        fill="none"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        animate={{ pathLength: draw ? 1 : 0 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
