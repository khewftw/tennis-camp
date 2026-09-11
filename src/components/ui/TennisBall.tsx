import clsx from "clsx";

export function TennisBall({
  variant = "outline",
  className,
}: {
  variant?: "outline" | "filled";
  className?: string;
}) {
  if (variant === "filled") {
    return (
      <svg
        viewBox="0 0 32 32"
        className={clsx("h-7 w-7", className)}
        aria-hidden
      >
        <circle cx="16" cy="16" r="14" fill="currentColor" />
        <path
          d="M6 8c6 5 14 5 20 0"
          stroke="#000"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M6 24c6-5 14-5 20 0"
          stroke="#000"
          strokeWidth="1.6"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      className={clsx("h-8 w-8 shrink-0", className)}
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
