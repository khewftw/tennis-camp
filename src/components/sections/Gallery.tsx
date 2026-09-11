"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/src/content/site";
import { FilterChips } from "@/src/components/ui/FilterChips";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import {
  Reveal,
  motionEase,
  useHoverMotion,
} from "@/src/components/ui/Reveal";

type Filter = (typeof site.gallery.filters)[number]["id"];

export function Gallery() {
  const { title, filters, items } = site.gallery;
  const [filter, setFilter] = useState<Filter>("all");
  const hover = useHoverMotion();
  const visible = useMemo(
    () =>
      filter === "all" ? items : items.filter((item) => item.filter === filter),
    [filter, items],
  );

  return (
    <Section id="gallery" tone="chalk">
      <Container>
        <Reveal>
          <SectionHeading title={title} tone="light" align="center" />
        </Reveal>
        <Reveal className="mt-8">
          <FilterChips items={filters} value={filter} onChange={setFilter} />
        </Reveal>
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: motionEase }}
                className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-ink md:aspect-[3/4] md:rounded-[12px]"
              >
                <motion.div
                  className="relative h-full w-full"
                  whileHover={hover ? { scale: 1.06 } : undefined}
                  transition={{ duration: 0.45, ease: motionEase }}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
