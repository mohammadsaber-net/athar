import MainNav from '@/components/header/MainNav';
import Hero from '@/components/hero/Hero';
import React from 'react';
export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;  
}>) {
  return (
    <>
    <section className='bg-gray-100 max-w-7xl min-h-screen py-6 px-4'>
    <MainNav />
      <div className='md:mt-6 mt-20 pt-3 border-t-2 border-slate-300'>
        {children}
      </div>
    </section>
    </>
  )
}