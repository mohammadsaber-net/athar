import { NamesType, SunnaType, WakafatType } from "@/lib/type";
import Name from "../namesShow/Name";
import Link from "next/link";
import Aya from "../wakafatShow/Aya";
import Sunna from "../sunnaShow/Sunna";
import { isAdmin } from "@/lib/isAdmin";
import AllNames from "../namesShow/AllNames";
import AllWakafat from "../wakafatShow/AllWakafat";
import AllSunna from "../sunnaShow/AllSunna";

export default async function Summary() {
    const admin = await isAdmin()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/summary`, {
    method: "GET",
    cache: "no-store",
  });
  const {data} = await res.json();
  return (
    <div className="min-h-screen bg-[#f9f8f3] pt-10">
      <div className="max-w-6xl pb-10 px-6">
        <h1 className="text-2xl md:text-4xl pt-4 mb-3 font-bold ">
            عرض ملخص لبعض ما تجدونه في هذا الموقع بإذن الله تعالي
        </h1>
        <p className="max-w-2xl text-lg">
            يمكنكم تصفح المزيد والمشاركة بتعليقاتكم وملاحظاتكم في كل قسم من أقسام الموقع, <span className="text-cyan-600 font-bold">فكل ما هو موجود في هذا الموقع هو من أجل الإفادة العامة,</span>
            لذلك لا تبخلوا علينا بملاحظاتكم وتعليقاتكم,
        </p>
        <div className="pb-5 pt-2 border-t-2 border-zinc-300">
            <div >
                {data?.name?.map((searchedName:NamesType)=>(
                    <AllNames key={searchedName.id} searchedName={searchedName}/>
                )) }
                <Link className="font-semibold md:text-lg text-cyan-800 hover:text-cyan-900" href={"/name"}>
                     عرض المزيد من الأسماء الحسني
                </Link>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-400">
                {data?.wakafat?.map((aya:WakafatType)=>(
                    <AllWakafat key={aya.id} wakafat={aya}/>
                )) }
                <Link className="font-semibold md:text-lg text-cyan-800 hover:text-cyan-900" href={"/name"}>
                     عرض المزيد من الوقفات القرآنية
                </Link>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-400">
                {data?.sunna?.map((hadith:SunnaType)=>(
                    <AllSunna key={hadith.id} sunna={hadith}/>
                )) }
                <Link className="font-semibold md:text-lg text-cyan-800 hover:text-cyan-900" href={"/name"}>
                     عرض المزيد من سنن مهجورة
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}
