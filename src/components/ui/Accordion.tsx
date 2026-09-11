"use client";

import { Plus } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Stagger, StaggerItem, motionEase } from "@/src/components/ui/Reveal";

export function Accordion({
  items,
  tone = "dark",
}: {
  items: readonly { question: string; answer: string }[];
  tone?: "dark" | "light";
}) {
  const [open, setOpen] = useState(0);
  const light = tone === "light";
  const mid = Math.ceil(items.length / 2);
  const columns = [items.slice(0, mid), items.slice(mid)];
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-2">
      {columns.map((column, columnIndex) => (
        <Stagger key={columnIndex}>
          {column.map((item, index) => {
            const i = columnIndex === 0 ? index : index + mid;
            const isOpen = open === i;
            return (
              <StaggerItem key={item.question}>
                <div
                  className={clsx(
                    "border-b-[1.5px]",
                    light ? "border-ink/20" : "border-line/20",
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={clsx(
                        "max-w-[42ch] font-display text-[clamp(1rem,1.6vw,1.25rem)] font-bold uppercase tracking-[-0.03em]",
                        light ? "text-ink" : "text-line",
                      )}
                    >
                      {item.question}
                    </span>
                    <Plus
                      strokeWidth={1.75}
                      className={clsx(
                        "mt-1 h-5 w-5 shrink-0 transition-transform duration-150",
                        light ? "text-ink" : "text-line",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: motionEase }}
                        className="overflow-hidden"
                      >
                        <p
                          className={clsx(
                            "max-w-[46ch] pb-5 text-body",
                            light ? "text-ink/70" : "text-line/75",
                          )}
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      ))}
    </div>
  );
}
