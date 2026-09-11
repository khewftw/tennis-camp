import clsx from "clsx";
import { TennisBall } from "@/src/components/ui/TennisBall";

export function MarqueeTrack({
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
          <TennisBall className="text-ink" />
        </span>
      ))}
    </div>
  );
}
