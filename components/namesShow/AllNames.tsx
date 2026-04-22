import { NamesType } from '@/lib/type'
import Link from 'next/link'
import React from 'react'
type Props={
    searchedName:NamesType
}
export default function AllNames({searchedName}:Props) {
  return (
    <div className=' bg-white/70 w-fit flex-shrink-0 shadow-lg border border-[#c9a24d] rounded-md p-2'>
            <img
            className='max-w-xs m-auto w-28 md:w-40 h-28 md:h-40'
            src={searchedName?.image || undefined}
            alt={typeof searchedName?.image === 'string' ? searchedName.image : ''}
            />
            <h2 className=" text-xl italic text-center md:text-3xl mb-0 text-blue-900">
                {searchedName?.name} 
            </h2>
            
            <div className={`mt-1 max-h-[80px] overflow-hidden border-t md:text-xl pt-1 border-[#c9a24d]`}>
                <div
                className='inline'
                dangerouslySetInnerHTML={{ __html: searchedName?.meaning }} />
                <Link
                  className='text-green-700 text-sm md:text-base active:text-red-600 inline'
                  href={`/name/${searchedName.id}`}>
                قراءة المزيد
                </Link>
          </div> 
          </div>
  )
}
