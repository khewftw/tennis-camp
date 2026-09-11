import { site } from "@/src/content/site";
import { Button } from "@/src/components/ui/Button";

export function HeaderActions() {
  return (
    <div className="hidden items-center justify-self-end gap-6 min-[1280px]:flex">
      <a
        href={site.contacts.phoneHref}
        className="font-sans text-[19px] leading-5 text-ball transition-colors duration-150 hover:text-line"
      >
        {site.contacts.phone}
      </a>
      <Button href="#signup">{site.cta.header}</Button>
    </div>
  );
}
