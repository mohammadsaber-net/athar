import { NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }
    console.log("Sending email with Resend:", { name, email, message });
   await resend.emails.send({
  from: "Contact Form <onboarding@resend.dev>",
  to: "m4567s019283@gmail.com",
  subject: `📩 رسالة من ${name}`,
  html: `
    <div style="font-family: Arial; line-height:1.6">
      <h2>📩 رسالة جديدة من الموقع</h2>
      <p><strong>الاسم:</strong> ${name}</p>
      <p><strong>الإيميل:</strong> ${email}</p>
      <hr/>
      <p><strong>الرسالة:</strong></p>
      <p>${message}</p>
    </div>
  `,
});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}