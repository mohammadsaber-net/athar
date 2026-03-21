"use client"
import NamesData from "@/components/admin/names/NamesData"
import NamesForm from "@/components/admin/names/NamesForm"
import { NamesType } from "@/lib/type"
import { fetchNames } from "@/redux/slice/namesData"
import { AppDispatch ,RootState} from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function NamesContent() {
  const [create,setCreate]=useState(false)
  const [tableData, setTableData] = useState<NamesType[]|null>(null)
    const dispatch=useDispatch<AppDispatch>()
    const {data}=useSelector((state:RootState)=>state.namesData)
    useEffect(()=>{
      dispatch(fetchNames())
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
      text-white bg-indigo-600 hover:bg-indigo-700">
        اضافة محتوي جديد
      </button>
      <NamesForm
      setCreate={setCreate}
      create={create}
      />
      <NamesData
      tableData={tableData}
      />
    </section>
  )
}
