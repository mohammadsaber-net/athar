"use client"
import { handleDate } from '@/lib/handleDate';
import { WakafatType, comments } from '@/lib/type'
import {  Heart, Pencil } from 'lucide-react';
import { useState } from "react";
import toast from 'react-hot-toast';
import SharePopup from '../shareButton/ShareButton';
type Props={
    aya:WakafatType,
    logged?:any
}
export default function Aya({aya,logged}:Props) {
    const [show,setShow]=useState(false)
    const [comment,setComment]=useState<string>("")
    const [fetchComments,setfetchComments]=useState<any>(null)
    const [loading,setLoading]=useState(false)
    const getComments=async(id:string)=>{
        setLoading(true)
        try {
            const res=await fetch(`/api/comments/wakafat/${id}`)
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
            const res=await fetch(`/api/comments/wakafat/${id}`,{method:"DELETE"})
            const data=await res.json()
            if(data.success){
                getComments(aya.id)
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
            const res=await fetch("/api/comments/wakafat",{
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
    <div className='pt-8 p-3 max-w-4xl'>
        <div className='mb-2 relative z-50'>
                <SharePopup text={`« ${aya.aya || "الاسم"} »\n${aya.tafsir.slice(0, 50)}... || " المعنى"}`}/>      
        </div>
        <div className="relative z-20 transition">
            <h2 className=" text-2xl md:text-5xl text-center mb-0 mt-2 text-blue-900">
                {aya?.aya} 
            </h2>
            
            <div className={`mt-2 border-t md:text-xl pt-2 border-gray-200 `}>
                <div
                dangerouslySetInnerHTML={{ __html: aya?.tafsir||"" }} /> 
            </div>
            <span className='text-start text-sm text-gray-600 mt-2 block'>
                {aya?.ayaSource}
            </span>
            <div
             className={`
             pt-2 border-t-2 border-gray-200
             transition-all delay-300 duration-300`}
            >
            <form 
                onSubmit={onSubmit}
                className="flex gap-2 w-full items-center bg-white p-2 rounded-lg shadow-sm border border-gray-200"
                >
                <input 
                    onChange={(e)=>setComment(e.target.value)}
                    value={comment}
                    placeholder='أضف تعليق...'
                    className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button
                    className='flex gap-1 items-center cursor-pointer bg-gray-800 text-white px-2 py-1 rounded'
                    type="submit"
                >
                    إرسال <Pencil className='size-4'/>
                </button>
            </form>
            <button 
                onClick={()=>{
                    if(!show){ getComments(aya.id) }
                    setShow(!show)
                }}
                className='text-indigo-600 text-sm mt-2 active:underline hover:underline'
                >
                {show ? "إخفاء التعليقات" : "عرض التعليقات"}
            </button>
            <div
                className={`transition-all duration-500 overflow-hidden 
                ${show ? "max-h-[1000px] mt-3" : "max-h-0"}`}
                >
                <div className="flex flex-col gap-3">
                    {fetchComments && fetchComments.map((comment: comments) => (
                    <div    
                        key={comment.id}
                        className='bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition'
                    >
                        <div className='text-indigo-700 font-medium text-sm mb-1'>
                        {comment.user?.firstName} {comment.user?.lastName}
                        </div>
                        <div className='text-gray-800 text-sm mb-2 break-words'>
                        {comment.comment}
                        </div>
                        <div className='flex justify-between items-center text-xs text-gray-500'>
                        <span>
                            {comment.createdAt ? handleDate(comment.createdAt) : ""}
                        </span>

                        {comment?.userId === logged?.id && (
                            <button
                            onClick={()=>deleteComment(comment.id)}
                            className='text-red-500 hover:text-red-700 transition'
                            >
                            حذف
                            </button>
                        )}
                        </div>
                    </div>
                    ))}
            </div>

            {loading && (
                    <div className='flex justify-center gap-1 mt-2'>
                    {[0, 1, 2].map((i) => (
                        <span
                        key={i}
                        className="size-2 bg-indigo-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                        />
                    ))}
                    </div>
                )}
            </div>
            </div>
        </div>
        </div>
  )
}
