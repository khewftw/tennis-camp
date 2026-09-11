import { HeroContent } from "@/src/components/sections/HeroContent";
import { HeroMedia } from "@/src/components/sections/HeroMedia";

export function Hero() {
  return (
    <div className="relative h-dvh w-full">
      <HeroMedia />
      <HeroContent />
    </div>
  );
}
