"use client"
import MainNav from "@/components/header/MainNav";
import { isAdmin } from "@/lib/utls";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserForm() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role:"user"
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [admin,setAdmin]=useState(false)
  useEffect(()=>{
    isAdmin().then(value=>setAdmin(value))
  },[])
  const handleSubmit = async(e: React.FormEvent) => {
    try {
    e.preventDefault();
    const res=await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success){
      toast.success("تم انشاء المستخدم بنجاح")
    }else{
      toast.error(data.message||"حدث خطأ أثناء انشاء المستخدم: ")
    }    
    } catch (error) {
      toast.error((error as Error).message||"حدث خطأ أثناء انشاء المستخدم: ")
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
        إنشاء مستخدم جديد
      </h2>
      <input
        type="text"
        name="firstName"
        placeholder="الاسم الأول"
        value={formData.firstName}
        onChange={handleChange}
        className="px-4 py-2 rounded-md border border-white/50 text-black focus:outline-none focus:border-[#c9a24d]"
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="اسم العائلة"
        value={formData.lastName}
        onChange={handleChange}
        className="px-4 py-2 rounded-md border border-white/50 text-black focus:outline-none focus:border-[#c9a24d]"
        required
        />
      {admin&&<input
        type="text"
        name="role"
        placeholder=" الدور (مثال: author أو user)"
        value={formData.role}
        onChange={handleChange}
        className="px-4 py-2 rounded-md border border-white/50 text-black focus:outline-none focus:border-[#c9a24d]"
        required
      />}
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

      <input
        type="tel"
        name="phone"
        placeholder="رقم الهاتف"
        value={formData.phone}
        onChange={handleChange}
        className="px-4 py-2 rounded-md border border-white/50 text-black focus:outline-none focus:border-[#c9a24d]"
        required
        />

      <button
        type="submit"
        className="mt-4 bg-[#c9a24d] text-white font-bold py-2 rounded-md hover:bg-[#b08c40] transition"
      >
        إنشاء مستخدم
      </button>
      <button type="button">
       هل تمتلك حساب ؟ <Link href="/signIn" className="text-[#c9a24d] hover:underline">تسجيل دخول</Link>
      </button>
    </form>
    </section>
  );
}