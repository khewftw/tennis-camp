import clsx from "clsx";
import { Button } from "@/src/components/ui/Button";

export function Card({
  title,
  problem,
  solution,
  cta,
  className,
}: {
  title: string;
  problem: string;
  solution: string;
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <article
      className={clsx(
        "group flex h-full flex-col rounded-[20px] border-[1.5px] border-ball/60 bg-transparent p-6 transition-colors duration-150 md:p-8 lg:min-h-[280px] lg:p-10 [@media(hover:hover)]:hover:border-ball [@media(hover:hover)]:hover:bg-ball",
        className,
      )}
    >
      <h3 className="text-h3 text-ball transition-colors duration-150 [@media(hover:hover)]:group-hover:text-ink">
        {title}
      </h3>
      <p className="mt-3 max-w-[60ch] text-body text-line/80 transition-colors duration-150 [@media(hover:hover)]:group-hover:text-ink/75">
        {problem}
      </p>
      <p className="mt-4 max-w-[60ch] text-body font-medium text-ball transition-colors duration-150 [@media(hover:hover)]:group-hover:text-ink">
        {solution}
      </p>
      {cta ? (
        <div className="mt-auto pt-8">
          <Button
            href={cta.href}
            className="h-14 self-start px-7 text-[15px] [@media(hover:hover)]:group-hover:bg-ink [@media(hover:hover)]:group-hover:text-ball [@media(hover:hover)]:group-hover:shadow-[0_0_0_1.5px_#e3f339]"
          >
            {cta.label}
          </Button>
        </div>
      ) : null}
    </article>
  );
}
