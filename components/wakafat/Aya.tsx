import { WakafatType } from '@/lib/type'
import { LoaderIcon, Upload } from 'lucide-react';
import { useState } from "react";
type Props={
    aya:WakafatType
}
export default function Aya({aya}:Props) {
    const [changeHieght,setChangeHieght]=useState(false)
    const [addComment,setAddComment]=useState(false)
  return (
    <div className='max-w-xl relative z-10 mx-auto bg-white/90 shadow-lg border border-blue-100
      overflow-hidden rounded-md p-3'>
        <div className="group transition">
            <h2 className="text-gray-900 mb-0 group-hover:text-blue-700">
               " {aya?.aya} "
            </h2>
            <span className="text-end block mt-0 text-italic text-sm text-gray-800">
                {aya?.ayaSource}
            </span>
            <div className={`mt-2 border-t overflow-hidden transition-all duration-300
             pt-2 border-gray-200
            ${changeHieght?"max-h-screen":"max-h-14"}`}>
                {aya?.tafsir} 
            </div>
              <button
              onClick={()=>setChangeHieght(!changeHieght)}
              className="text-blue-600 cursor-pointer transition hover:text-blue-800
                ">{!changeHieght?"عرض المزيد .....":"عرض أقل"}
              </button>
            <div
             className={`${changeHieght?"block":"hidden"}
             pt-2 border-t-2 border-gray-200
             transition-all delay-300 duration-300`}
            >
                <button 
                className='text-indigo-700 text-semibold cursor-pointer'
                onClick={()=>setAddComment(!addComment)}
               >
                   {addComment?"إخفاء":" اضف تعليقا"}
                </button>
                <form className={`flex shadow gap-2 items-center transition
                    ${addComment?"opacity-100":"opacity-0 pointer-event-none"}`}>
                <input 
                placeholder='أضف تعليقا'
                className={`border-gray-200 rounded
                    border text-gray-900 p-1 w-full
                    focus:outline-none bg-gray-100`}/>
                <button
                className='flex gap-1 items-center cursor-pointer bg-gray-800 text-white px-2 py-1 rounded'
                type='button'
                >
                    ارسال <Upload />
                </button>
                </form>
            </div>
            <button className={`${changeHieght?"block":"hidden"} transition-all delay-300 duration-300`}>
                 عرض التعليقات
            </button>
        </div>
      </div>
  )
}
