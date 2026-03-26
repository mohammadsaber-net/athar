import Link from 'next/link'
import React from 'react'
import { FaTelegramPlane,  FaWhatsapp, FaGithub, FaEnvelope, FaCopyright } from "react-icons/fa"
export default function Footer() {
  return (
    <div className='py-4 md:px-8 px-4 bg-gray-900 text-white'>
    <div className='items-center grid grid-cols-1
    lg:grid-cols-4 gap-4 md:grid-cols-2'>
      <div>
        <h3 className='font-semibold mb-3 text-gray-100 text-xl md:text-2xl'> نبذة بسيطة</h3>
        <p className=''>
          هذا موقع دعوي بسيط غير قائم علي الربح ويشرفني ان اري تعليقاتكم والمشاركة علي المقالات 
          ومن خلال <Link className='inline text-cyan-300' href={"/signIn"}> تسجيل الدخول</Link>   ستأتيك تنبيهات بإذن الله بكل ما هو جديد  واخيرا إن وجدت هنا النفع فشاركه ليعم الخير
        </p>
      </div>
      <div>
        <h3 className='font-semibold mb-3 text-gray-100 text-xl md:text-2xl'>روابط سريعة</h3>
        <div className='flex flex-col text-cyan-300 gap-2'>
          <Link href={"/"}>
            آيات و أحاديث مختارة
          </Link>
          <Link href={"/#Wakafat"}>
           وقفات قرأنية
          </Link>
          <Link href={"/#Sunna"}>
           سنن مهجورة
          </Link>
          <Link href={"/#Name"}>
           أسماء الله الحسني
          </Link>
        </div>
      </div>
      <div>
        <h3 className='font-semibold mb-3 text-cyan-100 text-xl md:text-2xl'>معلومات اتصال</h3>
        <div className='flex gap-2'>
            <a 
            href="https://wa.me/+201023966702" 
                target="_blank" 
                rel="noopener noreferrer"
            className="transition w-fit p-1 rounded-full hover:bg-green-600">
              <FaWhatsapp size={28} />
            </a>
            <a 
            href="https://t.me/@moh123ph" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-fit p-1 rounded-full hover:bg-sky-500 transition">
              <FaTelegramPlane size={28} />
            </a>
            <a 
            href="https://github.com/mohammadsaber-net" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-fit p-1 rounded-full hover:text-black hover:bg-white transition">
              <FaGithub size={28} />
            </a>
            <a href="mailto:m4567s019283@gmail.com" className="w-fit p-1 rounded-full hover:bg-red-600 transition">
              <FaEnvelope size={28} />
            </a>
        </div>
      </div>
      <div>
        <h3 className='font-semibold mb-3 text-xl md:text-2xl'>الدعم</h3>
        <ul className="">
          <li><Link href="/contact" className="hover:text-blue-400"> تواصل معنا</Link></li>
          <li><Link href="/privacy" className="hover:text-blue-400">سياسة الخصوصية </Link></li>
          <li><Link href="/about" className="hover:text-blue-400"> من نحن</Link></li>
        </ul>
      </div>
    </div>
    <div className='pt-2 mt-2 border-t-2 text-center border-gray-400'>
        جميع الحقوق محفوظة <FaCopyright className='inline'/> 
    </div>
          
    </div>
  )
}
