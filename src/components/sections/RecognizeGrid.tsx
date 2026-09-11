import { site } from "@/src/content/site";
import { Card } from "@/src/components/ui/Card";
import { RecognizePlayer } from "@/src/components/sections/RecognizePlayer";

export function RecognizeGrid() {
  return (
    <div className="relative mt-6 lg:mt-1">
      <div className="relative lg:overflow-hidden lg:pb-16">
        <RecognizePlayer />

        <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-[clamp(15rem,26vw,30rem)] lg:gap-y-8">
          {site.recognize.cards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              problem={card.problem}
              solution={card.solution}
              cta={card.cta}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
