import db from "@/db"
import { sunnaCommentTable } from "@/db/schema"
import { isAdmin } from "@/lib/isAdmin"
import { isLogged } from "@/lib/logged"
import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest,
    { params }: { params: Promise<{ id: string }> }){
    try {
       const {id}=await params 
       if(!id){
           return NextResponse.json({
                success:false,
                message:'الداتا غير متوفرة'
            },{status:404}) 
        }
        const data=await db.query.sunnaCommentTable.findMany({
            where:(eq(sunnaCommentTable.sunnaId,id)),
            with:{
                user:{
                    columns:{firstName:true , lastName:true}
                }
            }
        })
        return NextResponse.json({
            success:true,
            data
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}
export async function DELETE(req:NextRequest
    ,{params}:{params:Promise<{id:string}>}){
    try {
        const {id}=await params 
        if(!id){
           return NextResponse.json({
                success:false,
                message:'الداتا غير متوفرة'
            },{status:404}) 
        }
        const user=await isLogged() 
        if(!user){
            return NextResponse.json({
                success:false,
                message:'غير مصرح'
            },{status:401}) 
        }
        const [data]=await db.delete(sunnaCommentTable).where(and(eq(sunnaCommentTable.id,id),eq(sunnaCommentTable.userId,user.id))).returning()
        if(!data){
            return NextResponse.json({
                success:false,
                message:'غير مصرح'
            },{status:401}) 
        }
        return NextResponse.json({
            success:true,
        }) 
    } catch (error) {
        return NextResponse.json({
        success:false,
        message:(error as Error).message
        })
    }
}