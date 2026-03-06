import db from "@/db";
import { wakafatTable, wakafatTableZodSchema } from "@/db/schema";
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
        await db.delete(wakafatTable).where(eq(wakafatTable.id,id))
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
        const selectedWakafat=wakafatTableZodSchema.omit({id:true}).parse(await req.json())
        await db.update(wakafatTable).set({
            ...selectedWakafat
        }).where(eq(wakafatTable.id,id))
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