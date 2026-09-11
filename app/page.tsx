import { Camps } from "@/src/components/sections/Camps";
import { Coach } from "@/src/components/sections/Coach";
import { CookieBanner } from "@/src/components/sections/CookieBanner";
import { Courts } from "@/src/components/sections/Courts";
import { Faq } from "@/src/components/sections/Faq";
import { Footer } from "@/src/components/sections/Footer";
import { Formats } from "@/src/components/sections/Formats";
import { Gallery } from "@/src/components/sections/Gallery";
import { Header } from "@/src/components/sections/Header";
import { Hero } from "@/src/components/sections/Hero";
import { How } from "@/src/components/sections/How";
import { Marquee } from "@/src/components/sections/Marquee";
import { News } from "@/src/components/sections/News";
import { Prices } from "@/src/components/sections/Prices";
import { Progress } from "@/src/components/sections/Progress";
import { Recognize } from "@/src/components/sections/Recognize";
import { Reviews } from "@/src/components/sections/Reviews";
import { Signup } from "@/src/components/sections/Signup";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative overflow-x-clip">
        <Hero />
        <Recognize />
        <Marquee />
        <Formats />
        <How />
        <Courts />
        <Progress />
        <Camps />
        <Prices />
        <Coach />
        <Reviews />
        <Gallery />
        <News />
        <Faq />
        <Signup />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
