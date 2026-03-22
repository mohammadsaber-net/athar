import { WakafatType } from '@/lib/type'
import WakafatContent from './WakafatContent'

export default async function Wakafat() {
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/wakafat`)
  const data = (await res.json()).data
  return (
    <div
    id='Wakafat'
    className='min-h-screen bg-gray-100 px-6 py-8 max-w-7xl'>
      <div className='mb-2 pb-2 border-b-2 border-gray-300'>
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {
        data.map((item:WakafatType)=>(
          <WakafatContent key={item.id} aya={item}/>
        ))
      }
      </div>
    </div>
  )
}
