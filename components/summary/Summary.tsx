import { NamesType, SunnaType, WakafatType } from "@/lib/type";
import Name from "../namesShow/Name";
import Link from "next/link";
import Aya from "../wakafatShow/Aya";
import Sunna from "../sunnaShow/Sunna";
import { isAdmin } from "@/lib/isAdmin";
import AllNames from "../namesShow/AllNames";
import AllWakafat from "../wakafatShow/AllWakafat";
import AllSunna from "../sunnaShow/AllSunna";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

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
            <div className="w-full overflow-x-auto">
            <div className="w-xl md:w-full m-auto flex gap-4 items-center justify-center mb-4">
                {data?.name?.map((searchedName:NamesType)=>(
                    <AllNames key={searchedName.id} searchedName={searchedName}/>
                )) } 
                <div className='whitespace-nowrap flex items-center justify-center 
                 max-w-sm h-70 p-2'>
                <Link
                  className='text-[#1a3636] active:text-green-600 font-semibold inline'
                  href={`/name}`}>
                عرض المزيد من <br /> أسماء الله الحسني <br /> <ArrowBigLeft className="m-auto"/>
                </Link>
                </div>
            </div>
            </div>
            <div className="w-full overflow-x-auto">
            <div className="w-xl md:w-full m-auto flex gap-4 items-center justify-center mb-4">
                {data?.wakafat?.map((aya:WakafatType)=>(
                    <AllWakafat key={aya.id} wakafat={aya}/>
                )) }
                <div className='  flex items-center justify-center 
                 max-w-sm h-70 p-2'>
                <Link
                  className='text-[#1a3636] active:text-green-600 font-semibold inline'
                  href={`/wakafat}`}>
                عرض المزيد من <br /> الوقفات القرآنية<br /> <ArrowBigLeft className="m-auto"/>
                </Link>
                </div>
                </div>
            </div>
            <div className="w-full overflow-x-auto">
            <div className="w-xl md:w-full m-auto flex gap-4 items-center justify-center mb-4">
                {data?.sunna?.map((hadith:SunnaType)=>(
                    <AllSunna key={hadith.id} sunna={hadith}/>
                )) }
                <div className='  flex items-center justify-center 
                 max-w-sm h-70 p-2'>
                <Link
                  className='text-[#1a3636] active:text-green-600 font-semibold inline'
                  href={`/sunna}`}>
                عرض المزيد من <br /> السنن المهجورة<br /> <ArrowBigLeft className="m-auto"/>
                </Link>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
