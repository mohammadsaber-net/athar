import { WakafatType } from "@/lib/type";
import { Star } from "lucide-react";
import Link from "next/link";
type Props={
    aya:WakafatType
}
export default function WakafatContent({aya}:Props) {
  return (
      <div className="bg-white p-2 rounded-md shadow">
        <div className="flex justify-center mb-2 
        items-center text-xl md:text-2xl gap-2">
            <Star 
            className="fill-[#22c55e] stroke-none"
            /><Star 
            className="fill-[#22c55e] stroke-none"
            /><Star 
            className="fill-[#22c55e] stroke-none"
            />
        </div>
        <div className="group transition">
            <h2 className="text-gray-900 mb-0 group-hover:text-blue-700">
               " {aya.aya} "
            </h2>
            <span className="text-end block mt-0 text-italic text-sm text-gray-800">
                {aya.ayaSource}
            </span>
            <div className="mt-2 border-t pt-2 border-gray-200">
                {aya.tafsir.slice(0,150)} ..... 
                <Link
                href={`/aya/${aya.id}`}
                className="text-blue-600 transition hover:text-blue-800
                ">عرض المزيد</Link>
            </div>
        </div>
      </div>
  )
}
