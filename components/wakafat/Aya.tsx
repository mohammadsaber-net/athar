"use client"
import { WakafatTypeWithComments,comments } from '@/lib/type'
import { LoaderIcon, Pencil, Upload } from 'lucide-react';
import { useState } from "react";
import toast from 'react-hot-toast';
type Props={
    aya:WakafatTypeWithComments
}
export default function Aya({aya}:Props) {
    const [changeHieght,setChangeHieght]=useState(false)
    const [show,setShow]=useState(false)
    const [comment,setComment]=useState<string>("")
    const [fetchComments,setfetchComments]=useState<any>(null)
    const getComments=async(id:string)=>{
        try {
            const res=await fetch(`api/comments/wakafat/${id}`)
            const data=await res.json()
            if(data.success){
                setfetchComments(data.data)
            }else{
                toast.error(data.message||"خطأ في جلب التعليقات")
            }
        } catch (error) {
            toast.error((error as Error).message||"خطأ في جلب التعليقات")
        }
    }
    const onSubmit=async(e:any)=>{
        e.preventDefault()
        try {
            const res=await fetch("api/comments/wakafat",{
                method:"POST",
                credentials:"include",
                body:JSON.stringify({comment,wakafatId:aya.id})
            })
            const data=await res.json()
            if(data.success){
                setComment("")
                toast.success("تم إضافة تعليقك 👍")
                getComments(aya.id)
                setShow(true)
            }else{
                toast.error(data.message||"خطأ في التعليق")
            }
        } catch (error) {
            toast.error((error as Error).message||"خطأ في التعليق")
        }
    }
  return (
    <div className='md:max-w-xl max-w-[90%] mb-10 relative z-10 mx-auto bg-white/70 shadow-lg border border-blue-100
      overflow-hidden rounded-md p-3'>
        <div className="group transition">
            <h2 className="group-hover:text-rose-900 text-xl md:text-3xl mb-0 text-blue-900">
               " {aya?.aya} "
            </h2>
            <span className="text-end block mt-0 text-italic text-sm text-gray-800">
                {aya?.ayaSource}
            </span>
            <div className={`mt-2 border-t md:text-xl overflow-hidden transition-all duration-300
             pt-2 border-gray-200
            ${changeHieght?"max-h-[700vh]":"max-h-14"}`}>
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
                <form 
                onSubmit={onSubmit}
                className={`flex shadow gap-2 items-center`}>
                <input 
                onChange={(e)=>setComment(e.target.value)}
                value={comment}
                placeholder='أضف تعليقا'
                className={`border-gray-200 rounded
                    border text-gray-900 p-1
                    focus:outline-none bg-gray-100`}/>
                <button
                className='flex gap-1 items-center cursor-pointer bg-gray-800 text-white px-2 py-1 rounded'
                type="submit"
                >
                 إرسال <Pencil className='size-5'/>
                </button>
                </form>
            </div>
            <div className={`${changeHieght?"block":"hidden"} transition-all delay-300 duration-300`}>

            {!show&&<button 
            onClick={()=>{setShow(true);getComments(aya.id)}}
            className='text-indigo-600 cursor-pointer'
            >
                عرض التعليقات
            </button>}
            {show&&<button 
            onClick={()=>setShow(false)}
            className='text-indigo-600 cursor-pointer'
            >
               إخفاء التعليقات
            </button>}
            <div
            className={`transition-all duration-400 overflow-hidden ${show?"max-h-[700vh]":"max-h-0"}`}
            >
                {
                    fetchComments&&fetchComments.map((comment:comments)=>(
                        <div
                        key={comment.id}
                        className='border border-gray-200 mb-2 px-2 py-1 rounded'
                        >
                            <div className='text-zinc-600'>
                                {`${comment.user?.firstName}
                                 ${comment.user?.lastName}` }
                            </div>
                            <div className='text-gray-900 text-end'>
                                {comment.comment}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
      </div>
  )
}
