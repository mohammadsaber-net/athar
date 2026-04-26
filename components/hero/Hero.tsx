"use client"
import { HeroType } from "@/lib/type";
import { useEffect, useState } from "react";
import {  Star } from "lucide-react";
import Link from "next/link";
import SharePopup from "../shareButton/ShareButton";
import SearchInput from "../search/SearchInput";
export default function Hero() {
  const [tableData, setTableData] = useState<any|null>(null)
  const fetchData=async()=>{
      try {
        const res=await fetch("/api/hero")
        const data=await res.json()
        if(data.success){
          setTableData(data.data)
        }
      } catch (error) {
      }
    }
    useEffect(()=>{
      fetchData()
    },[])
  const itemsBtn=[
    {name:"وقفات قرآنية", href:"/wakafat"},
    {name:"أسماء الله الحسنى", href:"/name"},
    {name:"سنن مهجورة", href:"/sunna"}
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
    <>
    <section className="relative px-4 text-center pt-2 text-gray-900">
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-mobile.png" />
          <img 
            loading="lazy"
            src="/hero-desktop.jpg"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </picture>
         {stars.map((star, i) => (
        <Star
          key={i}
          size={star.size}
          className="absolute text-[#c9a24d] animate-star pointer-events-none z-0"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      <div className="relative z-20 m-auto space-y-8">
        {tableData?
        <>
        <div className="bg-white/30 max-w-xl mt-6 p-2 mx-auto md:p-3 mb-4 rounded-2xl text-center shadow-lg border border-white/80">
          <h2 className="text-white text-lg font-bold leading-relaxed">
            ﴿ {tableData?.wakfa?.aya || "الآية"} ﴾
          </h2>
          <span className="text-sm block text-left italic text-white">
           {tableData?.wakfa?.ayaSource || "مصدر الآية"}
          </span>
          <div className="flex justify-between items-center mt-2">
            <SharePopup text={`« ${tableData?.wakfa?.aya || "الآية"} »\n${tableData?.wakfa?.ayaSource || "مصدر الآية"}`}/>
            <Link 
            className="bg-[#0f3d2e] relative overflow-hidden shine-btn text-white px-4 py-1 rounded-full text-xs active:scale-105 transition"
            href={`/wakafat/${tableData?.wakfa?.id}`}>
                اقرأ المزيد
            </Link>
          </div>
        </div>
        <div className="bg-white/30 max-w-xl p-2 mx-auto md:p-3 rounded-2xl text-center shadow-lg border border-white/80">
          <h2 className="text-white text-lg font-bold leading-relaxed">
            « {tableData?.hadith?.sunna || "الحديث"} »
          </h2>
          <span className="text-sm block text-left italic text-white">
           {tableData?.hadith?.sunnaSource || "مصدر الحديث"}
          </span>
          <div className="flex justify-between items-center mt-2">
            <SharePopup text={`« ${tableData?.hadith?.sunna || "الحديث"} »\n${tableData?.hadith?.sunnaSource || "مصدر الحديث"}`}/>
            <Link 
            className="bg-[#0f3d2e] relative overflow-hidden shine-btn text-white px-4 py-1 rounded-full text-xs active:scale-105 transition"
            href={`/sunna/${tableData?.hadith?.id}`}>
                اقرأ المزيد
            </Link>
          </div>
        </div>
        </>:
        <>
        <p className="h-20 animate-pulse mx-auto rounded pt-4 bg-white/40 max-w-2xl" />
        <p className="animate-pulse h-20 mx-auto rounded py-4 bg-white/40 max-w-2xl" />
        </>
        }
        <div className="overflow-hidden md:w-fit pb-16 m-auto w-[90%] whitespace-nowrap">
          <div className="inline-flex animate-marquee gap-8">
            {itemsBtn.map((item,index) => (
                <Link
                key={index}
                href={item.href}
                className="mx-2 rounded-full border border-white
                px-6 py-3 transition text-white
                hover:bg-white hover:border-[#0f3d2e] hover:text-[#0f3d2e]"
                >
                  {item.name}
                </Link>
            ))}
          </div>
        </div>
    </div>
    </section>
    <div className="relative -mt-14 md:-mt-8 z-30">
      <SearchInput />
    </div>
    </>
  );
}