"use client"
import { WakafatType } from '@/lib/type'
import { Star } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function page() {
  const params = useParams()
  const id = params.id as string
  const [aya,setAya]=useState<WakafatType|null>(null)
  const fetchingAya=async ()=>{
    try {
    const res=await fetch(`/api/wakafat/${id}`)
    const data=await res.json()
    if(data.success){
        setAya(data.data)
    }
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchingAya()
  },[])
  return (
    <section className='mt-2'>
      <div className="flex justify-center mb-2 
        items-center text-xl md:text-2xl gap-2">
            <Star 
            className="fill-[#22c55e] stroke-none"
            /><Star 
            className="fill-[#22c55e] stroke-none"
            /><Star 
            className="fill-[#22c55e] stroke-none"
        />
        </div>
      <div className='max-w-xl'>
        <span className='text-italic text-gray-700 text-sm'>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span>
        <h2 className='text-indigo-700 mb-0 text-xl md:text-3xl'>
         " {aya?.aya} "
        </h2>
        <span className='text-italic text-gray-600 text-sm'>{aya?.ayaSource}</span>
        <div className='text-gray-800 mt-2 md:text-xl border-t border-gray-400 pt-2'>
          {aya?.tafsir}
        </div>
        <span className='text-italic block text-start text-gray-600 text-sm'>{aya?.ayaSource}</span>
      </div>
    </section>
  )
}
