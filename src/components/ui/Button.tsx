"use client";

import clsx from "clsx";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  useRef,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";

type Variant = "accent" | "outline" | "ghost" | "ink" | "outlineInk" | "court";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
};

const variants: Record<Variant, string> = {
  accent:
    "bg-ball text-ink hover:bg-ink hover:text-ball hover:shadow-[0_0_0_1.5px_#e3f339]",
  outline:
    "bg-transparent text-line shadow-[0_0_0_1.5px_rgba(255,255,255,0.7)] hover:bg-line hover:text-ink hover:shadow-[0_0_0_1.5px_#ffffff]",
  ghost: "bg-transparent text-ball hover:text-line",
  ink: "bg-ink text-line hover:bg-transparent hover:text-ink hover:shadow-[0_0_0_1.5px_#000000]",
  outlineInk:
    "bg-transparent text-ink shadow-[0_0_0_1.5px_#000000] hover:bg-ink hover:text-line hover:shadow-[0_0_0_1.5px_#000000]",
  court:
    "bg-court text-line hover:bg-ink hover:text-line hover:shadow-[0_0_0_1.5px_#2350e8]",
};

const shineVariants = {
  rest: { x: "-160%", opacity: 0 },
  hover: { x: "280%", opacity: [0, 1, 0] },
};

export function Button({
  children,
  href,
  variant = "accent",
  className,
  onClick,
  type = "button",
  ariaLabel,
  disabled = false,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.35 });

  function handleMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.22);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedClassName = clsx(
    "relative inline-flex h-16 cursor-pointer items-center justify-center overflow-hidden rounded-full px-6 font-sans text-[16px] font-semibold uppercase tracking-[0.04em] whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-court disabled:cursor-not-allowed disabled:opacity-40 sm:px-8",
    variants[variant],
    className,
  );

  const shine =
    variant === "ghost" ? null : (
      <motion.span
        aria-hidden
        variants={reduceMotion ? undefined : shineVariants}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 skew-x-[-20deg] bg-white/40"
      />
    );

  const inner = (
    <>
      {shine}
      <span className="relative z-10 px-1 text-center whitespace-nowrap">{children}</span>
    </>
  );

  const motionProps = {
    initial: "rest" as const,
    whileHover: reduceMotion ? "rest" : "hover",
    whileTap: reduceMotion ? "rest" : "tap",
    variants: reduceMotion
      ? undefined
      : {
          rest: { scale: 1 },
          hover: { scale: 1.035 },
          tap: { scale: 0.97 },
        },
    transition: { type: "spring" as const, stiffness: 420, damping: 24 },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    "aria-label": ariaLabel,
    style: reduceMotion ? undefined : { x: springX, y: springY },
    className: sharedClassName,
  } as const;

  if (href) {
    const external = href.startsWith("http");
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
