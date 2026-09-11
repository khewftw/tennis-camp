import { site } from "@/src/content/site";
import { Container } from "@/src/components/ui/Container";

export function Footer() {
  const { brand, tagline, entity, inn, ogrnip, address, documents } = site.footer;
  const { phone, phoneHref, email, emailHref, telegramHref, vkHref } = site.contacts;

  return (
    <footer className="bg-ink pb-28 pt-16 text-line md:py-24">
      <Container>
        <p className="font-display text-[clamp(2rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em] text-ball">
          {brand}
        </p>
        <p className="mt-6 max-w-[36ch] text-lead text-line/80">{tagline}</p>
        <div className="mt-8 flex flex-col gap-3 text-body sm:flex-row sm:flex-wrap sm:gap-x-6">
          <a href={phoneHref} className="hover:text-ball">
            {phone}
          </a>
          <a href={emailHref} className="hover:text-ball">
            {email}
          </a>
          <a href={telegramHref} className="hover:text-ball">
            Telegram
          </a>
          <a href={vkHref} className="hover:text-ball">
            VK
          </a>
        </div>

        <div className="mt-12 grid gap-8 border-t border-line/15 pt-8 lg:grid-cols-2">
          <div className="text-small text-line/70">
            <p>{entity}</p>
            <p className="mt-1">ИНН {inn}</p>
            <p className="mt-1">ОГРНИП {ogrnip}</p>
            <p className="mt-1">{address}</p>
          </div>
          <nav className="flex flex-col gap-2 text-small" aria-label="Документы">
            {documents.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                className="text-line/70 underline underline-offset-2 hover:text-ball"
              >
                {doc.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
