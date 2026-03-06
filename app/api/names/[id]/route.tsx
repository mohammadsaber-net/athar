import db from "@/db";
import { namesTable, namesTableZodSchema } from "@/db/schema";
import cloudinary from "@/lib/utls";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{ params }: { params: { id: string } }) {
    try {
        const {id}=await params
        if(!id){
           return NextResponse.json({
                success:false,
                message:'الداتا المطلوب حذفها غير متوفرة'
            },{status:404}) 
        }
        await db.delete(namesTable).where(eq(namesTable.id,id))
        return NextResponse.json({
            success:true
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}
export async function PATCH(req:NextRequest,{params}:{params:{id:string}}){
    try {
       const {id}=await params 
       if(!id){
           return NextResponse.json({
                success:false,
                message:'الداتا المطلوب حذفها غير متوفرة'
            },{status:404}) 
        }
        const formData = await req.formData();
            const imageFile = formData.get("image") as File;
            if (!imageFile || imageFile.size === 0) {
            return NextResponse.json(
                { success: false, message: "الصورة مطلوبة" },
                { status: 400 }
            );
        }
        let uploadedImages: string = "";
        if(imageFile && imageFile.size > 0){
            const buffering = await imageFile.arrayBuffer();
            const buffer = Buffer.from(buffering);
            const upload = await cloudinary.uploader.upload(
                `data:${imageFile.type};base64,${buffer.toString("base64")}`
            );
            uploadedImages = upload.secure_url;
        }
        const selectedNames=namesTableZodSchema.omit({id:true}).parse({
            name:formData.get("name") as string,
            meaning:formData.get("meaning") as string,
            meaningSource:formData.get("meaningSource") as string,
            image:uploadedImages
        })
        await db.update(namesTable).set({
            ...selectedNames
        }).where(eq(namesTable.id,id))
        return NextResponse.json({
            success:true
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:(error as Error).message
        })
    }
}