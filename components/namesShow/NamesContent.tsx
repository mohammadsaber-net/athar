"use client"
import { NamesType, SunnaType} from '@/lib/type'
import { useEffect, useRef, useState } from "react";
import {  Moon} from "lucide-react";
import Name from './Name';
import Link from 'next/link';
import AllNames from './AllNames';
import SearchInput from '../search/SearchInput';
type Props={
    content:NamesType[]
}
export default function NamesContent({content}:Props) {
  const [admin,setAdmin]=useState<any>(null)
  useEffect(()=>{
    const isAdminClient = async () => {
      const res = await fetch("/api/users/isLogged", {
        method: "GET",
        credentials: "include",
        cache: "no-store"
      });
      const data = await res.json();
      if (data.user) return setAdmin(data.user);
    };
    isAdminClient()
  },[])
  return (
    <div
      className="relative py-8"
    >
        {content.map((searchedName:NamesType)=>(
          <div className="mb-10 flex gap-2 max-w-2xl border-t-2 p-2 border-gray-300" key={searchedName.id}>
            <img
              className='h-20 rounded-full w-20'
              src={searchedName?.image || undefined}
              alt={typeof searchedName?.image === 'string' ? searchedName.image : ''}
            />
            <div className=''>
            <h2 className="text-xl md:max-w-xl max-w-md text-indigo-900 md:text-2xl">
                {searchedName.name}
            </h2>
            <div className="mt-2 text-gray-700 max-w-2xl 
            ">
            <div dangerouslySetInnerHTML={{__html:searchedName.meaning.slice(0,200)}}/>
            <Link className="text-blue-600 active:text-blue-800" href={`name/${searchedName.id}`}>
               عرض المزيد...
            </Link>
            </div>
          </div>
          </div>
      )) }
  </div>
  )
}
