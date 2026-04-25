import db from "@/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req:NextRequest) {
    try {
        const {email,password}=await req.json()
        const [User]=await db.select().from(usersTable)
        .where(eq(usersTable.email,email))
        if(!User){
            return NextResponse.json({
                success:false,
                message:"الايميل غير صحيح"
            })
        }
        const isMatch=await bcrypt.compare(password,User.password)
        if(!isMatch) {
            return NextResponse.json({
                success:false,
                message:"كلمة السر غير صحيحة"
            })
        }
        const token=jwt.sign(
            {
                email:User.email,
                id:User.id,
                role:User.role
            },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn:"7d"
            }
        )
        const response = NextResponse.json({
            success: true,
            role:User.role
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