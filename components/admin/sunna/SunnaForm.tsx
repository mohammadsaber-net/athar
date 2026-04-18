"use client";

import FixedModal from "@/components/animation/FixedModal";
import { SunnaFormData,SunnaType} from "@/lib/type";
import { fetchWakafat } from "@/redux/slice/wakafatData";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { useQuill } from "react-quilljs";
import { useDispatch } from "react-redux";
// @ts-ignore
import "quill/dist/quill.snow.css";
type Props={
  setCreate?:(value:boolean)=>void|undefined,
  setEdit?:(value:SunnaType|null)=>void,
  edit?:SunnaType|null,
  create?:boolean
}
export default function SunnaForm({setCreate,setEdit,edit,create}:Props) {
  const [formData, setFormData] = useState<SunnaFormData>({
    sunna: edit?.sunna||"",
    sunnaSource: edit?.sunnaSource||"",
    tafsir: edit?.tafsir||""
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
        const res=await fetch("/api/sunna",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    }) 
    const data=await res.json()
    if(data.success){
      setCreate?.(false)
      setEdit?.(null)
      dispatch(fetchWakafat())
    }else{
      toast.error(data.message||"خطأ في اضافة محتوي جديد")
    }
    } catch (error) {
      toast.error((error as Error).message||"خطأ في اضافة محتوي جديد")
    }
  }else{
    try {
      const res=await fetch(`/api/sunna/${edit?.id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json()
      if(data.success){
        setCreate?.(false)
        setEdit?.(null)
        dispatch(fetchWakafat())
      }else{
        toast.error(data.message||"خطأ في تعديل المحتوي")
      }
    } catch (error) {
      toast.error((error as Error).message||"خطأ في تعديل المحتوي")
    }
  }
  }
  const { quill, quillRef } = useQuill({
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          [{ color: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
    });
    useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setFormData((prev) => ({
          ...prev,
          tafsir: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);
    useEffect(() => {
      if (quill && edit?.tafsir) {
        quill.clipboard.dangerouslyPasteHTML(edit.tafsir);
      }
    }, [quill, edit]);
  return (
    <FixedModal isOpen={!!edit || !!create} onClose={()=>{setEdit?.(null);setCreate?.(false)}}>
    <form
      onSubmit={handleSubmit}
      className="max-w-xl bg-white text-indigo-600 mx-auto space-y-4 relative "
    >
      <h2 className="text-center text-xl md:text-2xl mb-4 text-blue-800 font-bold">{edit?"تعديل":"إضافة"} محتوى</h2>
      <textarea
        name="sunna"
        placeholder="السنه"
        value={formData.sunna}
        onChange={handleChange}
        required
        className="w-full p-2 focus:border-blue-500 outline-none border border-gray-300 resize-none rounded min-h-[80px]"
      />

      <input
        type="text"
        name="sunnaSource"
        placeholder="مصدر السنه"
        value={formData.sunnaSource}
        onChange={handleChange}
        required
        className="w-full p-2 focus:border-blue-500 outline-none border border-gray-300 rounded"
        />

      <div className="border rounded-md bg-white">
          <div className="h-[200px] overflow-y-auto">
            <div ref={quillRef} />
          </div>
        </div>
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
