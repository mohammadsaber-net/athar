
import Link from 'next/link'
export default function page() {
  return (
    <section className="mt-16 md:mt-4">
      <div className='flex items-center gap-6 flex-wrap justify-center'>
        <Link href={"/admin/hero"} className="bg-[#c9a24d] text-white transition active:bg-[#a88230] px-4 py-2 rounded-md">
          محتويات الصفحة الرئيسية
        </Link>
        <Link href={"/admin/wakafat"} className="bg-[#0f3d2e] text-white transition active:bg-[#0f3d2e]/80 px-4 py-2 rounded-md">
         وقفات قرآنية
        </Link>
        <Link href={"/admin/names"} className="bg-indigo-600 text-white transition active:bg-indigo-700 px-4 py-2 rounded-md">
         أسماء الله الحسنى
        </Link>
        <Link href={"/admin/sunna"} className="bg-cyan-600 text-white transition active:bg-cyan-700 px-4 py-2 rounded-md">
        سنن مهجورة
        </Link>
        <Link href={"/signUp"} className="bg-red-500 text-white active:bg-red-600 transition px-4 py-2 rounded-md">
          إضافة مستخدم جديد
        </Link>
        <Link href={"/message"} className="bg-green-500 text-white active:bg-green-600 transition px-4 py-2 rounded-md">
          الاطلاع على الرسائل الجديدة
        </Link>
      </div>
    </section>
  )
}
