import db from "@/db";
import { namesTable, namesTableZodSchema } from "@/db/schema";
import cloudinary from "@/lib/utls";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) {
    try {
        const data=await db.select().from(namesTable)
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
        const [data]=await db.insert(namesTable).values({
            id:crypto.randomUUID(),
            ...selectedNames
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