"use client"
import Link from "next/link";
import MobileNav from "./MobileNav";
import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Menu } from "lucide-react";
import FixedModal from "../animation/FixedModal";
import toast from "react-hot-toast";
import PcNav from "./PcNav";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setAdmin, setUser } from "@/redux/slice/logger";
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
  const dispatch=useDispatch<AppDispatch>()
  const {admin,user}=useSelector((state:RootState)=>state.loggedData)
  useEffect(() => {
    const check = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/users/isLogged", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();

        if (data.user && data.user.role === "user") dispatch(setUser(true));
        if (data.user && data.user.role === "admin") dispatch(setAdmin(true));
      } catch (error){
        console.log(error)
      }
      setLoading(false)
    };
    check();
  }, []);
  const handleLogOut=async()=>{
    const res = await fetch("/api/users/logout", {
    method: "POST",
  });
    const data = await res.json();
    if(data.success){
        toast.success(data.message)
        dispatch(setAdmin(false))
        dispatch(setUser(false))
        setOpenLogout(false)
    }else{
        toast.error(data.message)
    }
  }
  const Icon=openList?ArrowUp:ArrowDown
  return loading?(
    <section className="bg-[#c9a24d]/40 justify-center font-bold p-2 flex 
    items-center gap-12 text-[#1a3636] shadow">
      <Loader2 className="animate-spin transition"/>
    </section>
  ): (
    <section className="bg-[#c9a24d]/40 justify-between md:justify-center font-bold p-2 flex 
    items-center gap-12 text-[#1a3636] shadow">
    <Link href={"/"} className=' flex items-center'>
      <span className="text-2xl md:text-4xl font-extrabold 
    text-transparent bg-clip-text drop-shadow-lg bg-gradient-to-r from-[#0f3d2e] 
    to-[#f59e0b]">
         أَثَارَ 
      </span>
     <img src={"/athar-logo.png"} className="size-10" alt="athar-logo"/>
    </Link>
    <PcNav 
    Icon={Icon}
    openList={openList}
    setOpenList={setOpenList}
    handleLogOut={handleLogOut}
    openLogout={openLogout}
    isLoggedIn={{admin,user}}
    setOpenLogout={setOpenLogout}
    />
    <MobileNav 
    openList={openList}
    isLoggedIn={{admin,user}}
    setOpenLogout={setOpenLogout}
    handleLogOut={handleLogOut}
    openLogout={openLogout}
    setOpenList={setOpenList}
    />
    </section>
  )
}
