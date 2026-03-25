"use client"
import { HeroType } from "@/lib/type";
import MainNav from "../header/MainNav";
import { useEffect, useMemo, useState } from "react";
import { Moon, Star } from "lucide-react";
export default function Hero() {
  const [tableData, setTableData] = useState<HeroType|null>(null)
  const fetchData=async()=>{
      try {
        const res=await fetch("/api/hero")
        const data=await res.json()
        if(data.success){
          setTableData(data.data[Math.floor(Math.random()*data.data.length)])
        }
      } catch (error) {
      }
    }
    useEffect(()=>{
      fetchData()
    },[])
  const itemsBtn=[
    {name:"وقفات قرآنية", href:"/#Wakafat"},
    {name:"أسماء الله الحسنى", href:"/#Names"},
    {name:"سنن مهجورة", href:"/#Sunna"}
  ]
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 20 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 4,
      size: Math.random() * 10 + 10,
    }));

    setStars(generatedStars);
  }, []);
  return (
    <section className="relative min-h-[90vh] bg-[#0f3d2e]/20 px-4 text-center pt-2 text-gray-900">
        <MainNav />
        {stars.map((star, i) => (
        <Star
          key={i}
          size={star.size}
          className="absolute text-[#c9a24d] opacity-0 animate-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      <div className="relative z-10 md:w-fit w-[90%] m-auto space-y-8">
        <div className="mt-16 pt-10 md:pt-4">
          <p className="mb-2 text-xl max-w-2xl leading-relaxed md:text-3xl">
            ﴿ {tableData?.aya || "الآية"} ﴾
          </p>
          <span className="text-sm block text-left italic text-blue-900">
           {tableData?.ayaSource || "مصدر الآية"}
          </span>
        </div>
        <div className="rounded-xl bg-white/60 max-w-2xl px-6 py-4 backdrop-blur">
          <p className="text-lg">
            « {tableData?.hadith || "الحديث"} »
          </p>
          <p className="text-sm text-blue-900 text-left italic">{tableData?.hadithSource || "مصدر الحديث"}</p>
        </div>
        <div className="overflow-hidden md:w-fit m-auto w-[90%] whitespace-nowrap">
          <div className="inline-flex animate-marquee gap-8">
            {itemsBtn.map((item,index) => (
                <a
                key={index}
                href={item.href}
                className="mx-2 rounded-full border border-blue-600
                px-6 py-3 transition text-blue-600
                hover:bg-white hover:border-[#0f3d2e] hover:text-[#0f3d2e]"
                >
                  {item.name}
                </a>
            ))}
          </div>
        </div>
    </div>
    </section>
  );
}