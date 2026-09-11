import { site } from "@/src/content/site";

export function Logo() {
  return (
    <a href="#top" className="flex shrink-0 items-center" aria-label={site.brand.name}>
      <span
        className="block h-12 w-[76px] bg-ball md:h-[80px] md:w-[125px]"
        style={{
          WebkitMaskImage: "url(/logo.svg)",
          maskImage: "url(/logo.svg)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "left center",
          maskPosition: "left center",
        }}
      />
    </a>
  );
}
