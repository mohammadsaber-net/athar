import { X } from "lucide-react";
import Logo from "./Logo";
import { navItems } from "./MainNav";
import Link from "next/link";
type Props={
    setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    mobileMenuOpen: boolean
}
export default function MobileNav({setMobileMenuOpen, mobileMenuOpen}: Props) {
  return (
    <div className=" md:hidden">
    <Logo />
    <header className={`bg-black/30 fixed 
    transform transition-transform duration-300 ease-in-out
    ${mobileMenuOpen?"translate-x-0":"translate-x-full"}
    right-0 top-0 z-40 h-[100vh] 
    backdrop-blur-sm w-full`}>
    <nav className={`
    transform transition-transform duration-500 delay-200 ease-in-out
    ${mobileMenuOpen?"translate-x-0":"translate-x-full"}
    w-[70%] px-4 bg-[#0f3d2e]/20 relative min-h-[100vh] pt-4 text-start`}>
    <X 
    className={`
    absolute top-4 cursor-pointer left-4 size-8 text-white`} 
    onClick={()=>setMobileMenuOpen(false)} />
    {navItems.map((item) => (
  <div
    key={item.name}
    className="group cursor-pointer me-10 transition
    px-6 mb-4 relative block hover:bg-white hover:text-[#0f3d2e] font-bold rounded py-1"
  >
    <Link href={item.href} className="block w-full">
      {item.name}
    </Link>

    {item.subItems && (
      <div
        className="absolute bg-black/70 text-white backdrop-blur-sm
        top-7 right-0 z-50 rounded-lg shadow-lg transform py-2 w-48 
        opacity-0 invisible transition translate-y-4
        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
      >
        <Link
          href="/"
          className="px-4 py-1 hover:bg-[#0f3d2e] hover:text-white block"
        >
          الصفحة الرئيسية
        </Link>

        {item.subItems.map((subItem) => (
          <Link
            key={subItem.name}
            href={subItem.href}
            className="px-4 py-1 hover:bg-[#0f3d2e] hover:text-white block"
          >
            {subItem.name}
          </Link>
        ))}
      </div>
    )}
  </div>
))}
        {/* {navItems.map((item) => (
            <div key={item.name} className="group cursor-pointer me-10 transition
            px-6 mb-4 relative block hover:bg-white hover:text-[#0f3d2e] font-bold rounded py-1 transition">
            {item.name}
            {item.subItems && (
                <div 
                className="absolute bg-black/70 text-white backdrop-blur-sm
                top-7 right-0 z-50 rounded-lg shadow-lg transform py-2 w-48 
                opacity-0 invisible transition translate-y-4
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                >
                    <Link href={"/"} className="px-4 py-1 hover:bg-[#0f3d2e] hover:text-white cursor-pointer block">
                         الصفحة الرئيسية
                    </Link>
                    {item.subItems.map((subItem) => (
                        <Link key={subItem.name} href={subItem.href} className="px-4 py-1 hover:bg-[#0f3d2e] hover:text-white cursor-pointer block">
                            {subItem.name}
                        </Link>
                    ))}
                </div>)}
            </div>
        ))} */}
      </nav>
    </header>
    </div>
    )
}
