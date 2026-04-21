"use client"
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchInput() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, searchedData] = useState<any | null>(null);
    const handleSearch =async () => {
        if(!searchTerm.trim()) return toast.error("يرجى إدخال كلمة للبحث");
        setLoading(true)
        try {
            const res =await fetch(`/api/search`,{
                method:"POST",
                body:JSON.stringify({searchTerm})
            })
            const data=await res.json()
            if(data.success){
                searchedData(data.data)
                console.log(data.data)
            }else{
                searchedData(null)
                toast.error(data.message||"لم يتم العثور على نتائج")
            }
        } catch (error) {
            searchedData(null)
            toast.error((error as Error).message||"حدث خطأ أثناء البحث")
        }
        setLoading(false)
    };
  return (
    <div className="max-w-xl w-fit p-1 md:p-3 shadow-md mx-auto rounded-lg 
    md:bg-white/30 bg-white/10">
      <form className="flex items-center">
        <input type="text"
        onChange={(e)=>setSearchTerm(e.target.value)} 
        placeholder="ابحث عن أسماء الله, آيات من كتاب الله, سنن مهجورة"
         className="px-3 md:px-6 bg-white outline-none md:w-96 
         rounded-md py-2 placeholder:font-normal
         placeholder:text-[#1a3636] md:placeholder:font-semibold"/>
        <button 
        onClick={handleSearch}
        className="bg-[#1a3636] cursor-pointer px-2 md:px-6 py-2 rounded-md 
        -ms-2 text-white flex items-center md:gap-2"
        type="button">
             بحث <Search />
        </button>
      </form>
      {(loading||data)&&<div>
        {loading&&<div className='flex justify-center gap-1'>
        {[0, 1, 2].map((i) => (
            <span
            key={i}
            className="size-3 bg-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
            />
        ))}
        </div>}
        <div className="bg-zinc-100 p-2">
            {data?.length>0&&data.map((item:any)=>(
                <Link key={item.href} className="border-b py-2" 
                href={`/${item.href}`}>
                    <h3 className="font-bold border-b shadow rounded border-[#c9a24d] text-[#1a3636] text-lg">{item.title.slice(0,50)}...</h3>
                </Link>
            ))}
        </div>
      </div>}
    </div>
  )
}
