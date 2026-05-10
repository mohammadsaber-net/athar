import db from "@/db";
import { notificationsTable } from "@/db/schema";
import { isLogged } from "@/lib/logged";
import { eq } from "drizzle-orm";
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
        .where(eq(notificationsTable.receiverId,user.id))
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