"use client"
import { WakafatType } from '@/lib/type'
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
    <div>
      {aya?.aya}
    </div>
  )
}
