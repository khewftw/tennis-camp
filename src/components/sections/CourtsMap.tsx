"use client";

import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";
import {
  loadYmaps,
  yandexWidgetUrl,
  type YMapsPlacemark,
} from "@/src/lib/ymaps";
import { Stagger, StaggerItem, motionEase } from "@/src/components/ui/Reveal";

type Court = (typeof site.courts.items)[number];

const PIN = "/img/pin-court.svg";
const PIN_ACTIVE = "/img/pin-court-active.svg";
const HAS_API_KEY = Boolean(process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY);

function pinOptions(active: boolean) {
  return active
    ? {
        iconLayout: "default#image",
        iconImageHref: PIN_ACTIVE,
        iconImageSize: [44, 56],
        iconImageOffset: [-22, -54],
        hasBalloon: false,
        hasHint: false,
      }
    : {
        iconLayout: "default#image",
        iconImageHref: PIN,
        iconImageSize: [36, 46],
        iconImageOffset: [-18, -44],
        hasBalloon: false,
        hasHint: false,
      };
}

function CourtCard({ court, className }: { court: Court; className?: string }) {
  const { courtCta } = site.courts;

  return (
    <motion.article
      layout
      className={clsx(
        "flex w-full max-w-[26rem] flex-col rounded-[20px] border-[1.5px] border-ball bg-ink p-6 text-line md:p-7",
        className,
      )}
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.98, opacity: 0 }}
      transition={{ duration: 0.35, ease: motionEase }}
    >
      <h3 className="text-h3 text-ball">{court.name}</h3>
      <p className="mt-3 text-body text-line/85">
        м. {court.metro} · {court.surface} · {court.venue}
      </p>
      <div className="mt-6">
        <Button
          href={`/?court=${court.id}#signup`}
          variant="accent"
          className="h-14 w-full"
        >
          {courtCta.label}
        </Button>
      </div>
    </motion.article>
  );
}

function CourtChips({
  items,
  selectedId,
  onSelect,
}: {
  items: readonly Court[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Stagger className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {items.map((court) => {
        const active = court.id === selectedId;
        return (
          <StaggerItem key={court.id} className="shrink-0">
            <button
              type="button"
              onClick={() => onSelect(court.id)}
              className={clsx(
                "relative shrink-0 rounded-full px-4 py-2 text-[15px] font-semibold uppercase tracking-[0.04em] transition-colors duration-150",
                active
                  ? "text-ink"
                  : "bg-transparent text-line shadow-[0_0_0_1.5px_rgba(255,255,255,0.7)] hover:bg-line hover:text-ink",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="court-chip"
                  className="absolute inset-0 rounded-full bg-ball"
                  transition={{ duration: 0.35, ease: motionEase }}
                />
              ) : null}
              <span className="relative z-10">{court.name}</span>
            </button>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export function CourtsMap() {
  const { items, map } = site.courts;
  const containerRef = useRef<HTMLDivElement>(null);
  const marksRef = useRef<Map<string, YMapsPlacemark>>(new Map());
  const selectedRef = useRef<string>(items[0].id);
  const [selectedId, setSelectedId] = useState<string>(items[0].id);
  const [mode, setMode] = useState<"loading" | "map" | "widget">(
    HAS_API_KEY ? "loading" : "widget",
  );
  selectedRef.current = selectedId;

  const selected = useMemo(
    () => items.find((item) => item.id === selectedId) ?? items[0],
    [items, selectedId],
  );

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("court");
    if (fromUrl && items.some((item) => item.id === fromUrl)) {
      setSelectedId(fromUrl);
    }
  }, [items]);

  useEffect(() => {
    if (!HAS_API_KEY) return;
    const node = containerRef.current;
    if (!node) return;

    let cancelled = false;
    let mapInstance: { destroy: () => void } | null = null;

    loadYmaps()
      .then((ymaps) => {
        if (cancelled || !containerRef.current) return;

        const instance = new ymaps.Map(
          containerRef.current,
          {
            center: [...map.center],
            zoom: map.zoom,
            controls: ["zoomControl"],
          },
          {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          },
        );
        instance.behaviors.disable("scrollZoom");
        mapInstance = instance;

        const marks = new Map<string, YMapsPlacemark>();
        items.forEach((court) => {
          const placemark = new ymaps.Placemark(
            [...court.coords],
            { hintContent: court.name },
            pinOptions(court.id === selectedRef.current),
          );
          placemark.events.add("click", () => setSelectedId(court.id));
          instance.geoObjects.add(placemark);
          marks.set(court.id, placemark);
        });
        marksRef.current = marks;
        setMode("map");
      })
      .catch(() => {
        if (!cancelled) setMode("widget");
      });

    return () => {
      cancelled = true;
      mapInstance?.destroy();
      marksRef.current = new Map();
    };
  }, [items, map.center, map.zoom]);

  useEffect(() => {
    marksRef.current.forEach((placemark, id) => {
      const options = pinOptions(id === selectedId);
      placemark.options.set("iconImageHref", options.iconImageHref);
      placemark.options.set("iconImageSize", options.iconImageSize);
      placemark.options.set("iconImageOffset", options.iconImageOffset);
    });
  }, [selectedId]);

  const widgetSrc = yandexWidgetUrl(items, map.center, map.zoom);
  const showChips = mode !== "map";

  return (
    <div className="flex flex-col gap-5">
      {showChips ? (
        <CourtChips
          items={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ) : null}

      <div className="relative h-[min(70svh,42rem)] min-h-[22rem] overflow-hidden rounded-[28px] border-[1.5px] border-ball/60 bg-ink">
        {HAS_API_KEY ? (
          <div
            ref={containerRef}
            className={clsx(
              "absolute inset-0 h-full w-full",
              mode === "widget" && "hidden",
            )}
          />
        ) : null}
        {mode === "widget" ? (
          <iframe
            title="Карта кортов в Москве"
            src={widgetSrc}
            className="absolute inset-0 h-full w-full border-0"
            allow="geolocation"
            loading="lazy"
          />
        ) : null}
        {mode === "loading" ? (
          <p className="absolute inset-0 flex items-center justify-center text-lead text-line/70">
            Загружаем карту Москвы…
          </p>
        ) : null}
        <div className="pointer-events-none absolute inset-0 hidden p-5 md:p-6 lg:flex lg:items-start lg:justify-start">
          <div className="pointer-events-auto">
            <AnimatePresence mode="wait">
              <CourtCard key={selected.id} court={selected} />
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          <CourtCard key={selected.id} court={selected} className="max-w-none" />
        </AnimatePresence>
      </div>
    </div>
  );
}
