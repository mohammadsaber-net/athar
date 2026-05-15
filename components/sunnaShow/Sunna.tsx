"use client"
import { handleDate } from '@/lib/handleDate';
import { SunnaType, comments } from '@/lib/type'
import {  CopyCheck, CopyIcon, Heart, Pencil, Reply } from 'lucide-react';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import SharePopup from '../shareButton/ShareButton';
import { toggleLike } from '@/redux/slice/togleLike';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import FormatingText from '../animation/FormatingText';
import FormatingMention from '../animation/FormatingMention';
import { fetchGetComments } from '@/redux/slice/getComments';
import { fetchDeleteComments } from '@/redux/slice/deleteComments';
import { extractMentions } from '../wakafatShow/Aya';
import { fetchSendComments } from '@/redux/slice/sendComments';
type Props={
    sunna:SunnaType,
    logged?:any
}
export default function Sunna({sunna,logged}:Props) {
    const [show,setShow]=useState(false)
    const [replyTo, setReplyTo] = useState<{
            userName: string;
            commentId: string;
            } | null>(null);
    const [comment,setComment]=useState<string>("")
    const dispatch=useDispatch<AppDispatch>()
    const [fetchComments,setfetchComments]=useState<any>(null)
    const {sendError,sendLoading,sendData}=useSelector((state:RootState)=>state.sendComments)
    const {getData,getError,getLoading}=useSelector((state:RootState)=>state.getComments)
    const {deleteData,deleteError,deleteLoading}=useSelector((state:RootState)=>state.deleteComments)
    const [copyData, setCopyData] = useState("");
    const Copy = copyData ? CopyCheck : CopyIcon;
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`
            ${sunna.sunna}\n${sunna.tafsir}\n\n https://athar-123.vercel.app/sunna/${sunna?.shortId}   
            `);
            setCopyData("copied");

            setTimeout(() => {
            setCopyData("");
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        if(sendData?.success||deleteData?.success){
            setComment("")
            dispatch(fetchGetComments({
                targetId:sunna.id,targetType:"sunna"
            }))
        }
    },[sendData,deleteData])
    useEffect(()=>{
        if(getData?.success){
            setfetchComments(getData.data)
        }
    },[getData])
  return (
    <div className='pt-8 p-3 max-w-4xl'>
        <div className='mb-4 flex items-center justify-between relative z-50'>
            <SharePopup text={`\n« ${sunna.sunna || "السنه"} »\n\n${sunna.tafsir&&sunna.tafsir.slice(0, 300)}...`}/>      
            <div
            onClick={handleCopy}
            className='flex items-center font-semibold cursor-pointer'>
            نسخ <Copy />     
            </div>    
        </div>
        <div className="relative z-20 transition">
            <h2 className=" text-2xl md:text-5xl dark:text-white text-center mb-0 mt-2 text-blue-900">
                {sunna?.sunna} 
            </h2>
            
             <div className={`mt-2 border-t pt-2 border-emerald-300 `}>
                <FormatingText text={sunna?.tafsir||""}/>
            </div>
            <span className="text-end block mt-0 dark:text-white text-italic text-sm text-gray-800">
                {sunna?.sunnaSource}
            </span>
            <div
             className={`
             pt-2 border-t-2 border-gray-200
             transition-all delay-300 duration-300`}
            >
            <button 
                onClick={()=>{
                    if(!show){ dispatch(fetchGetComments({
                        targetId:sunna.id,targetType:"sunna"}))
                     }
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
                    fetchComments.map((comment: comments) => {
                        const liked = comment.likes?.some(l => l.userId === logged?.id);
                            return(
                        <div
                        key={comment.id}
                        className="bg-white dark:bg-[#161b22] p-3 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <div className='text-sm text-gray-900 mb-0 dark:text-gray-100 font-semibold'>
                                {comment.user?.displayName}
                                </div>
                                <div className='text-xs text-gray-600 mb-0 dark:text-gray-400 font-semibold'>
                                {comment.user?.userName}@
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-400 dark:text-gray-200">
                            {comment.createdAt ? handleDate(comment.createdAt) : ""}
                            </span>
                        </div>
                        <div className="text-gray-700 dark:text-white text-sm leading-relaxed break-words">
                            <FormatingMention text={comment.comment}/>
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t border-gray-50 dark:border-gray-800/50">
                            <div className='flex items-center gap-4'>
                            <button
                            className="cursor-pointer"
                            onClick={() => {
                                setReplyTo({
                                userName: comment.user?.userName||"",
                                commentId: comment.id,
                                });
                                setComment(`@${comment.user?.userName} `);
                                setTimeout(() => {
                                document.getElementById("sunna-input")?.focus();
                                }, 100);
                            }}
                            >
                            <Reply />
                            </button>
                            <div className='flex gap-1 items-center'>
                                <Heart 
                                onClick={() => {
                                    dispatch(toggleLike({
                                        commentId: comment.id,
                                        targetType: "sunna",
                                        articleId: sunna.id
                                    }));
                                    setfetchComments((prev: any[]) =>
                                        prev.map((c) =>
                                        c.id === comment.id
                                            ? {
                                                ...c,
                                                likes: c.likes?.some((i:any) => i.userId === logged?.id)
                                                ? c.likes.filter((i:any)  => i.userId !== logged?.id)
                                                : [...(c.likes || []), { userId: logged?.id }]
                                            }
                                            : c
                                        )
                                    );
                                }}
                                className={`cursor-pointer size-5
                                    ${liked
                                        ? "text-rose-600 fill-rose-600"
                                        : "fill-gray-500 text-gray-600"}`}
                                        />
                                <span className='text-gray-500 text-sm'>
                                    {comment.likes.length>0 &&
                                     comment.likes.length}
                                </span>
                            </div>
                            </div>
                            {comment?.userId === logged?.id && (<button
                                onClick={() => {
                                    toast.promise(dispatch(fetchDeleteComments({
                                        commentId:comment.id,targetType:"sunna"
                                    })).unwrap(),
                                    {
                                        loading: "جاري الحذف...",
                                        success: "تم حذف التعليق",
                                        error: (err) => err || "خطأ",
                                    })
                                }}
                                className="text-red-400 hover:text-red-600 dark:hover:text-red-500 text-xs font-medium transition-colors flex items-center gap-1"
                            >
                                حذف
                            </button>)}
                            </div>
                        </div>
                    )})
                    ) : (
                    <p className="text-center text-gray-400 text-sm py-4">لا توجد تعليقات بعد.</p>
                    )}
                </div>

            {getLoading && (
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
            <form 
                className="flex gap-2 w-full items-center dark:bg-white/20 bg-white p-2 rounded-lg shadow-sm border border-gray-200"
                >
                <input 
                    id='sunna-input'
                    onChange={(e)=>setComment(e.target.value)}
                    value={comment}
                    placeholder='أضف تعليق...'
                    className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button
                   onClick={()=>{
                    if(!comment) return toast.error("من فضلك اضف تعليقا");
                    const mentions =extractMentions(comment)
                    toast.promise(dispatch(fetchSendComments({
                        comment,targetId:sunna.id,targetType:"sunna",
                        parentCommentId:replyTo?.commentId,mentions 
                    })).unwrap(),
                    {
                        loading: "جاري الإرسال...",
                        success: "تم إرسال التعليق",
                        error: (err) => err || "خطأ",
                    })
                }}
                disabled={sendLoading}
                    className='flex gap-1 dark:bg-gray-500 items-center cursor-pointer bg-gray-800 text-white px-2 py-1 rounded
                    disabled:cursor-pointer-none disabled:opacity-50'
                    type="button"
                >
                    إرسال <Pencil className='size-4'/>
                </button>
            </form>
        </div>
        </div>
  )
}
