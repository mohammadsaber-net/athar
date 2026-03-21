"use client"
import MainNav from "@/components/header/MainNav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function UserForm() {
  const redirect=useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
    const res=await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success){
      toast.success("تم انشاء المستخدم بنجاح")
      redirect.push("/")
    }else{
      toast.error(data.message||"خطأ في التسجيل")
    }
    } catch (error) {
      toast.error((error as Error).message||"خطأ في التسجيل")
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen py-6 px-4">
    <MainNav />
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-14 md:mt-10 bg-[#0f3d2e]/10 backdrop-blur-md rounded-xl p-6 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-[#c9a24d] text-center mb-4">
        تسجيل دخول
      </h2>
      <input
        type="email"
        name="email"
        placeholder="البريد الإلكتروني"
        value={formData.email}
        onChange={handleChange}
        className="px-4 py-2 rounded-md border border-white/50 text-black focus:outline-none focus:border-[#c9a24d]"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="كلمة المرور"
        value={formData.password}
        onChange={handleChange}
        className="px-4 py-2 rounded-md border border-white/50 text-black focus:outline-none focus:border-[#c9a24d]"
        required
      />
      <button
        type="submit"
        className="mt-4 bg-[#c9a24d] text-white font-bold py-2 rounded-md hover:bg-[#b08c40] transition"
      >
        تسجيل دخول
      </button>
      <button type="button">
        هل انت مستخدم جديد ؟ <Link href="/signUp" className="text-[#c9a24d] hover:underline">إنشاء حساب</Link>
      </button>
    </form>
    </section>
  );
}