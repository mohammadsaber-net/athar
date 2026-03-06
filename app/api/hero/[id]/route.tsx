import db from "@/db";
import { heroTable, heroTableZodSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{ params }: { params: { id: string } }) {
    try {
        const {id}=await params
        if(!id){
           return NextResponse.json({
                success:false,
                message:'الداتا المطلوب حذفها غير متوفرة'
            },{status:404}) 
        }
        await db.delete(heroTable).where(eq(heroTable.id,id))
        return NextResponse.json({
            success:true
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}
export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){
    try {
       const {id}=await params 
       if(!id){
           return NextResponse.json({
                success:false,
                message:'الداتا المطلوب حذفها غير متوفرة'
            },{status:404}) 
        }
        const selectedHero=heroTableZodSchema.omit({id:true}).parse(await req.json())
        await db.update(heroTable).set({
            ...selectedHero
        }).where(eq(heroTable.id,id))
        return NextResponse.json({
            success:true
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}