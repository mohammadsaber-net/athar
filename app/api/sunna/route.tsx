import db from "@/db";
import { sunnaTable, sunnaTableZodSchema } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) {
    try {
        const data=await db.select().from(sunnaTable)
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
        const selectedWakafat=sunnaTableZodSchema.omit({id:true}).parse(await req.json())
        const [data]=await db.insert(sunnaTable).values({
            id:crypto.randomUUID(),
            ...selectedWakafat
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