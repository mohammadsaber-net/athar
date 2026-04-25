import db from "@/db";
import { messageTable, messageTableZodSchema } from "@/db/schema";
import { isAdmin } from "@/lib/isAdmin";
import { NextResponse } from "next/server";
export async function GET(){
  try {
    const admin=await isAdmin() 
    if(!admin){
      return NextResponse.json({
        success:false,
        message:'غير مصرح'
      },{status:401}) 
    }
   const data = await db.select().from(messageTable)
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("FULL ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const selectedData= messageTableZodSchema.omit({id:true}).parse(await req.json())
    await db.insert(messageTable).values({
      id:crypto.randomUUID(),
      ...selectedData
    })
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("FULL ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}