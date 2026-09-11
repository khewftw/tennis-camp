"use client";

import clsx from "clsx";

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
    <div className="-mx-1 flex flex-wrap justify-center gap-2 px-1">
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={clsx(
              "rounded-full px-4 py-2 text-[15px] font-semibold uppercase tracking-[0.04em] transition-colors duration-150",
              active
                ? "bg-ball text-ink"
                : dark
                  ? "bg-transparent text-line shadow-[0_0_0_1.5px_rgba(255,255,255,0.7)] hover:bg-line hover:text-ink"
                  : "bg-transparent text-ink shadow-[0_0_0_1.5px_#000000] hover:bg-ink hover:text-line",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
