import { SunnaType } from '@/lib/type'
import Link from 'next/link'
type Props={
    sunna:SunnaType
}
export default function AllSunna({sunna}:Props) {
  return (
    <div className='bg-white/70 w-fit flex-shrink-0 shadow-lg border border-[#c9a24d] rounded-md p-1 md:p-2'>
            <div className='max-w-xs relative mb-2 overflow-hidden m-auto w-28 md:w-40 h-32 md:h-40  
                 border border-[#1a3636] 
                rounded-lg shadow-lg flex items-center justify-center
                text-center p-1 md:p-2'>
              <div className='absolute z-20 inset-0 opacity-20 bg-[url("/pattern1.png")] bg-cover'></div>
              <p className='text-xs md:text-sm text-black leading-relaxed'>
                {sunna?.sunna}
              </p>
              </div>
            {/* <h2 className="italic text-center md:text-xl mb-0 text-cyan-800">
                {sunna?.sunna.slice(0,20)}... 
            </h2> */}
            
            <div className={`mt-1 h-22 w-28 md:w-40 overflow-hidden border-t md:text-xl pt-1 border-[#c9a24d]`}>
                <div
                dangerouslySetInnerHTML={{ __html: sunna?.tafsir||""}} 
                />
          </div>  
          <Link
          className='text-green-700 text-sm md:text-base active:text-red-600'
          href={`/sunna/${sunna.id}`}>
           قراءة المزيد
          </Link>
          </div>
  )
}
