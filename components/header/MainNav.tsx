"use client"
import Link from "next/link";
import MobileNav from "./MobileNav";
import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Menu } from "lucide-react";
import FixedModal from "../animation/FixedModal";
import toast from "react-hot-toast";
import PcNav from "./PcNav";
export const pages = [
    { name: "الصفحة الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
    { name: "تسجيل", href: "/signIn" }
];
export const features=[
    { name: "وقفات قرآنية", href: "/wakafat" },
    { name: "أسماء الله الحسنى", href: "/name" },
    { name: "سنن مهجورة", href: "/sunna" }
]
export default function MainNav() {
  
  const [openList, setOpenList] = useState(false);
  const [openLogout,setOpenLogout]=useState(false)
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    fetch("/api/users/isLogged")
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.user)
    }).finally(() => setLoading(false));
  }, []);
  const handleLogOut=async()=>{
    const res = await fetch("/api/users/logout", {
    method: "POST",
  });
    const data = await res.json();
    if(data.success){
        toast.success(data.message)
        setIsLoggedIn(null)
        setOpenLogout(false)
    }else{
        toast.error(data.message)
    }
  }
  const Icon=openList?ArrowUp:ArrowDown
  return loading?(
    <section className="bg-[#c9a24d]/40 justify-between md:justify-center font-bold p-2 flex 
    items-center gap-12 text-[#1a3636] shadow">
            <Loader2 className="animate-spin transition"/>
    </section>
  ): (
    <section className="bg-[#c9a24d]/40 justify-between md:justify-center font-bold p-2 flex 
    items-center gap-12 text-[#1a3636] shadow">
    <Link href={"/"} className='text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0f3d2e] to-[#f59e0b] drop-shadow-lg'>
      أَثَارَ
    </Link>
    <PcNav 
    Icon={Icon}
    openList={openList}
    setOpenList={setOpenList}
    handleLogOut={handleLogOut}
    openLogout={openLogout}
    isLoggedIn={isLoggedIn}
    setOpenLogout={setOpenLogout}
    />
    <MobileNav 
    openList={openList}
    isLoggedIn={isLoggedIn}
    setOpenLogout={setOpenLogout}
    handleLogOut={handleLogOut}
    openLogout={openLogout}
    setOpenList={setOpenList}
    />
    </section>
  )
}
