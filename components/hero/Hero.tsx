"use client"
import { HeroType } from "@/app/admin/hero/page";
import MainNav from "../header/MainNav";
import { useEffect, useState } from "react";
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
    {name:"الأذكار", href:"/#"},
    {name:"أسماء الله الحسنى", href:"/#Names"},
    {name:"سنن مهجورة", href:"/#"}
  ]
  return (
    <section className="relative min-h-[90vh] bg-[#0f3d2e] px-4 text-center pt-2 text-white">
        <MainNav />
      <div className="relative mb-4 z-10 md:w-fit w-[90%] m-auto space-y-8">
        <div className="mt-16">
          <p className="mb-2 text-3xl max-w-2xl leading-relaxed md:text-4xl">
            ﴿ {tableData?.aya || "الآية"} ﴾
          </p>
          <span className="text-sm block text-left italic text-[#c9a24d]">
           {tableData?.ayaSource || "مصدر الآية"}
          </span>
        </div>
        <div className="rounded-xl bg-white/10 max-w-2xl px-6 py-4 backdrop-blur">
          <p className="text-lg">
            « {tableData?.hadith || "الحديث"} »
          </p>
          <p className="text-sm text-[#c9a24d] text-left italic">{tableData?.hadithSource || "مصدر الحديث"}</p>
        </div>
        <div className="overflow-hidden md:w-fit m-auto w-[90%] whitespace-nowrap">
          <div className="inline-flex animate-marquee gap-8">
            {itemsBtn.map((item,index) => (
                <a
                key={index}
                href={item.href}
                className="mx-2 rounded-full border border-white/50
                px-6 py-3 transition text-[#c9a24d]
                hover:bg-white hover:text-[#0f3d2e]"
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