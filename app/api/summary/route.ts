import db from "@/db";
import { namesTable, sunnaTable, wakafatTable} from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) {
    try {
        const sunna=await db.select().from(sunnaTable).orderBy(sql`RANDOM()`).limit(2)
        const wakafat=await db.select().from(wakafatTable).orderBy(sql`RANDOM()`).limit(2)
        const name=await db.select().from(namesTable).orderBy(sql`RANDOM()`).limit(2)
        return NextResponse.json({
            success:true,
            data:{sunna,wakafat,name}
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}