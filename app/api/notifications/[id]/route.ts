import db from "@/db";
import { notificationsTable } from "@/db/schema";
import { isLogged } from "@/lib/logged";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest,
    {params}:{params:Promise<{id:string}>}
) {
    try {
        const user = await isLogged() 
            if (!user) {
                return NextResponse.json({
                    success: false,
                    message: "يرجي تسجيل الدخول أولا" 
                }, { status: 401 });
            }
        const {id}=await params
        await db.update(notificationsTable).set({
            isRead:true
        }).where(and(
            eq(notificationsTable.receiverId,user.id),
            eq(notificationsTable.id,id)
        ))
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