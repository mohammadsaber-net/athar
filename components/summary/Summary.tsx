import { NamesType, SunnaType, WakafatType } from "@/lib/type";
import Link from "next/link";
import AllNames from "../namesShow/AllNames";
import AllWakafat from "../wakafatShow/AllWakafat";
import AllSunna from "../sunnaShow/AllSunna";
import { ArrowBigLeft} from "lucide-react";

export default async function Summary() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/summary`, {
    method: "GET",
    cache: "no-store",
  });
  const {data} = await res.json();
  return (
    <div className="dark:bg-[#0d0d1f] transition-colors duration-300 dark:text-white bg-[#f9f8f3]">
      <div className="max-w-6xl pb-10 px-6">
        <h1 className="text-2xl md:text-4xl pt-4 mb-3 font-bold ">
            عرض ملخص لبعض ما تجدونه في هذا الموقع بإذن الله تعالي
        </h1>
        <p className="max-w-2xl text-lg">
            يمكنكم تصفح المزيد والمشاركة بتعليقاتكم وملاحظاتكم في كل قسم من أقسام الموقع , <span className="text-cyan-500 font-bold">فكل ما هو موجود في هذا الموقع هو من أجل الإفادة العامة, </span> 
            لذلك لا تبخلوا علينا بملاحظاتكم وتعليقاتكم.
        </p>
        <div 
        className="pb-5 pt-2 border-t-2 border-zinc-300">
          <div className="w-full relative z-10 border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-4">
            <div className="flex items-center justify-between px-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                <h2 className="text-xl font-bold dark:text-zinc-100">أسماء الله الحسنى</h2>
              </div>
              <Link href="/name" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                اكتشف الأسماء
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-10 px-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
              {data?.name?.map((searchedName: NamesType) => (
                <AllNames key={searchedName.id} searchedName={searchedName} />
              ))}
              <Link 
                href="/name" 
                className="snap-center shrink-0 flex flex-col items-center justify-center w-36 md:w-48 bg-indigo-50 dark:bg-indigo-500/5 border-2 border-dashed border-indigo-200 dark:border-indigo-500/20 rounded-2xl group"
              >
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <ArrowBigLeft className="text-indigo-600" size={28} />
                </div>
                  <span className="text-sm font-bold text-indigo-700 dark:text-indigo-400">شاهد المزيد</span>
                <span className="text-[10px] text-indigo-600/60 dark:text-indigo-400/50 mt-1">من أسماء الله الحسني </span>
              </Link>
            </div>
          </div>
          <div className="w-full relative z-10 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <div className="flex items-center justify-between px-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-cyan-600 rounded-full"></div>
                <h2 className="text-lg font-bold dark:text-zinc-100">وقفة مع آية</h2>
              </div>
              <Link href="/wakafat" className="text-sm text-cyan-600 dark:text-cyan-500 font-medium">عرض الكل</Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-8 px-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
              {data?.wakafat?.map((aya: WakafatType) => (
                <div key={aya.id} className="snap-center shrink-0">
                  <AllWakafat wakafat={aya} />
                </div>
              ))}
              <Link 
                href="/wakafat" 
                className="snap-center shrink-0 flex flex-col items-center justify-center w-36 md:w-48 bg-cyan-50 dark:bg-cyan-500/5 border-2 border-dashed border-cyan-200 dark:border-cyan-500/20 rounded-2xl group transition-all"
              >
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <ArrowBigLeft className="text-cyan-600" size={28} />
                </div>
                <span className="text-sm font-bold text-cyan-700 dark:text-cyan-400">شاهد المزيد</span>
                <span className="text-[10px] text-cyan-600/60 dark:text-cyan-400/50 mt-1">من الايات القرآنية</span>
              </Link>
            </div>
          </div>
                      <div className="w-full relative z-10 border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-4">
            <div className="flex items-center justify-between px-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-emerald-600 rounded-full"></div>
                <h2 className="text-xl font-bold dark:text-zinc-100">سنن مهجورة</h2>
              </div>
              <Link href="/sunna" className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                عرض الكل
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-10 px-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
              {data?.sunna?.map((hadith: SunnaType) => (
                  <AllSunna key={hadith.id} sunna={hadith} />
              ))}
              <Link 
                href="/sunna" 
                className="snap-center shrink-0 flex flex-col items-center justify-center w-36 md:w-48 bg-emerald-50 dark:bg-emerald-500/5 border-2 border-dashed border-emerald-200 dark:border-emerald-500/20 rounded-2xl group transition-all"
              >
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <ArrowBigLeft className="text-emerald-600" size={28} />
                </div>
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">شاهد المزيد</span>
                <span className="text-[10px] text-emerald-600/60 dark:text-emerald-400/50 mt-1">من السنن المهجورة</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
