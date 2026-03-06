"use client"
import DataHero from "@/components/admin/heroContent/DataHero"
import HeroForm, { HeroFormData } from "@/components/admin/heroContent/HeroForm"
import { fetchHero } from "@/redux/slice/heroData"
import { AppDispatch ,RootState} from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
export type HeroType =HeroFormData &{id:string}
export default function HeroContent() {
  const [create,setCreate]=useState(false)
  const [tableData, setTableData] = useState<HeroType[]|null>(null)
    const dispatch=useDispatch<AppDispatch>()
    const {data}=useSelector((state:RootState)=>state.heroData)
    useEffect(()=>{
      dispatch(fetchHero())
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
      <HeroForm 
      setCreate={setCreate}
      create={create}
      />
      <DataHero
      tableData={tableData}
      />
    </section>
  )
}
