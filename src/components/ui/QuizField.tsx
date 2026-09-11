"use client";

import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  const rest = digits.startsWith("7") ? digits.slice(1) : digits;
  const parts = [
    rest.slice(0, 3),
    rest.slice(3, 6),
    rest.slice(6, 8),
    rest.slice(8, 10),
  ].filter(Boolean);
  if (!digits) return "";
  return `+7${parts[0] ? ` (${parts[0]}` : ""}${parts[0]?.length === 3 ? ")" : ""}${parts[1] ? ` ${parts[1]}` : ""}${parts[2] ? `-${parts[2]}` : ""}${parts[3] ? `-${parts[3]}` : ""}`;
}

export function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^8/, "7");
  return digits.startsWith("7") ? digits.slice(1) : digits;
}

export function QuizInput({
  label,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <label className="flex w-full flex-col gap-2 text-left">
      <span className="text-[15px] font-medium text-ink/80">{label}</span>
      <input
        {...props}
        className={clsx(
          "h-16 w-full rounded-full bg-line px-6 text-body text-ink outline-none ring-[1.5px] ring-ink/20 transition-shadow placeholder:text-ink/35 focus-visible:ring-[3px] focus-visible:ring-court",
          error && "ring-clay",
          className,
        )}
      />
      {error ? <span className="text-small text-clay">{error}</span> : null}
    </label>
  );
}

export function QuizPills<T extends string>({
  legend,
  items,
  value,
  onChange,
}: {
  legend: string;
  items: readonly { id: T; label: string }[];
  value: T | "";
  onChange: (id: T) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const active = item.id === value;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={clsx(
                "h-16 rounded-full px-6 text-center text-[15px] font-semibold uppercase tracking-[0.04em] transition-colors duration-150",
                active
                  ? "bg-ink text-line"
                  : "bg-line text-ink shadow-[0_0_0_1.5px_#000000] hover:bg-ink hover:text-line",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function QuizCheck({
  checked,
  onChange,
  error,
  children,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex cursor-pointer items-start gap-3 text-left text-small text-ink/80">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-ink"
        />
        <span>{children}</span>
      </label>
      {error ? <span className="text-small text-clay">{error}</span> : null}
    </div>
  );
}
