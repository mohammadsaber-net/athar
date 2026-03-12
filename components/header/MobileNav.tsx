import { ArrowDown, ArrowUp, X } from "lucide-react";
import Logo from "./Logo";
import { features, pages } from "./MainNav";
import Link from "next/link";
type Props={
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    mobileMenuOpen: boolean
    setOpenList: React.Dispatch<React.SetStateAction<boolean>>,
    openList: boolean
}
export default function MobileNav(
  {setMobileMenuOpen, mobileMenuOpen,setOpenList,openList}
  : Props) {
    const Icon=openList?ArrowUp:ArrowDown
  return (
    <div className=" md:hidden">
    <Logo />
    <header className={`bg-black/30 fixed 
    transform transition-transform duration-300 ease-in-out
    ${mobileMenuOpen?"translate-x-0":"translate-x-full"}
    right-0 top-0 z-40 h-[100vh] 
    backdrop-blur-sm w-full`}>
    <nav className={`flex flex-col
    transform transition-transform duration-500 delay-200 ease-in-out
    ${mobileMenuOpen?"translate-x-0":"translate-x-full"}
    w-[70%] px-4 bg-white/20 relative min-h-[100vh] pt-8 text-start`}>
    <X 
    className={`
    absolute top-0 cursor-pointer left-4 size-8 text-white`} 
    onClick={()=>setMobileMenuOpen(false)} />
    {pages.map((item) => (
      <Link key={item.name} href={item.href}
        className="cursor-pointer px-3 py-1 rounded hover:bg-gray-800 hover:text-white transition">
          {item.name}
      </Link>
    ))}
    <div
    onClick={()=>setOpenList(!openList)}
    className="cursor-pointer px-3 py-1 rounded hover:bg-gray-800 
    flex items-center hover:text-white transition">
      الاقسام
      <Icon />
    </div>
    <div 
            className={`flex absolute right-4 top-48 w-40 p-2 flex-col 
            bg-white/60 backdrop-blur-sm transform transition shadow-lg
            ${openList?
            "opacity-100 translate-y-0":
            "opacity-0 pointer-events-none translate-y-8"} rounded-lg `}
            >
            {
                features.map((item)=>(
                    <Link href={item.href} key={item.name} 
                    className="hover:bg-[#0f3d2e] px-2 rounded hover:text-white py-2">
                        {item.name}
                    </Link>
                ))
            }
            </div>
      </nav>
    </header>
    </div>
    )
}
