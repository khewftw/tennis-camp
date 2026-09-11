"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { site } from "@/src/content/site";
import { FilterChips } from "@/src/components/ui/FilterChips";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

type Filter = (typeof site.gallery.filters)[number]["id"];

export function Gallery() {
  const { title, filters, items } = site.gallery;
  const [filter, setFilter] = useState<Filter>("all");
  const visible = useMemo(
    () =>
      filter === "all" ? items : items.filter((item) => item.filter === filter),
    [filter, items],
  );

  return (
    <Section id="gallery" tone="chalk">
      <Container>
        <SectionHeading title={title} tone="light" align="center" />
        <div className="mt-8">
          <FilterChips items={filters} value={filter} onChange={setFilter} />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {visible.map((item) => (
            <div
              key={item.src}
              className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-ink md:aspect-[3/4] md:rounded-[12px]"
            >
              <Image
                src={item.src}
                alt=""
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
