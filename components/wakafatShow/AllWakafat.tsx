import { WakafatType } from '@/lib/type'
import Link from 'next/link'
import FormatingText from '../animation/FormatingText'
type Props={
    wakafat:WakafatType
}
export default function AllWakafat({wakafat}:Props) {
  return (
    <div className='bg-white/70 dark:bg-[#0f142ed9] relative flex-shrink-0 shadow-lg 
    m-auto w-34 md:w-48 border border-[#c9a24d] dark:border-[#c9a24d]/50 rounded-md p-2'>
            <div className='max-w-xs relative mb-2 overflow-hidden m-auto w-28 md:w-40 h-32 md:h-40 
                 border border-[#c9a24d] dark:border-[#c9a24d]/50
                rounded-lg shadow-lg flex items-center justify-center
                text-center p-1 md:p-2'>
              <div className='absolute z-20 inset-0 opacity-40 dark:opacity-15 bg-[url("/pattern.png")] bg-cover'></div>
              <p className='text-xs md:text-sm dark:text-white text-[#1a3636] leading-relaxed'>
                {wakafat?.aya}
              </p>
              </div>
            <span className='text-gray-700 dark:text-white text-sm'>
              {wakafat?.ayaSource.slice(0,15)}...
            </span>
            
            <div className={`mt-1 h-22 w-28 md:w-40 overflow-hidden border-t md:text-xl pt-1 border-[#c9a24d]`}>
                <FormatingText text={wakafat?.tafsir.slice(0,100)}/>
          </div> 
          <Link
          className='text-green-700 dark:text-green-400 active:text-green-300
           text-sm md:text-base active:text-red-600'
          href={`/wakafat/${wakafat.id}`}>
           قراءة المزيد
          </Link>
          </div>
  )
}
