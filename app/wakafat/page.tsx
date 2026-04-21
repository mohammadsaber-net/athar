
import WakafatContent from "@/components/wakafatShow/WakafatContent";
import db from "@/db";
import { wakafatTable } from "@/db/schema";
export default async function Wakafat() {
  const data = await db.select().from(wakafatTable)
  return (
    <section
    className='bg-gray-50 min-h-screen px-6 md:pt-8 pt-20 max-w-7xl'>
      <div className='mb-2 pb-2'>
        <h1 className='text-2xl md:text-3xl text-[#0f3d2e] font-bold mb-2'>وقفات مع آيات من كتاب ربنا</h1>
        <p className='max-w-md'>
          في هذا القسم سنقف بعون الله ومشيئته مع آيات من الذكر الحكيم, محاولين
          فهم الآية وما ترشدنا إليه والواجب علي المسلم تجاه الآية, <span className='text-cyan-600'>
            وهذا وفقا للتفاسير المشهورة بإذن الله تعالي.
          </span>
          <span className='text-blue-600 block'>
            يمكنك التعليق أسفل كل مقالة
          </span>
        </p>
      </div>
      <WakafatContent content={data}/>
    </section>
  )
}
