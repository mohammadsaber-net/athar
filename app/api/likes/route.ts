import db from "@/db";
import { likesTable, likesTableZodSchema } from "@/db/schema";
import { isLogged } from "@/lib/logged";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) {
    try {
        const user = await isLogged() 
       if (!user) {
            return NextResponse.json({
                success: false,
                message: "يرجي تسجيل الدخول أولا" 
            }, { status: 401 });
        }
        const { searchParams } = new URL(req.url);
        const targetId = searchParams.get("targetId");
        const targetType = searchParams.get("targetType");
        if ( !targetId || !targetType) {
        return NextResponse.json({
            success: false,
            message: "Missing params",
        }, { status: 400 });
        }
        const data=await db.select().from(likesTable).where(
            and(
                eq(likesTable.targetId,targetId),
                eq(likesTable.targetType,targetType as any)
            ))
        return NextResponse.json({
            success:true,
            count: data.length,
            likedByUser: data.some(num => num.userId === user.id)
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}
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
            id:true
        })
        .parse(body)
        selectedLike.userId=user.id
        const [existingLike]=await db.select().from(likesTable).where(
            and(
                eq(likesTable.userId,user.id),
                eq(likesTable.targetId,selectedLike.targetId)
            ))
        if(existingLike){
            await db.delete(likesTable).where(
                eq(likesTable.id, existingLike.id)
            );
            return NextResponse.json({
                success:true
            })
        }
        await db.insert(likesTable).values({
            id:crypto.randomUUID(),
            ...selectedLike
        })
        return NextResponse.json({
            success:true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}