import Image from "next/image";
import { site } from "@/src/content/site";

function PlayerFade() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink from-20% via-ink/85 to-transparent sm:h-52"
      aria-hidden
    />
  );
}

export function RecognizePlayer() {
  const { image } = site.recognize;

  return (
    <>
      <div className="relative mb-2 h-64 overflow-hidden sm:h-72 lg:hidden">
        <div className="absolute top-0 left-1/2 h-[200%] w-[min(100%,28rem)] -translate-x-1/2">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain object-top"
          />
        </div>
        <PlayerFade />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
        <div className="absolute top-0 left-1/2 aspect-[3/4] h-[168%] -translate-x-1/2">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="50vw"
            className="object-contain object-top"
          />
        </div>
        <PlayerFade />
      </div>
    </>
  );
}
