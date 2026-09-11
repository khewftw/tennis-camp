import clsx from "clsx";
import { ChalkStroke } from "@/src/components/ui/ChalkStroke";

export function SectionHeading({
  caption,
  title,
  lead,
  stroke = "underline",
  captionStroke = false,
  align = "left",
  tone = "dark",
  titleClassName,
}: {
  caption?: string;
  title: string;
  lead?: string;
  stroke?: "underline" | "none";
  captionStroke?: boolean;
  align?: "left" | "center";
  tone?: "dark" | "light";
  titleClassName?: string;
}) {
  const light = tone === "light";

  return (
    <div
      className={clsx(
        "flex w-full min-w-0 flex-col gap-5",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
      )}
    >
      {caption ? (
        captionStroke ? (
          <p
            className={clsx(
              "relative inline-flex items-center justify-center px-9 py-4 text-[15px] font-medium",
              light ? "text-ink" : "text-ball",
            )}
          >
            <ChalkStroke
              variant="circle"
              color={light ? "ink" : "ball"}
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
            <span className="relative">{caption}</span>
          </p>
        ) : (
          <p
            className={clsx(
              "text-[15px] font-medium",
              light ? "text-ink" : "text-ball",
            )}
          >
            {caption}
          </p>
        )
      ) : null}

      <h2
        className={clsx(
          "w-full min-w-0 text-h2",
          light ? "text-ink" : "text-ball",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {lead ? (
        <p
          className={clsx(
            "max-w-[60ch] text-lead",
            light ? "text-ink/70" : "text-line/80",
          )}
        >
          {lead}
        </p>
      ) : null}

      {stroke === "underline" ? (
        <ChalkStroke
          variant="underline"
          color={light ? "ink" : "ball"}
          className="-mt-1 h-9 w-full md:h-12"
        />
      ) : null}
    </div>
  );
}
