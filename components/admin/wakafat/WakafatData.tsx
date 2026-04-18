import React, { useState } from 'react'
import ConfirmDelete from './ConfirmDelete'
import HeroForm from './WakafatForm'
import { WakafatType } from '@/lib/type'
type Props={
    tableData:WakafatType[]|null
}
export default function WakafatData({tableData}:Props) {
  const [deletion,setDelete]=useState<WakafatType|null>(null)
  const [edit,setEdit]=useState<WakafatType|null>(null)
  return (
    <>
     <div className="w-full text-center overflow-x-auto">
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border border-gray-300 text-indigo-600">
          <tr>
            <th className="p-3 border border-gray-300">الآية</th>
            <th className="p-3 border border-gray-300">مصدر الآية</th>
            <th className="p-3 border border-gray-300">التفسير</th>
            <th className="p-3 border border-gray-300">مصدر التفسير</th>
            <th className="p-3 border border-gray-300">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {tableData&&tableData.map((item:WakafatType) => (
            <tr
              key={item.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
            >
              <td className="p-3 border border-gray-300 min-w-[250px]">{item.aya}</td>
              <td className="p-3 border border-gray-300 whitespace-nowrap">
                {item.ayaSource}
              </td>
              <td className="p-3 border border-gray-300 min-w-[250px]">
                <div dangerouslySetInnerHTML={{ __html: item.tafsir.slice(0,100) }} />
              </td>
              <td className="p-3 border border-gray-300 whitespace-nowrap">
                {item.tafsirSource}
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
    {edit&&<HeroForm 
    setEdit={setEdit}
    edit={edit}
    />}
  </>
  )
}
