import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { usersTable, userTableZodSchema } from "@/db/schema";
import db from "@/db";
import { eq } from "drizzle-orm";
export async function GET(req:NextRequest) {
    try {
        const data=await db.select().from(usersTable)
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
        const body =await req.json() as any;
        const [existingUser]=await db.select()
        .from(usersTable).where(eq(usersTable.email,body.email))
        if(existingUser){
            return NextResponse.json({
                success:false,
                message:"البريد الإلكتروني مستخدم بالفعل"
            })
        }
        const userId = crypto.randomUUID()
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const token=jwt.sign(
            {
                email:body.email,
                id:userId,
                role:body.role
            },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn:"7d"
            }
        )
        const selectedUser=userTableZodSchema.omit({id:true})
        .parse({...body,password:hashedPassword,createdAt:new Date()})
        await db.insert(usersTable).values({
            id:userId,
            ...selectedUser
        })
        const response = NextResponse.json({
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/"
        });
        return response;
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}