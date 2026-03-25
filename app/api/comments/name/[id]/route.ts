import db from "@/db"
import { namesCommentTable } from "@/db/schema"
import { isAdmin } from "@/lib/isAdmin"
import { eq } from "drizzle-orm"
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
        const data=await db.query.namesCommentTable.findMany({
            where:(eq(namesCommentTable.nameId,id)),
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
        const admin=await isAdmin() 
        if(!admin){
            return NextResponse.json({
                success:false,
                message:'غير مصرح'
            },{status:401}) 
        }
        await db.delete(namesCommentTable).where(eq(namesCommentTable.id,id))
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