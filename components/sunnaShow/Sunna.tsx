"use client"
import { handleDate } from '@/lib/handleDate';
import { SunnaType, comments } from '@/lib/type'
import {  Pencil } from 'lucide-react';
import { useState } from "react";
import toast from 'react-hot-toast';
type Props={
    sunna:SunnaType,
    admin?:any
}
export default function Sunna({sunna,admin}:Props) {
    const [changeHieght,setChangeHieght]=useState(false)
    const [show,setShow]=useState(false)
    const [comment,setComment]=useState<string>("")
    const [fetchComments,setfetchComments]=useState<any>(null)
    const [loading,setLoading]=useState(false)
    const getComments=async(id:string)=>{
        setLoading(true)
        try {
            const res=await fetch(`api/comments/sunna/${id}`)
            const data=await res.json()
            if(data.success){
                setfetchComments(data.data)
            }else{
                toast.error(data.message||"خطأ في جلب التعليقات")
            }
        } catch (error) {
            toast.error((error as Error).message||"خطأ في جلب التعليقات")
        }
        setLoading(false)
    }
    const deleteComment=async(id:string)=>{
        try {
            const res=await fetch(`api/comments/sunna/${id}`,{method:"DELETE"})
            const data=await res.json()
            if(data.success){
                getComments(sunna.id)
                toast.success("تم الحذف")
            }else{
                toast.error(data.message||"لم يتم الحذف")
            }
        } catch (error) {
            toast.error((error as Error).message||"لم يتم الحذف")
        }
    }
    const onSubmit=async(e:any)=>{
        e.preventDefault()
        if(!comment) return toast.error("من فضلك أضف تعليقا")
        try {
            const res=await fetch("api/comments/sunna",{
                method:"POST",
                credentials:"include",
                body:JSON.stringify({comment,sunnaId:sunna.id})
            })
            const data=await res.json()
            if(data.success){
                setComment("")
                toast.success("تم إضافة تعليقك 👍")
                getComments(sunna.id)
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
               " {sunna?.sunna} "
            </h2>
            <span className="text-end block mt-0 text-italic text-sm text-gray-800">
                {sunna?.sunnaSource}
            </span>
            <div className={`mt-2 border-t md:text-xl overflow-hidden transition-all duration-300
             pt-2 border-gray-200
            ${changeHieght?"max-h-[700vh]":"max-h-14"}`}>
                {sunna?.tafsir} 
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
                className={`flex gap-2 items-center`}>
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
            <div className={`${changeHieght?"block":"hidden"} mt-2 transition-all delay-300 duration-300`}>

            {!show&&<button 
            onClick={()=>{setShow(true);getComments(sunna.id)}}
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
                        className='border shadow border-gray-200 bg-zinc-100 mb-2 px-2 py-1 rounded-md'
                        >
                            <div className='text-blue-700'>
                                {`${comment.user?.firstName}
                                 ${comment.user?.lastName}` }
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-zinc-600 text-sm'>
                                    {comment.createdAt
                                        ?handleDate(comment.createdAt)
                                        : ""}
                                </span>
                                {comment.userId===admin.id&&<button
                                onClick={()=>deleteComment(comment.id)}
                                className='text-red-500'>حذف</button>}
                                <span className='text-gray-900'>{comment.comment}</span>
                            </div>
                        </div>
                    ))
                }
                {loading&&<div className='flex justify-center gap-1'>
                {[0, 1, 2].map((i) => (
                    <span
                    key={i}
                    className="size-3 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                    />
                ))}
                </div>
                }  
            </div>
        </div>
        </div>
      </div>
  )
}
