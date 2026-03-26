import React, { useState } from 'react'
import ConfirmDelete from './ConfirmDelete'
import { SunnaType} from '@/lib/type'
import SunnaForm from './SunnaForm'
type Props={
    tableData:SunnaType[]|null
}
export default function SunnaData({tableData}:Props) {
  const [deletion,setDelete]=useState<SunnaType|null>(null)
  const [edit,setEdit]=useState<SunnaType|null>(null)
  return (
    <>
     <div className="w-full text-center overflow-x-auto">
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border border-gray-300 text-indigo-600">
          <tr>
            <th className="p-3 border border-gray-300">سنة مهجورة</th>
            <th className="p-3 border border-gray-300">مصدر السنة</th>
            <th className="p-3 border border-gray-300">التفسير</th>
            <th className="p-3 border border-gray-300">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {tableData&&tableData.map((item:SunnaType) => (
            <tr
              key={item.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
            >
              <td className="p-3 border border-gray-300 min-w-[250px]">{item.sunna}</td>
              <td className="p-3 border border-gray-300 min-w-[250px]">{item.tafsir&&item.tafsir.slice(0,100)}...</td>
              <td className="p-3 border border-gray-300 whitespace-nowrap">
                {item.sunnaSource}
              </td>
              <td className="p-3 flex flex-col gap-2 border border-gray-300 whitespace-nowrap">
                <button 
                onClick={()=>setEdit(item)}
                className="text-blue-500 cursor-pointer hover:text-blue-700">تعديل</button>
                <button 
                onClick={()=>setDelete(item)}
                className="text-red-500 cursor-pointer hover:text-red-700">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {deletion&&<ConfirmDelete 
    setDelete={setDelete}
    deletion={deletion}
    />}
    {edit&&<SunnaForm 
    setEdit={setEdit}
    edit={edit}
    />}
  </>
  )
}
