import React, { useState } from 'react'
import ConfirmDelete from './ConfirmDelete'
import HeroForm from './WakafatForm'
import { WakafatType } from '@/lib/type'
import FormatingText from '@/components/animation/FormatingText'
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
        <thead className="bg-gray-100 dark:bg-[#0d0d1f]
         border border-gray-300 text-indigo-600 dark:text-emerald-400">
          <tr>
            <th className="p-3 border border-gray-300">الآية</th>
            <th className="p-3 border border-gray-300">مصدر الآية</th>
            <th className="p-3 border border-gray-300">التفسير</th>
            <th className="p-3 border border-gray-300">مصدر التفسير</th>
            <th className="p-3 border border-gray-300">الإجراءات</th>
          </tr>
        </thead>

        <tbody className='dark:text-white'>
          {tableData&&tableData.map((item:WakafatType) => (
            <tr
              key={item.id}
              className="bg-white dark:bg-zinc-900 odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800/50 hover:bg-gray-100 hover:dark:bg-zinc-800 transition-colors duration-200"
            >
              <td className="p-3 border border-gray-300 min-w-[250px]">{item.aya}</td>
              <td className="p-3 border border-gray-300 whitespace-nowrap">
                {item.ayaSource}
              </td>
              <td className="p-3 border border-gray-300 min-w-[250px]">
                <FormatingText text={item.tafsir.slice(0,100)}/>
              </td>
              <td className="p-3 border border-gray-300 whitespace-nowrap">
                {item.tafsirSource}
              </td>
              <td className="p-3 flex flex-col gap-2 border border-gray-300 whitespace-nowrap">
                <button 
                onClick={()=>setEdit(item)}
                className="text-blue-500 cursor-pointer hover:text-blue-700
                dark:hover:text-emerald-300 dark:text-emerald-400">تعديل</button>
                <button 
                onClick={()=>setDelete(item)}
                className="text-red-500 cursor-pointer hover:text-red-700
                dark:hover:text-red-300 dark:text-red-400">حذف</button>
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
