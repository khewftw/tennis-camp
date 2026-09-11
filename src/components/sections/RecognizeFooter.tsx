import { site } from "@/src/content/site";

export function RecognizeFooter() {
  return (
    <p className="mx-auto mt-12 max-w-[28ch] text-center text-lead text-ball lg:mt-16">
      {site.recognize.footer}
    </p>
  );
}
