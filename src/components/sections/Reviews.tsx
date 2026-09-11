"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/src/content/site";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { Reveal, motionEase } from "@/src/components/ui/Reveal";

export function Reviews() {
  const { title, lead, background, items } = site.reviews;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (delta: number) => {
      const next = (index + delta + items.length) % items.length;
      const scroller = scrollerRef.current;
      const card = scroller?.children[next] as HTMLElement | undefined;
      if (scroller && card) {
        const left = card.offsetLeft - scroller.offsetLeft;
        scroller.scrollTo({ left, behavior: "smooth" });
      }
      setIndex(next);
    },
    [index, items.length],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    function onScroll() {
      const node = scrollerRef.current;
      if (!node) return;
      const cards = [...node.children] as HTMLElement[];
      const mid = node.scrollLeft + node.clientWidth / 2;
      let closest = 0;
      let best = Infinity;
      cards.forEach((card, i) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < best) {
          best = dist;
          closest = i;
        }
      });
      setIndex(closest);
    }

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Section id="reviews" tone="ink" className="relative">
      <Image
        src={background}
        alt=""
        fill
        quality={95}
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-ink/55" />
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading title={title} lead={lead} tone="dark" align="center" />
        </Reveal>
        <Reveal className="relative mt-10 md:mt-12">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => (
              <motion.article
                key={item.name}
                whileTap={{ scale: 0.98 }}
                className="w-[78%] shrink-0 snap-start rounded-[28px] border-[1.5px] border-ball/60 bg-ink/40 px-5 py-10 text-center backdrop-blur-[2px] sm:px-8 md:w-[calc(50%-8px)] md:px-10 md:py-14"
              >
                <div className="mx-auto h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    width={80}
                    height={80}
                    quality={95}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mx-auto mt-8 max-w-[36ch] text-lead text-ball">
                  «{item.quote}»
                </p>
                <p className="mt-6 text-body text-line">{item.name}</p>
                <p className="mt-1 text-small text-line/70">{item.meta}</p>
              </motion.article>
            ))}
          </div>

          <motion.button
            type="button"
            aria-label="Предыдущий отзыв"
            onClick={() => go(-1)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: motionEase }}
            className="absolute top-[42%] left-1 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ball text-ink shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          >
            <ChevronLeft strokeWidth={1.75} className="h-6 w-6" />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Следующий отзыв"
            onClick={() => go(1)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: motionEase }}
            className="absolute top-[42%] right-1 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ball text-ink shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          >
            <ChevronRight strokeWidth={1.75} className="h-6 w-6" />
          </motion.button>

          <p className="mt-5 text-center text-small text-line/70">
            {index + 1} / {items.length}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
