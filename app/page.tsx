import Hero from "@/components/hero/Hero";
import Names from "@/components/names/Names";
import Wakafat from "@/components/wakafat/Wakafat";
import { isAdmin } from "@/lib/isAdmin";
import Link from "next/link";
export default async function Home() {
  const admin=await isAdmin()
  return (
    <main className="relative">
      <Hero />
      <Wakafat/>
      <Names/>
      {admin&&<Link
      className="absolute top-4 right-4 text-white text-3xl"
      href={"/admin"}>
        admin
      </Link>}
    </main>
  );
}
