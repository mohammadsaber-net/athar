import db from "@/db";
import { sunnaTable, sunnaTableZodSchema } from "@/db/schema";
import { isAdmin } from "@/lib/isAdmin";
import { nanoid } from "@reduxjs/toolkit";
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
        const admin=await isAdmin()
        if(!admin){
            return NextResponse.json({
                success:false,
                message:'غير مصرح'
            },{status:401}) 
        }
        const selectedWakafat=sunnaTableZodSchema.omit({
                id:true,
                shortId:true
            }).parse(await req.json())
        const [data]=await db.insert(sunnaTable).values({
            id:crypto.randomUUID(),
            shortId:nanoid(3),
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