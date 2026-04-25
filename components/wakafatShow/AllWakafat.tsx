import { WakafatType } from '@/lib/type'
import Link from 'next/link'
type Props={
    wakafat:WakafatType
}
export default function AllWakafat({wakafat}:Props) {
  return (
    <div className='bg-white/70 relative flex-shrink-0 shadow-lg 
    m-auto w-34 md:w-48 border border-[#c9a24d] rounded-md p-2'>
            <div className='max-w-xs relative mb-2 overflow-hidden m-auto w-28 md:w-40 h-32 md:h-40 
                 border border-[#c9a24d] 
                rounded-lg shadow-lg flex items-center justify-center
                text-center p-1 md:p-2'>
              <div className='absolute z-20 inset-0 opacity-60 bg-[url("/pattern.png")] bg-cover'></div>
              <p className='text-xs md:text-sm text-[#1a3636] leading-relaxed'>
                {wakafat?.aya}
              </p>
              </div>
            <span className='text-gray-700 text-sm'>
              {wakafat?.ayaSource}
            </span>
            
            <div className={`mt-1 h-22 w-28 md:w-40 overflow-hidden border-t md:text-xl pt-1 border-[#c9a24d]`}>
                <div
                dangerouslySetInnerHTML={{ __html: wakafat?.tafsir}} 
                />
          </div> 
          <Link
          className='text-green-700 text-sm md:text-base active:text-red-600'
          href={`/wakafat/${wakafat.id}`}>
           قراءة المزيد
          </Link>
          </div>
  )
}
