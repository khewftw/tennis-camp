"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import { motionEase } from "@/src/components/ui/Reveal";

const KEY = "cnt-cookie-ok";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpen(window.localStorage.getItem(KEY) !== "1");
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line/15 bg-ink px-[10px] py-4 md:px-6 lg:px-8"
          initial={reduceMotion ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.45, ease: motionEase }}
        >
          <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[46ch] text-small text-line/80">{site.cookie.body}</p>
            <Button
              variant="accent"
              className="h-12 px-6 text-[14px]"
              onClick={() => {
                window.localStorage.setItem(KEY, "1");
                setOpen(false);
              }}
            >
              {site.cookie.text}
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
