import type { Metadata } from "next";
import { bounded, productSans } from "@/src/lib/fonts";
import { site } from "@/src/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${bounded.variable} ${productSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-line">{children}</body>
    </html>
  );
}
