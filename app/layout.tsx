import type { Metadata } from "next";
import { Amiri, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/ReduxProvider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${AmiriSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <Toaster position="top-center"/>
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
