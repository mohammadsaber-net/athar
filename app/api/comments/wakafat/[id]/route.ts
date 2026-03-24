import db from "@/db"
import { wakafatCommentTable } from "@/db/schema"
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
        const data=await db.query.wakafatCommentTable.findMany({
            where:(eq(wakafatCommentTable.wakafatId,id)),
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