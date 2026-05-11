import { NamesType } from '@/lib/type'
import Link from 'next/link'
import FormatingText from '../animation/FormatingText'
type Props={
    searchedName:NamesType
}
export default function AllNames({ searchedName }: Props) {
  return (
    <div className="group relative w-40 md:w-56 snap-center shrink-0 bg-white dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {searchedName?.image && (
        <img
          className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20 grayscale pointer-events-none"
          src={searchedName.image}
          alt=""
        />
      )}
      <div className="relative z-10 aspect-square mb-3 overflow-hidden rounded-xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-500/5 flex flex-col items-center justify-center p-3 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 dark:text-indigo-300 drop-shadow-sm font-amiri">
          {searchedName?.name}
        </h2>
      </div>
      <div className="mb-2 relative z-10 text-left">
        <span className="text-[10px] md:text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md italic">
          {searchedName?.meaningSource || "المصدر"}
        </span>
      </div>
      <div className="h-16 md:h-20 overflow-hidden text-[11px] md:text-sm text-zinc-500 dark:text-zinc-400 leading-snug mb-3 relative z-10">
        <FormatingText text={searchedName.meaning.slice(0, 80) + "..."} />
      </div>

      <Link
        href={`/name/${searchedName.id}`}
        className="block relative z-10 text-center py-2 text-xs md:text-sm font-bold bg-indigo-50 dark:bg-zinc-800 text-indigo-700
        active:bg-indigo-700 active:text-white
        dark:text-indigo-300 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
      >
        تأمل الاسم
      </Link>
    </div>
  );
}
