import { SunnaType, WakafatType } from '@/lib/type'
import Link from 'next/link'
type Props={
    wakafat:WakafatType
}
export default function AllWakafat({wakafat}:Props) {
  return (
    <div>
      <div className='md:max-w-xl max-w-[90%] mb-5 relative z-10 mx-auto bg-white/70 shadow-lg border border-blue-100
          overflow-hidden rounded-md p-3'>
        <div className="group transition">
            <h2 className=" text-xl md:text-3xl mb-0 mt-2 text-blue-900">
                {wakafat?.aya} 
            </h2>
            
            <div className={`mt-2 h-[150px] overflow-hidden border-t md:text-xl pt-2 border-gray-200 `}>
                <div
                dangerouslySetInnerHTML={{ __html: wakafat?.tafsir||"" }} /> 
            </div>
            <span className="text-end block mt-0 text-italic text-sm text-gray-800">
                {wakafat?.ayaSource}
            </span>
              <Link
              className='text-blue-600 font-semibold'
              href={`/wakafat/${wakafat.id}`}>
             ... قراءة المزيد
              </Link>
            </div>
        </div>
    </div>
  )
}
