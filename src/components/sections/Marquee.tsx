import clsx from "clsx";
import { site } from "@/src/content/site";

function TennisBall() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8 shrink-0 text-ink"
      aria-hidden
    >
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5.5 10c6.5 4.5 14.5 4.5 21 0"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M5.5 22c6.5-4.5 14.5-4.5 21 0"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

function Track({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      className={clsx(
        "flex w-max items-center will-change-transform group-hover:[animation-play-state:paused]",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
    >
      {loop.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="flex items-center gap-8 pr-8"
          aria-hidden={index >= items.length}
        >
          <span className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-extrabold uppercase leading-none tracking-[-0.03em] whitespace-nowrap text-ink">
            {item}
          </span>
          <TennisBall />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="group pointer-events-none absolute top-[100dvh] left-0 z-[15] w-full -translate-y-1/2"
      aria-label="Форматы и покрытия"
      role="region"
    >
      <div className="absolute top-1/2 left-1/2 h-[120px] w-[220vw] origin-center -translate-x-1/2 -translate-y-1/2 -rotate-[12deg] bg-ball">
        <div className="flex h-full items-center">
          <Track items={site.marquee.top} />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 h-[120px] w-[220vw] origin-center -translate-x-1/2 -translate-y-1/2 rotate-[12deg] bg-ball">
        <div className="flex h-full items-center">
          <Track items={site.marquee.bottom} reverse />
        </div>
      </div>
    </div>
  );
}
