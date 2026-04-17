"use client"
import SunnaData from "@/components/admin/sunna/SunnaData"
import SunnaForm from "@/components/admin/sunna/SunnaForm"
import { SunnaType} from "@/lib/type"
import { fetchSunna } from "@/redux/slice/sunnaData"
import { AppDispatch ,RootState} from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function SunnaContent() {
  const [create,setCreate]=useState(false)
  const [tableData, setTableData] = useState<SunnaType[]|null>(null)
    const dispatch=useDispatch<AppDispatch>()
    const {data}=useSelector((state:RootState)=>state.sunnaData)
    useEffect(()=>{
      dispatch(fetchSunna())
    },[])
    useEffect(()=>{
      if(data){
        setTableData(data)
      }
    },[data])
  return (
    <section className="mt-16">
      <button 
      onClick={()=>setCreate(true)}
      className="px-3 py-2 rounded cursor-pointer 
      mb-4
      text-white bg-[#0f3d2e] hover:bg-[#0f3d2e]/70">
        اضافة محتوي جديد
      </button>
      <SunnaForm
      setCreate={setCreate}
      create={create}
      />
      <SunnaData
      tableData={tableData}
      />
    </section>
  )
}
