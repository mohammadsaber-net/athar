import type { Metadata } from "next";
import { Amiri, Geist_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/ReduxProvider";
import { isAdmin } from "@/lib/isAdmin";
import Link from "next/link";
import { PencilIcon } from "lucide-react";
import Footer from "@/components/footer/Footer";
import MainNav from "@/components/header/MainNav";
const AmiriSans = Amiri({
  weight: "400",
  variable: "--font-amiri",
  subsets: ["arabic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "أثار",
  description:`وَجَعَلْنَا مِنْهُمْ أَئِمَّةً يَهْدُونَ بِأَمْرِنَا لَمَّا صَبَرُوا وَكَانُوا بِآيَاتِنَا يُوقِنُونَ" (السجدة: 24)"
  ليس هناك شرف في هذه الحياة أعظم من الدعوة إلي الله والعمل بذلك وهي منزلة الأئمة الصديقين
  `
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const admin=await isAdmin()
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${AmiriSans.variable} ${geistMono.variable} relative antialiased`}
      >
        <ReduxProvider>
        <Toaster position="top-center"/>
        {admin&&<Link
          className="fixed left-6 z-[100000] items-center bg-[#6366f1]/90 shadow
           top-1/2 -translate-y-1/2 font-bold text-white md:text-xl px-3 py-2 rounded flex"
          href={"/admin"}>
             <PencilIcon />
        </Link>}
        {children}
        <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
