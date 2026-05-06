import { isAdmin } from '@/lib/isAdmin';
import React from 'react'
import { redirect } from 'next/navigation';
export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;  
}>) {
 const admin=await isAdmin()
  if(!admin){
    redirect("/");
  }
  return (
    <section className='bg-gray-100 dark:bg-[#0d0d1f] min-h-screen py-6 px-4
     transition-colors duration-300'>
      {children}
    </section>
  )
}
