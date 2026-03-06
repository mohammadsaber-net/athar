import MainNav from '@/components/header/MainNav';
import { isAdmin } from '@/lib/utls';
import React from 'react'
export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;  
}>) {

 const admin=await isAdmin()
  if(!admin){
    return (
      <section className='bg-gray-100 max-w-7xl min-h-screen py-6 px-4'>
        <MainNav />
        <p>Access Denied</p>
      </section>
    )
  }
  return (
    <section className='bg-gray-100 max-w-7xl min-h-screen py-6 px-4'>
        <MainNav />
      {children}
    </section>
  )
}
