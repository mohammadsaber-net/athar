"use client"
import WakafatData from "@/components/admin/wakafat/WakafatData"
import WakafatForm, { WakafatFormData } from "@/components/admin/wakafat/WakafatForm"
import { fetchWakafat } from "@/redux/slice/wakafatData"
import { AppDispatch ,RootState} from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
export type WakafatType =WakafatFormData &{id:string}
export default function WakafatContent() {
  const [create,setCreate]=useState(false)
  const [tableData, setTableData] = useState<WakafatType[]|null>(null)
    const dispatch=useDispatch<AppDispatch>()
    const {data}=useSelector((state:RootState)=>state.wakafatData)
    useEffect(()=>{
      dispatch(fetchWakafat())
    },[])
    useEffect(()=>{
      if(data){
        setTableData(data)
      }
    },[data])
  return (
    <section>
      <button 
      onClick={()=>setCreate(true)}
      className="px-3 py-2 rounded cursor-pointer 
      mb-4
      text-white bg-[#0f3d2e] hover:bg-[#0f3d2e]/70">
        اضافة محتوي جديد
      </button>
      <WakafatForm
      setCreate={setCreate}
      create={create}
      />
      <WakafatData
      tableData={tableData}
      />
    </section>
  )
}
