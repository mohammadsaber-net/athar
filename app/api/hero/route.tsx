import db from "@/db";
import { heroTable, heroTableZodSchema } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) {
    try {
        const data=await db.select().from(heroTable)
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