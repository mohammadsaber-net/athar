import React, { useState } from 'react'
import ConfirmDelete from '../names/ConfirmDelete'
import { NamesType } from '@/app/(dashboard)/admin/names/page'
import NamesForm from './NamesForm'
type Props={
    tableData:NamesType[]|null
}
export default function NamesData({tableData}:Props) {
  const [deletion,setDelete]=useState<NamesType|null>(null)
  const [edit,setEdit]=useState<NamesType|null>(null)
  return (
    <>
     <div className="w-full text-center overflow-x-auto">
      <table className="w-full rounded-lg overflow-hidden">
        <thead className="bg-gray-100 border border-gray-300 text-indigo-600">
          <tr>
            <th className="p-3 border border-gray-300">اسم الله</th>
            <th className="p-3 border border-gray-300"> الخلفية</th>
            <th className="p-3 border border-gray-300">الشرح</th>
            <th className="p-3 border border-gray-300">مصدر الشرح</th>
            <th className="p-3 border border-gray-300">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {tableData&&tableData.map((item:NamesType) => (
            <tr
              key={item.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
            >
              <td className="p-3 border border-gray-300 min-w-[250px]">{item.name}</td>
              <td className="p-3 border border-gray-300 whitespace-nowrap">
                {item.image && <img 
                src={item.image instanceof File ? 
                URL.createObjectURL(item.image) : item.image} 
                className='w-10 h-10' 
                alt={item.name} />}
              </td>
              <td className="p-3 border border-gray-300 min-w-[250px]">{item.meaning.slice(0,100)}...</td>
              <td className="p-3 border border-gray-300 whitespace-nowrap">
                {item.meaningSource}
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
    {edit&&<NamesForm 
    setEdit={setEdit}
    edit={edit}
    />}
  </>
  )
}
