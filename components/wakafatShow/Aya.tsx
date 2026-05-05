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
            <h2 className=" text-2xl md:text-5xl dark:text-white text-center mb-0 mt-2 text-blue-900">
                {aya?.aya} 
            </h2>
            
            <div className={`mt-2 border-t md:text-xl pt-2 border-gray-200 `}>
                <div
                dangerouslySetInnerHTML={{ __html: aya?.tafsir||"" }} /> 
            </div>
            <span className='text-start dark:text-white text-sm text-gray-600 mt-2 block'>
                {aya?.ayaSource}
            </span>
            <div
             className={`
             pt-2 border-t-2 border-gray-200
             transition-all delay-300 duration-300`}
            >
            <form 
                onSubmit={onSubmit}
                className="flex gap-2 w-full dark:bg-white/20 items-center bg-white p-2 rounded-lg shadow-sm border border-gray-200"
                >
                <input 
                    onChange={(e)=>setComment(e.target.value)}
                    value={comment}
                    placeholder='أضف تعليق...'
                    className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button
                    className='flex gap-1 dark:bg-gray-500 items-center cursor-pointer bg-gray-800 text-white px-2 py-1 rounded'
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
                className='text-indigo-600 dark:text-cyan-500 text-sm mt-2 active:underline hover:underline'
                >
                {show ? "إخفاء التعليقات" : "عرض التعليقات"}
            </button>
            <div
                className={`transition-all duration-500 overflow-hidden ${
                    show ? "max-h-[1000px] mt-4 opacity-100" : "max-h-0 opacity-0"
                }`}
                >
                <div className="flex flex-col gap-3 p-1"> {/* p-1 عشان الظل ميتجمعش عند الحواف */}
                    {fetchComments && fetchComments.length > 0 ? (
                    fetchComments.map((comment: comments) => (
                        <div
                        key={comment.id}
                        className="bg-white dark:bg-[#161b22] p-3 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                        <div className="flex justify-between items-start mb-1">
                            <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                            {comment.user?.firstName} {comment.user?.lastName}
                            </div>
                            <span className="text-[10px] text-gray-400 dark:text-gray-200">
                            {comment.createdAt ? handleDate(comment.createdAt) : ""}
                            </span>
                        </div>
                        <div className="text-gray-700 dark:text-white text-sm leading-relaxed break-words">
                            {comment.comment}
                        </div>
                        {comment?.userId === logged?.id && (
                            <div className="flex justify-end mt-2 pt-2 border-t border-gray-50 dark:border-gray-800/50">
                            <button
                                onClick={() => deleteComment(comment.id)}
                                className="text-red-400 hover:text-red-600 dark:hover:text-red-500 text-xs font-medium transition-colors flex items-center gap-1"
                            >
                                <span>حذف</span>
                            </button>
                            </div>
                        )}
                        </div>
                    ))
                    ) : (
                    <p className="text-center text-gray-400 text-sm py-4">لا توجد تعليقات بعد.</p>
                    )}
                </div>
            {loading && (
                    <div className='flex justify-center gap-1 mt-2'>
                    {[0, 1, 2].map((i) => (
                        <span
                        key={i}
                        className="size-2 bg-indigo-500 dark:bg-cyan-500 rounded-full animate-bounce"
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
