import Hero from "@/components/landing-page/sections/Hero";
import SpecialMeals from "@/components/landing-page/sections/SpecialMeals";
import Subscribe from "@/components/landing-page/sections/Subscribe";

export default function Home() {
  return (
    <div className="bg-(--primary)">
        <Hero />
        <SpecialMeals />
        <Subscribe />
    </div>
  );
}
