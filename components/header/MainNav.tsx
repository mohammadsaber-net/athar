"use client"
import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { ArrowDown, ArrowUp, Menu } from "lucide-react";
export const pages = [
    { name: "من نحن", href: "/about" },
    { name: "اتصل بنا", href: "/contact" },
    { name: "تسجيل", href: "/signIn" },
    { name: "الصفحة الرئيسية", href: "/" }
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
  const Icon=openList?ArrowUp:ArrowDown
  return (
    <>
    <header className="relative hidden md:block z-20">
        <Logo />
        <nav 
        className="bg-white/20 relative rounded-full px-8 mb-8 py-3 mt-6 shadow-lg
         text-center flex gap-6 items-center justify-center text-[#c9a24d] w-max mx-auto">
            {pages.map((item) => (
                <Link key={item.name} href={item.href}
                className="cursor-pointer hover:text-gray-900 transition">
                    {item.name}
                </Link>
            ))}
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
    setOpenList={setOpenList}
    />
    </>
  )
}
