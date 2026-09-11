"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { motionEase } from "@/src/components/ui/Reveal";

export function FilterChips<T extends string>({
  items,
  value,
  onChange,
  tone = "light",
}: {
  items: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <LayoutGroup>
      <div className="-mx-1 flex flex-wrap justify-center gap-2 px-1">
        {items.map((item) => {
          const active = item.id === value;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={clsx(
                "relative rounded-full px-4 py-2 text-[15px] font-semibold uppercase tracking-[0.04em] transition-colors duration-150",
                active
                  ? "text-ink"
                  : dark
                    ? "bg-transparent text-line shadow-[0_0_0_1.5px_rgba(255,255,255,0.7)] hover:bg-line hover:text-ink"
                    : "bg-transparent text-ink shadow-[0_0_0_1.5px_#000000] hover:bg-ink hover:text-line",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="chip"
                  className="absolute inset-0 rounded-full bg-ball"
                  transition={{ duration: 0.35, ease: motionEase }}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
