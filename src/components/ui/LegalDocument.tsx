import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/content/site";
import { Container } from "@/src/components/ui/Container";

type DocKey = "privacy" | "consent" | "offer";

export function legalMetadata(key: DocKey): Metadata {
  return {
    title: `${site[key].title} — ${site.brand.name}`,
  };
}

export function LegalDocument({ doc }: { doc: DocKey }) {
  const { title, body } = site[doc];

  return (
    <main className="min-h-dvh bg-chalk py-20 text-ink">
      <Container>
        <p className="text-small">
          <Link href="/" className="underline underline-offset-2">
            На главную
          </Link>
        </p>
        <h1 className="mt-8 max-w-[18ch] text-h2">{title}</h1>
        <div className="mt-8 flex max-w-[60ch] flex-col gap-5 text-body text-ink/80">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </main>
  );
}
