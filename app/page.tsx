import Hero from "@/components/hero/Hero";
import Names from "@/components/names/Names";
import Sunna from "@/components/sunna/Sunna";
import Wakafat from "@/components/wakafat/Wakafat";

export default async function Home() {
  return (
    <main className="relative">
      <Hero />
      <Wakafat/>
      <Names/>
      <Sunna />
    </main>
  );
}
