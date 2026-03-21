"use client"
import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Menu } from "lucide-react";
import FixedModal from "../animation/FixedModal";
import toast from "react-hot-toast";
export const pages = [
    { name: "الصفحة الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
    { name: "تسجيل", href: "/signIn" }
];
export const features=[
    { name: "وقفات قرآنية", href: "/#Wakafat" },
    { name: "الأذكار", href: "/#adhkar" },
    { name: "أسماء الله الحسنى", href: "/#Names" },
    { name: "سنن مهجورة", href: "/#suna" }
]
export default function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [openLogout,setOpenLogout]=useState(false)
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    fetch("/api/users/isLogged")
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.user)
    }).finally(() => setLoading(false));;
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
    <header className="relative hidden md:block z-20">
        <Logo />
        <nav 
        className="bg-white/20 relative rounded-full px-8 mb-8 py-3 mt-6 shadow-lg
         text-center flex gap-6 items-center w-40 justify-center text-[#c9a24d] mx-auto">
            <Loader2 className="animate-spin transition"/>
        </nav>
    </header>
  ): (
    <>
    <header className="relative hidden md:block z-20">
        <Logo />
        <nav 
        className="bg-white/20 relative rounded-full px-8 mb-8 py-3 mt-6 shadow-lg
         text-center flex gap-6 items-center justify-center text-[#c9a24d] w-max mx-auto">
            
            <div 
            onClick={()=>setOpenList(!openList)}
            className="cursor-pointer 
            flex items-center 
            hover:text-gray-900 transition">
                الاقسام
                <Icon />
            </div>
            <div 
            className={`flex absolute left-6 top-12 w-48 p-2 flex-col 
            bg-white/20 backdrop-blur-sm transform transition shadow-lg
            ${openList?
            "opacity-100 translate-y-0":
            "opacity-0 pointer-events-none translate-y-8"} rounded-b-lg `}
            >
            {
                features.map((item)=>(
                    <Link href={item.href} key={item.name} 
                    className="hover:bg-[#0f3d2e] rounded hover:text-white py-2">
                        {item.name}
                    </Link>
                ))
            }
            </div>
            {pages.map((item:any) =>{
            if(item.href==="/signIn"&&isLoggedIn)
                {
                return <React.Fragment key={item.name}>
                <div 
                className="cursor-pointer hover:text-gray-900 transition"
                onClick={()=>setOpenLogout(true)}
                >
                    تسجيل خروج
                </div>
                <FixedModal
                    onClose={()=>setOpenLogout(false)}
                    isOpen={openLogout}>
                       <h2 className="text-xl font-bold">هل تريد تسجيل الخروج ؟</h2>
                       <div className="flex gap-2 mt-4">
                            <button 
                            onClick={handleLogOut}
                            className="text-white cursor-pointer py-2 px-4 rounded bg-red-500">تأكيد</button>
                            <button 
                            onClick={()=>setOpenLogout(false)}
                            className="text-white cursor-pointer py-2 px-4 rounded bg-blue-500">إلغاء</button>
                       </div>
                    </FixedModal>
                </React.Fragment>
            }else{
                return(
                <Link key={item.name} 
                href={item.href}
                className="cursor-pointer hover:text-gray-900 transition">
                    {item.name}
                </Link>
                )
            }})}
            {}
        </nav>
    </header>
    <Menu 
        onClick={()=>setMobileMenuOpen(true)}
        className={`md:hidden fixed
        cursor-pointer ${mobileMenuOpen&&"hidden"}
        top-4 right-4 p-1 size-10 z-50 font-bold rounded bg-cyan-600/80 `} />
    <MobileNav 
    setMobileMenuOpen={setMobileMenuOpen}
    mobileMenuOpen={mobileMenuOpen}
    openList={openList}
    isLoggedIn={isLoggedIn}
    setOpenLogout={setOpenLogout}
    handleLogOut={handleLogOut}
    openLogout={openLogout}
    setOpenList={setOpenList}
    />
    </>
  )
}
