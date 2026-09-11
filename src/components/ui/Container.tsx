import clsx from "clsx";
import type { ReactNode } from "react";

export const pageGutter = "px-[10px] md:px-6 lg:px-8";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full", pageGutter, className)}>
      {children}
    </div>
  );
}
