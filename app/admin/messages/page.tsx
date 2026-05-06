import db from '@/db'
import { messageTable } from '@/db/schema'
import Link from 'next/link'
export default async function page() {
  const data=await db.select().from(messageTable)
  return (
    <div className="w-full text-center overflow-x-auto">
      <h2 className="text-2xl mb-4 font-semibold text-indigo-600 dark:text-emerald-400">
        رسائل العملاء
      </h2>
          <table className="w-full rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-[#0d0d1f]
             border border-gray-300 text-indigo-600 dark:text-emerald-400">
              <tr>
                <th className="p-3 border border-gray-300">المستخدم</th>
                <th className="p-3 border border-gray-300"> الايميل</th>
                <th className="p-3 border border-gray-300"> الفون</th>
                <th className="p-3 border border-gray-300">الرسالة</th>
              </tr>
            </thead>
            <tbody className='dark:text-white'>
              {data&&data.map((item:any) => (
                <tr
                  key={item.id}
                  className="bg-white dark:bg-zinc-900 odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800/50 hover:bg-gray-100 hover:dark:bg-zinc-800 transition-colors duration-200"
                >
                  <td className="p-3 border border-gray-300">{item.name}</td>
                  {item.email ? (
                    <td className="p-3 border border-gray-300">
                      <a href={`mailto:${item.email}`} className="text-blue-500 hover:underline">
                        {item.email}
                      </a>
                    </td>
                  ):<td className="p-3 border border-gray-300">---</td>}
                  {item.phone ? (
                    <td className="p-3 border border-gray-300">
                      <a 
                      href={`https://wa.me/${item.phone.replace(/\D/g, "")}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 dark:text-emerald-500 hover:underline">
                        {item.phone.replace(/\D/g, "")}
                      </a>
                    </td>
                  ):<td className="p-3 border border-gray-300">---</td>}
                  <td className="p-3 border border-gray-300">
                    {item.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )
}
