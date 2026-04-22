import { SunnaType, WakafatType } from '@/lib/type'
import Link from 'next/link'
import { FaQuran } from 'react-icons/fa'
type Props={
    wakafat:WakafatType
}
export default function AllWakafat({wakafat}:Props) {
  return (
    <div className='bg-white/70 w-fit flex-shrink-0 shadow-lg border border-[#c9a24d] rounded-md p-2'>
            <div className='max-w-xs relative mb-2 overflow-hidden m-auto w-28 md:w-40 h-28 md:h-40 
                 border border-[#c9a24d] 
                rounded-lg shadow-lg flex items-center justify-center
                text-center p-2'>
              <div className='absolute z-20 inset-0 opacity-60 bg-[url("/pattern.png")] bg-cover'></div>
              <p className='text-xs md:text-sm text-[#1a3636] leading-relaxed'>
                {wakafat?.aya}
              </p>
              </div>
            <h2 className="italic text-center md:text-xl mb-0 text-blue-900">
                {wakafat?.aya.slice(0,30)}... 
            </h2>
            
            <div className={`mt-1 flex max-h-[80px] overflow-hidden border-t md:text-xl pt-1 border-[#c9a24d]`}>
               <span className='text-[#1a3636]'> الشرح :</span>
                <div
                dangerouslySetInnerHTML={{ __html: wakafat?.tafsir.slice(0,20)||"" }} />
          </div> 
          <Link
          className='text-green-700 text-sm md:text-base active:text-red-600'
          href={`/wakafat/${wakafat.id}`}>
           قراءة المزيد
          </Link>
          </div>
  )
}
