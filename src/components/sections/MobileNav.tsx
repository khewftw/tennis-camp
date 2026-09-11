"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { pageGutter } from "@/src/components/ui/Container";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={`fixed inset-0 top-[72px] z-[60] flex flex-col bg-ink pb-8 md:top-[96px] min-[1280px]:hidden ${pageGutter}`}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <nav
            className="flex min-h-0 flex-1 flex-col justify-center gap-4 overflow-y-auto py-6"
            aria-label="Мобильная навигация"
          >
            {site.nav.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="font-display text-[clamp(1.75rem,8vw,2.75rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-line"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="flex shrink-0 flex-col gap-4">
            <a
              href={site.contacts.phoneHref}
              className="font-sans text-[20px] font-medium leading-5 text-ball"
            >
              {site.contacts.phone}
            </a>
            <Button href="#signup" onClick={onClose} className="w-full">
              {site.cta.header}
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
