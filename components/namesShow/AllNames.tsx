import { NamesType } from '@/lib/type'
import Link from 'next/link'
type Props={
    searchedName:NamesType
}
export default function AllNames({searchedName}:Props) {
  return (
    <div className=' bg-white/70 relative flex-shrink-0 shadow-lg 
    m-auto w-34 md:w-48 md:h-60 h-40
    border border-[#c9a24d] rounded-md p-2'>
        <img
          className='w-[100%] absolute inset-0 z-10 h-[100%] opacity-10'
          src={searchedName?.image || undefined}
          alt={typeof searchedName?.image === 'string' ? searchedName.image : ''}
        />
        <div className='relative z-30'>
          <h2 className=" text-xl italic text-center md:text-3xl mb-0 text-blue-900">
            {searchedName?.name} 
        </h2>
        <span className='text-gray-700 text-sm'>
          {searchedName?.meaningSource}
        </span>
        <div className={`mt-1 h-22 w-28 md:w-40 overflow-hidden border-t md:text-xl pt-1 border-[#c9a24d]`}>
                <div
                dangerouslySetInnerHTML={{ __html: searchedName?.meaning }} 
                />
          </div> 
            <Link
               className='text-green-700 text-sm md:text-base active:text-red-600 inline'
               href={`/name/${searchedName.id}`}>
             قراءة المزيد
        </Link>
        </div>
    </div>
  )
}
