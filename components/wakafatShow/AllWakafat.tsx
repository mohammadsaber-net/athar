import { WakafatType } from '@/lib/type'
import Link from 'next/link'
import FormatingText from '../animation/FormatingText'
type Props={
    wakafat:WakafatType
}
export default function AllWakafat({ wakafat }: Props) {
  return (
    <div className="group relative w-40 md:w-56 bg-white dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square mb-3 overflow-hidden rounded-xl border border-amber-100 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-500/5 flex items-center justify-center p-3 text-center">
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-[url('/pattern.png')] bg-repeat bg-[size:60px]"></div>
        <p className="relative z-10 text-xs md:text-sm font-medium text-zinc-800 dark:text-zinc-100 leading-relaxed line-clamp-4">
          {wakafat?.aya}
        </p>
      </div>
      <div className="mb-2">
        <span className="text-[10px] md:text-xs font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">
          {wakafat?.ayaSource}
        </span>
      </div>
      <div className="h-16 md:h-20 overflow-hidden text-[11px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-snug mb-3">
        <FormatingText text={wakafat?.tafsir.slice(0, 70) + "..."} />
      </div>

      <Link
        href={`/wakafat/${wakafat?.shortId}`}
        className="block text-center py-2 text-xs md:text-sm font-bold bg-zinc-100 
        active:bg-cyan-600 active:text-white
        dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-600 transition-colors"
      >
        تفاصيل أكثر
      </Link>
    </div>
  );
}