
// import Link from 'next/link'
// export default function page() {
//   return (
//     <section className="pt-16 md:pt-4">
//       <div className='flex items-center gap-6 flex-wrap justify-center'>
//         <Link href={"/admin/hero"} className="bg-[#c9a24d] text-white transition active:bg-[#a88230] px-4 py-2 rounded-md">
//           محتويات الصفحة الرئيسية
//         </Link>
//         <Link href={"/admin/wakafat"} className="bg-[#0f3d2e] text-white transition active:bg-[#0f3d2e]/80 px-4 py-2 rounded-md">
//          وقفات قرآنية
//         </Link>
//         <Link href={"/admin/names"} className="bg-indigo-600 text-white transition active:bg-indigo-700 px-4 py-2 rounded-md">
//          أسماء الله الحسنى
//         </Link>
//         <Link href={"/admin/sunna"} className="bg-cyan-600 text-white transition active:bg-cyan-700 px-4 py-2 rounded-md">
//         سنن مهجورة
//         </Link>
//         <Link href={"/signUp"} className="bg-red-500 text-white active:bg-red-600 transition px-4 py-2 rounded-md">
//           إضافة مستخدم جديد
//         </Link>
//         <Link href={"/admin/messages"} className="bg-green-500 text-white active:bg-green-600 transition px-4 py-2 rounded-md">
//           الاطلاع على الرسائل الجديدة
//         </Link>
//       </div>
//     </section>
//   )
// }
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Type, 
  HeartHandshake, 
  UserPlus, 
  MessageSquare 
} from 'lucide-react'; // تأكد من تثبيت lucide-react

export default function AdminDashboard() {
  const adminLinks = [
    { href: "/admin/hero", label: "محتويات الرئيسية", icon: <Home size={20} />, color: "bg-amber-500", hover: "hover:bg-amber-600" },
    { href: "/admin/wakafat", label: "وقفات قرآنية", icon: <BookOpen size={20} />, color: "bg-emerald-700", hover: "hover:bg-emerald-800" },
    { href: "/admin/names", label: "أسماء الله الحسنى", icon: <Type size={20} />, color: "bg-indigo-600", hover: "hover:bg-indigo-700" },
    { href: "/admin/sunna", label: "سنن مهجورة", icon: <HeartHandshake size={20} />, color: "bg-cyan-600", hover: "hover:bg-cyan-700" },
    { href: "/signUp", label: "إضافة مستخدم", icon: <UserPlus size={20} />, color: "bg-rose-500", hover: "hover:bg-rose-600" },
    { href: "/admin/messages", label: "الرسائل الجديدة", icon: <MessageSquare size={20} />, color: "bg-green-500", hover: "hover:bg-green-600" },
  ];

  return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-8 text-center border-b pb-4 border-gray-200 dark:border-zinc-400">
          لوحة التحكم
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-4 p-4 rounded-xl text-white shadow-sm transition-all duration-200 ${link.color} ${link.hover} dark:shadow-none dark:opacity-90 dark:hover:opacity-100`}
              >
                <span className="p-2 bg-white/20 rounded-lg">
                  {link.icon}
                </span>
                <span className="font-medium text-lg tracking-wide">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
  );
}