"use client";
import FixedModal from "@/components/animation/FixedModal";
// @ts-ignore
import "quill/dist/quill.snow.css";
import { NamesFormData, NamesType } from "@/lib/type";
import { fetchNames } from "@/redux/slice/namesData";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"
import { useDispatch } from "react-redux";
import { useQuill } from "react-quilljs";
type Props={
  setCreate?:(value:boolean)=>void|undefined,
  setEdit?:(value:NamesType|null)=>void,
  edit?:NamesType|null,
  create?:boolean
}
export default function NamesForm({setCreate,setEdit,edit,create}:Props) {
  const [formData, setFormData] = useState<NamesFormData>({
    name: edit?.name||"",
    image: edit?.image || null,
    meaning: edit?.meaning||"",
    meaningSource: edit?.meaningSource||"",
  });

  function handleChange(e:any) {
    const { name, value } = e.target;
    if(name==="image"&& e.target instanceof HTMLInputElement && e.target.type === "file"){
      setFormData(prev=>({
        ...prev,
        [name]: e.target.files.length > 0 ? e.target.files[0] : null,
      }))
    }else{
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  }
  const dispatch=useDispatch<AppDispatch>()
  async function handleSubmit(e: any) {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("meaning", formData.meaning);
    formPayload.append("meaningSource", formData.meaningSource!);
    if(formData.image){
      formPayload.append("image", formData.image);
    }
    if(!edit){
      try {
        const res=await fetch("/api/names",{
      method:"POST",
      body:formPayload
    }) 
    const data=await res.json()
    if(data.success){
      setCreate?.(false)
      setEdit?.(null)
      dispatch(fetchNames())
    }else{
      toast.error(data.message||"خطأ في اضافة محتوي جديد")
    }
    } catch (error) {
      toast.error((error as Error).message||"خطأ في اضافة محتوي جديد")
    }
  }else{
    try {
      const res=await fetch(`/api/names/${edit?.id}`,{
        method:"PATCH",
        body:formPayload
      })
      const data=await res.json()
      if(data.success){
        setEdit?.(null)
        setCreate?.(false)
        dispatch(fetchNames())
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
        meaning: quill.root.innerHTML,
      }));
    });
  }
}, [quill]);
  useEffect(() => {
    if (quill && edit?.meaning) {
      quill.clipboard.dangerouslyPasteHTML(edit.meaning);
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
        name="name"
        placeholder="الاسم"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 focus:border-blue-500 outline-none border border-gray-300 resize-none rounded min-h-[80px]"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required={!edit}
        className="w-full p-2 focus:border-blue-500 outline-none border border-gray-300 rounded"
      />
        <div className="border rounded-md bg-white">
          <div className="h-[200px] overflow-y-auto">
            <div ref={quillRef} />
          </div>
        </div>
      <input
        type="text"
        name="meaningSource"
        placeholder="مصدر التفسير"
        value={formData.meaningSource!}
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
