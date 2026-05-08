import db from "@/db";
import { likesTable, likesTableZodSchema } from "@/db/schema";
import { isLogged } from "@/lib/logged";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
type targetType="wakafat"|"sunna"|"name"
export async function PATCH(req:NextRequest) {
    try {
       const user = await isLogged() 
       if (!user) {
            return NextResponse.json({
                success: false,
                message: "يرجي تسجيل الدخول أولا" 
            }, { status: 401 });
        }
        const body=await req.json()
        const selectedLike=likesTableZodSchema.omit({
            id:true,
            userId:true
        })
        .parse(body)
        const [existingLike]=await db.select().from(likesTable).where(
            and(
                eq(likesTable.userId,user.id),
                eq(likesTable.commentId,selectedLike.commentId),
                eq(likesTable.targetType,selectedLike.targetType)
            ))
        if(existingLike){
            await db.delete(likesTable).where(
                eq(likesTable.id, existingLike.id)
            )
            return NextResponse.json({
                success:true
            })
        }
        await db.insert(likesTable).values({
            id:crypto.randomUUID(),
            userId:user.id,
            ...selectedLike
        })
        return NextResponse.json({
            success:true,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}