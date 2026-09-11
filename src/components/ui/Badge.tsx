import clsx from "clsx";
import type { ReactNode } from "react";

const tones = {
  ball: "bg-ball text-ink",
  court: "bg-court text-line",
  clay: "bg-clay text-line",
  ink: "bg-ink text-line",
} as const;

export function Badge({
  children,
  tone = "court",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.04em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
