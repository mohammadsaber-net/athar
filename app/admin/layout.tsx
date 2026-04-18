import MainNav from '@/components/header/MainNav';
import { isAdmin } from '@/lib/isAdmin';
import React from 'react'
import { redirect } from 'next/navigation';
import Footer from '@/components/footer/Footer';
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
    <section className='bg-gray-100 max-w-7xl min-h-screen py-6 px-4'>
        <MainNav />
      {children}
      
    </section>
  )
}
