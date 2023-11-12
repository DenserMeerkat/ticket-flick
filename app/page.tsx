import Section from "@/components/Home/Section/Section";
import HeroCarousel from "@/components/Home/HeroCarousel";
import AppBar from "@/components/AppBar/AppBar";
import AddMovie from "@/components/Home/Section/AddMovie";

export default function Home() {
  return (
    <main>
      <AppBar showSearch={true} actions="login" />
      <div className="min-h-screen h-fit w-full">
        <HeroCarousel />
        <AddMovie />
        <Section title={"Action"} genre={"Action"} />
        <Section title={"Adventure"} genre={"Adventure"} />
        {/* <Section title={"Comedy"} genre={"Comedy"} />
        <Section title={"Drama"} genre={"Drama"} /> 
        <Section title={"Mystery"} genre={"Mystery"} />*/}
        <Section title={"Sci-Fi"} genre={"Sci-Fi"} />
        <Section title={"Thriller"} genre={"Thriller"} />
      </div>
    </main>
  );
}
