import db from "@/db";
import { notificationsTable } from "@/db/schema";
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
        const data=await db.select().from(notificationsTable)
        .where(and(
            eq(notificationsTable.receiverId,user.id),
            eq(notificationsTable.isRead,false)
            ))
        return NextResponse.json({
            number:data.length
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}