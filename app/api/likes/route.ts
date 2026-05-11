import db from "@/db";
import { commentsTable, likesTable, likesTableZodSchema, notificationsTable } from "@/db/schema";
import { isLogged } from "@/lib/logged";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
type targetType="wakafat"|"sunna"|"name"
export async function PATCH(req:NextRequest) {
    try {
       const user = await isLogged() 
       if (!user) {
            return NextResponse.json({
                success: false,
                message: "يرجي تسجيل الدخول أولا" 
            }, { status: 401 });
        }
        const body=await req.json()
        const selectedLike=likesTableZodSchema.omit({
            id:true,
            userId:true
        })
        .parse(body)
        const [existingLike]=await db.select().from(likesTable).where(
            and(
                eq(likesTable.userId,user.id),
                eq(likesTable.commentId,selectedLike.commentId),
                eq(likesTable.targetType,selectedLike.targetType)
            ))
        if(existingLike){
            const [like]=await db.delete(likesTable).where(
                eq(likesTable.id, existingLike.id)
            ).returning()
            const [comment]=await db.select().from(commentsTable)
            .where(eq(commentsTable.id,like.commentId))
            await db.delete(notificationsTable).where(
                and(
                    eq(notificationsTable.receiverId,comment.userId),
                    eq(notificationsTable.senderId,user.id),
                    eq(notificationsTable.contentType,"comment"),
                    eq(notificationsTable.contentId,comment.id),
                    eq(notificationsTable.type,"like"),

                )
            )
            return NextResponse.json({
                success:true
            })
        }
        const [like]=await db.insert(likesTable).values({
            id:crypto.randomUUID(),
            userId:user.id,
            ...selectedLike
        }).returning()
        const [comment]=await db.select().from(commentsTable)
        .where(eq(commentsTable.id,like.commentId))
        if(comment && comment.userId !== user.id){
        await db.insert(notificationsTable).values({
            id: crypto.randomUUID(),
            receiverId:comment.userId,
            senderId: user.id,
            type: "like",
            articleId:like.articleId,
            articleType:comment.targetType,
            contentId: like.commentId,
            contentType: "comment",
            content: `${user.userName} قام بعمل اعجاب لك`,
            isRead: false,
            createdAt: new Date(),
        })}
        return NextResponse.json({
            success:true,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}