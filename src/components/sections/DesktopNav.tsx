import { site } from "@/src/content/site";

export function DesktopNav() {
  return (
    <nav
      className="hidden items-center justify-center gap-[70px] min-[1280px]:flex"
      aria-label="Основная навигация"
    >
      {site.nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="font-sans text-[19px] leading-5 text-line transition-colors duration-150 hover:text-ball"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
