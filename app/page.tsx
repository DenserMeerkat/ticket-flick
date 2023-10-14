import Section from "@/components/Home/Section/Section";
import HeroCarousel from "@/components/Home/HeroCarousel";
import AppBar from "@/components/AppBar/AppBar";

export default function Home() {
  return (
    <main>
      <AppBar showSearch={true} actions="login" />
      <div className="min-h-screen h-fit w-full">
        <HeroCarousel />
        <Section title={"Recommended"} />
        <Section title={"Action"} />
        <Section title={"Adventure"} />
        <Section title={"Horror"} />
        <Section title={"Romance"} />
      </div>
    </main>
  );
}
