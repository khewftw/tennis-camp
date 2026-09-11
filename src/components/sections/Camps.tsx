"use client";

import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/src/content/site";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import {
  Reveal,
  motionEase,
  motionViewport,
  useHoverMotion,
} from "@/src/components/ui/Reveal";

type Camp = (typeof site.camps.items)[number];

function CampCard({ camp, reverse }: { camp: Camp; reverse: boolean }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const hover = useHoverMotion();

  return (
    <article className="grid min-h-[min(64svh,40rem)] w-full min-w-0 overflow-hidden rounded-[28px] bg-ink text-line lg:grid-cols-2">
      <Reveal
        className={clsx(
          "flex min-w-0 flex-col justify-center px-4 py-8 sm:px-10 md:px-12 lg:px-16",
          reverse && "lg:order-2",
        )}
        x={reverse ? 20 : -20}
      >
        <Badge tone="clay" className="self-start">
          Осталось {camp.spotsLeft} из {camp.spotsTotal}
        </Badge>
        <h3 className="mt-5 text-[min(2.4rem,7.4cqw)] font-extrabold tracking-[-0.04em] text-ball @container">
          {camp.title}
        </h3>
        <p className="mt-3 text-body font-medium text-line">{camp.meta}</p>
        <p className="mt-5 max-w-[42ch] text-body text-line/85">{camp.body}</p>
        <p className="mt-4 max-w-[42ch] text-small text-line/75">
          <span className="font-medium text-line">Что входит:</span> {camp.includes}
        </p>
        {camp.schedule.length > 0 ? (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="text-[15px] font-semibold uppercase tracking-[0.04em] text-ball underline-offset-4 hover:underline"
            >
              {open ? "Скрыть расписание" : "Расписание дня"}
            </button>
            {open ? (
              <ul className="mt-3 space-y-1 text-body text-line/85">
                {camp.schedule.map((row) => (
                  <li key={row.time}>
                    {row.time} — {row.title}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        <div className="mt-8">
          <p className="font-display text-[clamp(1.35rem,2.2vw,2rem)] font-extrabold uppercase tracking-[-0.03em] text-ball">
            {camp.price}
          </p>
          {camp.earlyPrice ? (
            <p className="mt-1 text-small text-line/75">
              ранняя цена {camp.earlyPrice} {camp.earlyUntil}
            </p>
          ) : null}
          <Button
            href={camp.cta.href}
            variant="accent"
            className="mt-5 h-16 w-full max-w-md"
          >
            {camp.cta.label}
          </Button>
        </div>
      </Reveal>
      <div
        className={clsx(
          "relative min-h-[36svh] overflow-hidden bg-ink lg:min-h-0",
          reverse && "lg:order-1",
        )}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? false : { scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={motionViewport}
          transition={{ duration: 1.1, ease: motionEase }}
        >
          <motion.div
            className="relative h-full w-full"
            whileHover={hover ? { scale: 1.04 } : undefined}
            transition={{ duration: 0.45, ease: motionEase }}
          >
            <Image
              src={camp.image.src}
              alt={camp.image.alt}
              fill
              quality={95}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </article>
  );
}

export function Camps() {
  const { title, lead, items, note } = site.camps;

  return (
    <Section id="camps" tone="chalk">
      <Container>
        <Reveal>
          <SectionHeading
            title={title}
            lead={lead}
            tone="light"
            align="center"
            titleClassName="text-[clamp(1.7rem,4.2vw,3.4rem)]"
          />
        </Reveal>
        <div className="mt-10 flex flex-col gap-5 md:mt-14 md:gap-6">
          {items.map((camp, index) => (
            <CampCard key={camp.id} camp={camp} reverse={index % 2 === 1} />
          ))}
        </div>
        <Reveal>
          <p className="mx-auto mt-8 max-w-[50ch] text-center text-small text-ink/70">
            {note}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
