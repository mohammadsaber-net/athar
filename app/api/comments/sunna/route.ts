import db from "@/db";
import { sunnaCommentTable, sunnaCommentTableZodSchema } from "@/db/schema";
import { isLogged } from "@/lib/logged";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
       const user = await isLogged() 
       if (!user) {
            return NextResponse.json({
                success: false,
                message: "يرجي تسجيل الدخول أولا" 
            }, { status: 401 });
        }
        const body=await req.json()
        const selectedComment=sunnaCommentTableZodSchema.omit({
            id:true,
            createdAt:true
        })
        .parse(body)
        selectedComment.userId=user.id
        const [data]=await db.insert(sunnaCommentTable).values({
            id:crypto.randomUUID(),
            ...selectedComment
        }).returning()
        console.log(data)
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