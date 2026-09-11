import clsx from "clsx";
import type { ReactNode } from "react";

const tones = {
  ink: "bg-ink text-line",
  chalk: "bg-chalk text-ink",
  ball: "bg-ball text-ink",
  court: "bg-court text-line",
  line: "bg-line text-ink",
} as const;

export function Section({
  id,
  tone = "ink",
  children,
  className,
}: {
  id?: string;
  tone?: keyof typeof tones;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "py-20 md:py-32",
        id && "scroll-mt-[72px] md:scroll-mt-[96px]",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
