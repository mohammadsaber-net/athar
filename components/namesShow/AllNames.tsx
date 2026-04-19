import { NamesType } from '@/lib/type'
import Link from 'next/link'
import React from 'react'
type Props={
    searchedName:NamesType
}
export default function AllNames({searchedName}:Props) {
  return (
    <div>
      <div className='md:max-w-xl max-w-[90%] mb-5 relative z-10 mx-auto bg-white/70 shadow-lg border border-blue-100
          overflow-hidden rounded-md p-3'>
        <div className="group transition">
            <div className="h-40 w-full overflow-hidden">
                <img
                  className='w-[100%] h-[100%]'
                  src={searchedName?.image || undefined}
                  alt={typeof searchedName?.image === 'string' ? searchedName.image : ''}
                />
            </div>
            <h2 className=" text-xl md:text-3xl mb-0 mt-2 text-blue-900">
                {searchedName?.name} 
            </h2>
            
            <div className={`mt-2 h-[150px] overflow-hidden border-t md:text-xl pt-2 border-gray-200 `}>
                <div
                dangerouslySetInnerHTML={{ __html: searchedName?.meaning }} /> 
            </div>
            <span className="text-end block mt-0 text-italic text-sm text-gray-800">
                {searchedName?.meaningSource}
            </span>
              <Link
              className='text-blue-600 font-semibold'
              href={`/name/${searchedName.id}`}>
             ... قراءة المزيد
              </Link>
            </div>
        </div>
    </div>
  )
}
