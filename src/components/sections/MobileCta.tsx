"use client";

import { useEffect, useState } from "react";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";

export function MobileCta() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.querySelector("#signup");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line/10 bg-ink/95 px-[10px] py-3 backdrop-blur-sm md:hidden">
      <Button href="#signup" className="w-full">
        {site.cta.mobile}
      </Button>
    </div>
  );
}
