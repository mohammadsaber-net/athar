import db from "@/db";
import { heroTable, heroTableZodSchema, sunnaTable, wakafatTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) {
    try {
        const [wakfa]=await db.select({
            aya:wakafatTable.aya,
            id:wakafatTable.id,
            ayaSource:wakafatTable.ayaSource
        }).from(wakafatTable)
        .orderBy(sql`RANDOM()`).limit(1)
        const [hadith]=await db.select({
            sunna:sunnaTable.sunna,
            id:sunnaTable.id,
            sunnaSource:sunnaTable.sunnaSource
        }).from(sunnaTable)
        .orderBy(sql`RANDOM()`).limit(1)
        return NextResponse.json({
            success:true,
            data:{wakfa,hadith}
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}
export async function POST(req:NextRequest){
    try {
        const selectedHero=heroTableZodSchema.omit({id:true}).parse(await req.json())
        const [data]=await db.insert(heroTable).values({
            id:crypto.randomUUID(),
            ...selectedHero
        }).returning()
        return NextResponse.json({
            success:true,
            data
        }, {status:201})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}