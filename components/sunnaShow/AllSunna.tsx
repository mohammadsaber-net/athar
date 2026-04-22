import { SunnaType } from '@/lib/type'
import Link from 'next/link'
type Props={
    sunna:SunnaType
}
export default function AllSunna({sunna}:Props) {
  return (
    <div className='bg-white/70 w-fit flex-shrink-0 shadow-lg border border-[#c9a24d] rounded-md p-2'>
            <div className='max-w-xs relative mb-2 overflow-hidden m-auto w-28 md:w-40 h-28 md:h-40 
                 border bg-[#f8f3e6] border-[#c9a24d] 
                rounded-lg shadow-lg flex items-center justify-center
                text-center p-2'>
              <p className='text-xs md:text-sm leading-relaxed'>
                {sunna?.sunna}
              </p>
              </div>
            <h2 className="italic text-center md:text-xl mb-0 text-cyan-800">
                {sunna?.sunna.slice(0,20)}... 
            </h2>
            
            <div className={`mt-1 flex max-h-[80px] overflow-hidden border-t md:text-xl pt-1 border-[#c9a24d]`}>
               <span className='text-cyan-600'> الشرح :</span>
                <div
                dangerouslySetInnerHTML={{ __html: sunna?.tafsir?.slice(0,20)||"" }} />
          </div> 
          <Link
          className='text-green-700 text-sm md:text-base active:text-red-600'
          href={`/sunna/${sunna.id}`}>
           قراءة المزيد
          </Link>
          </div>
  )
}
