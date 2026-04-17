import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link 
    href={"/"} className="text-2xl absolute left-4 md:top-0 top-4 cursor-pointer size-14 
    flex items-center justify-center rounded-full bg-[#c9a24d] 
    font-bold text-center text-white py-4">
     أثار
    </Link>
  )
}
