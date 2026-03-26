import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Names from "@/components/namesShow/Names";
import Sunna from "@/components/sunnaShow/Sunnan";
import Wakafat from "@/components/wakafatShow/Wakafat";

export default async function Home() {
  return (
    <main className="relative">
      <Hero />
      <Wakafat/>
      <Names/>
      <Sunna />
      <Footer />
    </main>
  );
}
