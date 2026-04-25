import db from '@/db'
import { messageTable } from '@/db/schema'
export default async function page() {
  const data=await db.select().from(messageTable)
  return (
    <div className="w-full text-center overflow-x-auto">
          <table className="w-full rounded-lg overflow-hidden">
            <thead className="bg-gray-100 border border-gray-300 text-indigo-600">
              <tr>
                <th className="p-3 border border-gray-300">المستخدم</th>
                <th className="p-3 border border-gray-300"> الايميل</th>
                <th className="p-3 border border-gray-300">الرسالة</th>
              </tr>
            </thead>
            <tbody>
              {data&&data.map((item:any) => (
                <tr
                  key={item.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="p-3 border border-gray-300">{item.name}</td>
                  <td className="p-3 border border-gray-300">
                    <a href={`mailto:${item.email}`} className="text-blue-500 hover:underline">
                      {item.email}
                    </a>
                  </td>
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
