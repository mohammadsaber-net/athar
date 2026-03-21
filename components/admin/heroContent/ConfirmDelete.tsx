"use client"
import FixedModal from "@/components/animation/FixedModal"
import { HeroType } from "@/lib/type"
import { fetchHero } from "@/redux/slice/heroData"
import { AppDispatch } from "@/redux/store"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

type Props ={
    setDelete:any,
    deletion:HeroType|null
}
export default function ConfirmDelete({setDelete,deletion}:Props) {
    const dispatch=useDispatch<AppDispatch>()
    const handleDelete=async()=>{
        try {
        const res=await fetch(`/api/hero/${deletion?.id}`,{method:"DELETE"})
        const data=await res.json()
        if(data.success){
            toast.success("تم الحذف بنجاح")
            dispatch(fetchHero())
            setDelete(null)
        }else{
            toast.error(data.message||"تعذر الحذف")
        } 
        } catch (error) {
            toast.error((error as Error).message||"تعذر الحذف")
        }
    }
  return (
    <FixedModal isOpen={!!deletion} onClose={()=>setDelete(null)}>
        <h2 className="text-xl text-gray-800 mb-4 md-text-2xl">
            تأكيد حذف {deletion?.ayaSource} و  حديث { deletion?.hadith.slice(0,20)}... ؟
        </h2>
        <div className="flex gap-4 justify-start items-center">
            <button
            onClick={()=>handleDelete()}
            type="button"
            className=" bg-red-600 text-white py-1 cursor-pointer px-5 rounded-md hover:opacity-90"
            >
                حذف
            </button>
            <button
            onClick={() => setDelete(null)}
            type="button"
            className=" bg-blue-500 text-white py-1 px-5 cursor-pointer rounded-md hover:opacity-90"
            >
            إلغاء
            </button>
      </div>
      </FixedModal>
  )
}
