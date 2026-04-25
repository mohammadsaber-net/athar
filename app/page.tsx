import Hero from "@/components/hero/Hero";
import Summary from "@/components/summary/Summary";
import { SummarySkeleton } from "@/components/summary/SummarySkeleton";
import { Suspense } from "react";
export default  function Home() {
  return (
    <main className="relative">
      <Hero />
      <Suspense fallback={<SummarySkeleton />}>
        <Summary />
      </Suspense>
    </main>
  );
}
