"use client";

import { HeroType } from "@/app/admin/hero/page";
import FixedModal from "@/components/animation/FixedModal";
import { fetchHero } from "@/redux/slice/heroData";
import { AppDispatch } from "@/redux/store";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";
export type HeroFormData = {
  aya: string;
  ayaSource: string;
  hadith: string;
  hadithSource: string;
};
type Props={
  setCreate?:(value:boolean)=>void|undefined,
  setEdit?:(value:HeroType|null)=>void,
  edit?:HeroType|null,
  create?:boolean
}
export default function HeroForm({setCreate,setEdit,create,edit}:Props) {
  const [formData, setFormData] = useState<HeroFormData>({
    aya: edit?.aya||"",
    ayaSource: edit?.ayaSource||"",
    hadith: edit?.hadith||"",
    hadithSource: edit?.hadithSource||"",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }
  const dispatch=useDispatch<AppDispatch>()
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(!edit){
      try {
        const res=await fetch("/api/hero",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    }) 
    const data=await res.json()
    if(data.success){
      setCreate?.(false)
      dispatch(fetchHero())
    }else{
      toast.error(data.message||"خطأ في اضافة محتوي جديد")
    }
    } catch (error) {
      toast.error((error as Error).message||"خطأ في اضافة محتوي جديد")
    }
  }else{
    try {
      const res=await fetch(`/api/hero/${edit?.id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json()
      if(data.success){
        setEdit?.(null)
        dispatch(fetchHero())
      }else{
        toast.error(data.message||"خطأ في تعديل المحتوي")
      }
    } catch (error) {
      toast.error((error as Error).message||"خطأ في تعديل المحتوي")
    }
  }
  }

  return (
    <FixedModal isOpen={!!edit || !!create} onClose={()=>{setEdit?.(null);setCreate?.(false)}}>
    <form
      onSubmit={handleSubmit}
      className="max-w-xl bg-white text-indigo-600 mx-auto space-y-4 relative"
    >
      <h2 className="text-center text-xl md:text-2xl mb-4 text-blue-800 font-bold">{edit?"تعديل":"إضافة"} محتوى</h2>
      <textarea
        name="aya"
        placeholder="الآية"
        value={formData.aya}
        onChange={handleChange}
        required
        className="w-full p-2 focus:border-blue-500 outline-none border border-gray-300 resize-none rounded min-h-[80px]"
      />

      <input
        type="text"
        name="ayaSource"
        placeholder="مصدر الآية (السورة : الآية)"
        value={formData.ayaSource}
        onChange={handleChange}
        required
        className="w-full p-2 focus:border-blue-500 outline-none border border-gray-300 rounded"
        />

      <textarea
        name="hadith"
        placeholder="الحديث"
        value={formData.hadith}
        onChange={handleChange}
        required
        className="w-full p-2 focus:border-blue-500 outline-none border border-gray-300 resize-none min-h-[80px]"
      />

      <input
        type="text"
        name="hadithSource"
        placeholder="مصدر الحديث"
        value={formData.hadithSource}
        onChange={handleChange}
        required
        className="w-full p-2 focus:border-blue-500 outline-none border border-gray-300 rounded"
      />
      <div className="flex gap-4 justify-start items-center">
      <button
        type="submit"
        className=" bg-blue-600 text-white py-2 cursor-pointer px-4 rounded-md hover:opacity-90"
        >
        حفظ
      </button>
      <button
      onClick={() => {setCreate?.(false);setEdit?.(null);}}
      type="button"
      className=" bg-red-500 text-white py-2 px-4 cursor-pointer rounded-md hover:opacity-90"
      >
       إلغاء
      </button>
      </div>
    </form>
    </FixedModal>
  );
}
