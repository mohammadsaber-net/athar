import { SunnaType } from '@/lib/type'
import Link from 'next/link'
import FormatingText from '../animation/FormatingText'
type Props={
    sunna:SunnaType
}
export default function AllSunna({ sunna }: Props) {
  return (
    <div className="group relative w-40 md:w-56 snap-center shrink-0 bg-white dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* منطقة الحديث - تم استخدام درجات الـ Emerald/Cyan للتمييز */}
      <div className="relative aspect-square mb-3 overflow-hidden rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-500/5 flex items-center justify-center p-3 text-center">
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-[url('/pattern1.png')] bg-repeat bg-[size:50px]"></div>
        <p className="relative z-10 text-xs md:text-sm font-medium text-zinc-800 dark:text-zinc-100 leading-relaxed line-clamp-4 font-amiri">
          {sunna?.sunna}
        </p>
      </div>

      {/* المصدر */}
      <div className="mb-2">
        <span className="text-[10px] md:text-xs font-bold text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
          {sunna?.sunnaSource.slice(0, 25) + "..." }
        </span>
      </div>
      <div className="h-16 md:h-20 overflow-hidden text-[11px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-snug mb-3">
        <FormatingText text={sunna?.tafsir?.slice(0, 80) + "..."} />
      </div>

      <Link
        href={`/sunna/${sunna?.shortId}`}
        className="block text-center py-2 text-xs md:text-sm 
        active:bg-emerald-600 active:text-white
        font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-colors"
      >
        تفاصيل السنة
      </Link>
    </div>
  );
}