"use client"
import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { Menu } from "lucide-react";
    export const navItems = [
        { name: "الأقسام الرئيسية", href: "/", subItems: [
            { name: "وقفات قرآنية", href: "/#Wakafat" },
            { name: "الأذكار", href: "/#adhkar" },
            { name: "أسماء الله الحسنى", href: "/#Names" },
            { name: "سنن مهجورة", href: "/#suna" }
        ]},
        { name: "من نحن", href: "/about" },
        { name: "اتصل بنا", href: "/contact" },
        { name: "تسجيل", href: "/signIn" }
    ];
export default function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
    <header className="relative hidden md:block z-20">
        <Logo />
        <nav 
        className="bg-white/20 rounded-full px-8 mb-8 py-3 mt-6 shadow-lg
         text-center flex gap-6 items-center justify-center text-[#c9a24d] w-max mx-auto">
            {navItems.map((item) => (
                <div  key={item.name} className="group relative">
                <Link href={item.href}
                className="cursor-pointer hover:text-gray-900 transition">
                    {item.name}
                </Link>
                    {item.subItems && (
                        <div 
                        className="absolute bg-white/30 backdrop-blur-sm
                         top-6 rounded-lg shadow-lg transform py-2 w-48 translate-x-[50%]
                         opacity-0 invisible transition translate-y-4
                         group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                         >
                            {item.subItems.map((subItem) => (
                                <a href={subItem.href} key={subItem.name} className="px-4 py-1 hover:bg-[#0f3d2e] hover:text-white cursor-pointer block">
                                    {subItem.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    </header>
    <Menu 
        onClick={()=>setMobileMenuOpen(true)}
        className="md:hidden absolute
        cursor-pointer
        top-4 right-4 size-6 text-white" />
    <MobileNav 
    setMobileMenuOpen={setMobileMenuOpen}
    mobileMenuOpen={mobileMenuOpen}
    />
    </>
  )
}
