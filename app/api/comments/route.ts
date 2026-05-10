import db from "@/db";
import { commentsTable, commentTableZodSchema, likesTable, mentionsTable, notificationsTable, usersTable } from "@/db/schema";
import { isLogged } from "@/lib/logged";
import { and, eq, inArray } from "drizzle-orm";
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
        const { searchParams } = new URL(req.url)
        const targetId = searchParams.get("targetId");
        const targetType = searchParams.get("targetType");
        if(!targetId||!targetType){
           return NextResponse.json({
                success: false,
                message: "الكومنت غير موجود" 
            }, { status: 404 }); 
        }
        const result=await db.query.commentsTable.findMany({
            where:(and(
                eq(commentsTable.targetId,targetId),
                eq(commentsTable.targetType,targetType)
            )),
            with:{
                user:{
                    columns:{userName:true,displayName:true}
                }
            }
        })
        const commentsId=result.map((c)=>c.id)
        const likes=await db.select().from(likesTable)
        .where(inArray(likesTable.commentId,commentsId))
        const data = result.map((comment) => {
            return {
                ...comment,
                likes: likes.filter((l) => l.commentId === comment.id),
            };
        });
        return NextResponse.json({
            success:true,
            data
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}
export async function POST(req:NextRequest) {
    try {
       const user = await isLogged() 
       if (!user) {
            return NextResponse.json({
                success: false,
                message: "يرجي تسجيل الدخول أولا" 
            }, { status: 401 });
        }
        const body=await req.json()
        const {mentions,...rest}=body
        const selectedComment=commentTableZodSchema.omit({
            id:true,
            createdAt:true,
            userId:true
        })
        .parse(rest)
        const [comment]=await db.insert(commentsTable).values({
            id:crypto.randomUUID(),
            ...selectedComment,
            userId:user.id,
            createdAt: new Date()
        }).returning()
        if(mentions.length>0){
            const users = await db.query.usersTable.findMany({
                where: inArray(usersTable.userName, mentions),
            });
            await db.insert(mentionsTable).values(
                users.map(u => ({
                id: crypto.randomUUID(),
                commentId: comment.id,
                mentionedUserId: u.id,
                }))
            );
            await db.insert(notificationsTable).values(
            users.map((u) => ({
                id: crypto.randomUUID(),
                receiverId: u.id,
                senderId: user.id,
                type: "mention",
                contentId: comment.id,
                contentType: "comment",
                content: `${user.userName} قام بعمل منشن لك`,
                isRead: false,
                createdAt: new Date(),
            }))
        );
        }
        return NextResponse.json({
            success:true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}
export async function DELETE(req:NextRequest) {
    try {
       const user = await isLogged() 
       if (!user) {
            return NextResponse.json({
                success: false,
                message: "يرجي تسجيل الدخول أولا" 
            }, { status: 401 });
        }
        const { searchParams } = new URL(req.url)
        const commentId = searchParams.get("commentId");
        const targetType = searchParams.get("targetType");
        if(!commentId||!targetType){
           return NextResponse.json({
                success: false,
                message: "الكومنت غير موجود" 
            }, { status: 404 }); 
        }
        await db.delete(commentsTable)
        .where(and(
            eq(commentsTable.id,commentId),
            eq(commentsTable.targetType,targetType)
        ))
        return NextResponse.json({
            success:true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}