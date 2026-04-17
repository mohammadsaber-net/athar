"use client"
import { useState } from "react";
import { ArrowDown, ArrowUp, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { features, pages } from "./MainNav";
import Link from "next/link";
import React from "react";
import FixedModal from "../animation/FixedModal";
type Props={
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>,
    openList: boolean
    isLoggedIn:any
    handleLogOut:()=>void
    setOpenLogout:React.Dispatch<React.SetStateAction<boolean>>
    openLogout:boolean
}
export default function MobileNav(
  {
    setOpenList,isLoggedIn,openList,
  openLogout,setOpenLogout,handleLogOut
  }
  : Props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const Icon=openList?ArrowUp:ArrowDown
  return (
    <div className=" md:hidden">
    <Logo />
    <Menu 
      onClick={()=>setMobileMenuOpen(true)}
      className={`md:hidden absolute text-cyan-600
      cursor-pointer ${mobileMenuOpen&&"hidden"}
      top-4 right-4 p-1 size-10 z-50 font-bold shadow rounded bg-white/60 `} />
    <header className={`bg-black/30 absolute inset-0
    transform transition-transform duration-300 ease-in-out
    ${mobileMenuOpen?"translate-x-0  opacity-100":"translate-x-full opacity-0 pointer-events-none"}
    right-0 top-0 z-40 
    backdrop-blur-sm w-full`}>
    <nav className={`flex flex-col
    transform transition-transform h-screen duration-500 delay-200 ease-in-out
    ${mobileMenuOpen?"translate-x-0 opacity-100":"translate-x-full opacity-0 pointer-events-none"}
    w-[70%] px-4 bg-white/20 relative pt-8 text-start`}>
    <X 
    className={`
    absolute top-0 cursor-pointer left-4 size-8 text-white`} 
    onClick={()=>setMobileMenuOpen(false)} />
    <div
    onClick={()=>setOpenList(!openList)}
    className="cursor-pointer px-3 py-1 rounded hover:bg-gray-800 
    flex items-center hover:text-white transition">
      الاقسام
      <Icon />
    </div>
    <div 
      className={`flex absolute left-4 top-16 w-40 p-2 flex-col 
      bg-white/60 backdrop-blur-sm transform transition shadow-lg
      ${openList?
      "opacity-100 translate-y-0":
      "opacity-0 pointer-events-none translate-y-8"} rounded-lg `}
      >
        {
          features.map((item)=>(
            <Link 
            href={item.href} 
            onClick={()=>setMobileMenuOpen(false)}
            key={item.name} 
            className="hover:bg-[#0f3d2e] px-2 rounded hover:text-white py-2">
              {item.name}
            </Link>
        ))}
      </div>
        {pages.map((item:any) =>{
            if(item.href==="/signIn"&&isLoggedIn)
                {
                return <div 
                key={item.name}
                className="cursor-pointer px-3 py-1 rounded hover:bg-gray-800 hover:text-white transition"
                onClick={()=>{setMobileMenuOpen(false);setOpenLogout(true)}}
                >
                    تسجيل خروج
                </div>
            }else{
                return(
                <Link 
                onClick={()=>setMobileMenuOpen(false)}
                key={item.name} 
                href={item.href}
                className="cursor-pointer px-3 py-1 rounded hover:bg-gray-800 hover:text-white transition">
                    {item.name}
                </Link>
                )
            }})}
      </nav>
    </header>
    <FixedModal
      onClose={()=>setOpenLogout(false)}
      isOpen={openLogout}>
          <h2 className="text-xl text-[#c9a24d] font-bold">هل تريد تسجيل الخروج ؟</h2>
          <div className="flex gap-2 mt-4">
              <button 
              onClick={handleLogOut}
              className="text-white cursor-pointer py-2 px-4 rounded bg-red-500">تأكيد</button>
              <button 
              onClick={()=>setOpenLogout(false)}
              className="text-white cursor-pointer py-2 px-4 rounded bg-blue-500">إلغاء</button>
          </div>
      </FixedModal>
    </div>
    )
}
