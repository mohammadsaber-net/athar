
import Link from 'next/link'
export default function page() {
  return (
    <section className="mt-16 md:mt-4">
      <div className='flex items-center gap-6 flex-wrap justify-center'>
        <Link href={"/admin/hero"} className="bg-[#c9a24d] text-white hover:bg-[#a88230] px-4 py-2 rounded-md">
          محتويات الصفحة الرئيسية
        </Link>
        <Link href={"/admin/wakafat"} className="bg-[#0f3d2e] text-white hover:bg-[#0f3d2e]/80 px-4 py-2 rounded-md">
         وقفات قرآنية
        </Link>
        <Link href={"/admin/names"} className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md">
         أسماء الله الحسنى
        </Link>
      </div>
    </section>
  )
}
