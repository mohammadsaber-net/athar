"use client"
import { RootState } from '@/redux/store'
import {  PencilIcon } from 'lucide-react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function AdminLogged() {
const {admin}=useSelector((state:RootState)=>state.loggedData)
  return (
    <>
    {admin&&<Link
        className="fixed left-6 z-[100000] items-center bg-[#6366f1]/90 shadow
        top-1/2 -translate-y-1/2 font-bold text-white md:text-xl px-3 py-2 rounded flex"
        href={"/admin"}>
        <PencilIcon />
    </Link>}
    </>
  )
}
