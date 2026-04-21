import db from "@/db"
import { namesTable, sunnaTable, wakafatTable } from "@/db/schema"
import { ilike, or, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest) {
    try {
        const {searchTerm}=await req.json()
         if(!searchTerm.trim()) return NextResponse.json({
            success:false,
            message:"يرجى إدخال كلمة للبحث"
         })
        const sunna=await db.select().from(sunnaTable).where(
        or(
            ilike(sunnaTable.sunna, `%${searchTerm}%`),
            ilike(sunnaTable.tafsir, `%${searchTerm}%`)
        ))
        const wakafat=await db.select().from(wakafatTable).where(
        or(
            ilike(wakafatTable.aya, `%${searchTerm}%`),
            ilike(wakafatTable.tafsir, `%${searchTerm}%`)
        ))
        const name=await db.select().from(namesTable).where(
        or(
            ilike(namesTable.name, `%${searchTerm}%`),
            ilike(namesTable.meaning, `%${searchTerm}%`)
        ))
        return NextResponse.json({
            success:true,
            data:[...sunna.map((item)=>({title:item.sunna,href:`sunna/${item.id}`})),
            ...wakafat.map((item)=>({title:item.aya,href:`wakafat/${item.id}`})),
            ...name.map((item)=>({title:item.name,href:`name/${item.id}`}))]
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}