import Image from "next/image";

export function HeroMedia() {
  return (
    <section
      id="top"
      className="absolute inset-0 overflow-hidden bg-ink"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/hero-mobile.png"
          alt=""
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center md:hidden"
        />
        <Image
          src="/hero-pc.png"
          alt=""
          fill
          priority
          quality={95}
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
        <div className="absolute inset-0 bg-ink/55" />
      </div>
    </section>
  );
}
