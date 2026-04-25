import React from 'react'
import { features, pages } from './MainNav'
import Link from 'next/link'
import FixedModal from '../animation/FixedModal'
type Props={
    Icon:any,
    openList:boolean,
    setOpenList:(open:boolean)=>void,
    isLoggedIn:{admin:boolean,user:boolean},
    openLogout:boolean,
    handleLogOut:()=>void,
    setOpenLogout:(open:boolean)=>void
}
export default function PcNav(
    { Icon, openList, setOpenList,handleLogOut, openLogout,isLoggedIn, setOpenLogout }
    : Props) {
  return (
      <nav 
        className="md:flex gap-6 hidden text-[#1a3636] items-center relative">
            <div 
            onClick={()=>setOpenList(!openList)}
            className="cursor-pointer 
            flex items-center 
            hover:text-gray-900 transition">
                الاقسام
                <Icon />
            </div>
            <div 
            className={`flex absolute right-0 top-12 w-48 p-2 flex-col 
            bg-white/60 backdrop-blur-sm transform transition shadow-lg
            ${openList?
            "opacity-100 z-50 -translate-y-1":
            "opacity-0 pointer-events-none translate-y-8"} rounded-b-lg `}
            >
            {
                features.map((item)=>(
                    <Link href={item.href} key={item.name} 
                    onClick={()=>setOpenList(false)}
                    className="hover:bg-[#0f3d2e] px-1 rounded hover:text-white py-2">
                        {item.name}
                    </Link>
                ))
            }
            </div>
            {pages.map((item:any) =>{
            if(item.href==="/signIn"&&(isLoggedIn.admin||isLoggedIn.user))
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
        </nav>
  )
}
