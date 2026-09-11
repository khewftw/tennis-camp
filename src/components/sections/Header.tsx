"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DesktopNav } from "@/src/components/sections/DesktopNav";
import { HeaderActions } from "@/src/components/sections/HeaderActions";
import { MobileNav } from "@/src/components/sections/MobileNav";
import { Logo } from "@/src/components/ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-ink" : "bg-transparent"
      }`}
    >
      <div className="grid h-[72px] w-full grid-cols-[1fr_auto] items-center px-[10px] md:h-[96px] md:px-6 lg:px-8 min-[1280px]:grid-cols-[1fr_auto_1fr]">
        <div className="justify-self-start">
          <Logo />
        </div>

        <DesktopNav />
        <HeaderActions />

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-self-end text-ball min-[1280px]:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X strokeWidth={1.75} /> : <Menu strokeWidth={1.75} />}
        </button>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
