import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({ success:true,message: "تم تسجيل الخروج" });
    response.cookies.set({
      name: "token",
      value: "",
      path: "/",
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "strict"
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { success:true,message: "حدث خطأ أثناء تسجيل الخروج" },
      { status: 500 }
    );
  }
}