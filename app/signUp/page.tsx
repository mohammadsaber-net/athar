
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setAdmin, setUser } from "@/redux/slice/logger";

export default function UserForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { admin, user } = useSelector((state: RootState) => state.loggedData);
  const [formData, setFormData] = useState({
    userName: "",
    displayName :"",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.userName)) {
      toast.error("استخدم الحروف aBcK او الارقام 1234 او _ فقط من فضلك");
      setLoading(false)
      return;
    }
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("تم إنشاء المستخدم ✨");
        if (data.role === "admin") {
          dispatch(setAdmin(true));
        } else {
          dispatch(setUser(true));
        }
        router.push("/");
      } else {
        toast.error(data.message || "حدث خطأ");
      }
    } catch {
      toast.error("تعذر إنشاء المستخدم");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user || admin) router.push("/");
  }, [user, admin, router]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#fdfaf3] dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[url('/pattern1.png')] bg-repeat"></div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md
        border border-emerald-100 dark:border-zinc-800 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-emerald-900 dark:text-emerald-400 mb-6">
          إنشاء حساب
        </h2>
        <div className="relative mb-4">
          <input
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="peer p-2 w-full border-b-2 border-gray-300 dark:border-zinc-700 bg-transparent rounded text-gray-800 dark:text-gray-100 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
          />
          <label className="absolute right-0 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-emerald-700 dark:peer-focus:text-emerald-400 peer-valid:-top-4 peer-valid:text-xs">
            اسم المستخدم(يجب ان يكون غير مكرر)
          </label>
        </div>
        <div className="relative mb-4">
          <input
            name="displayName"
            value={formData.displayName }
            onChange={handleChange}
            required
            className="peer p-2 w-full border-b-2 border-gray-300 dark:border-zinc-700 bg-transparent rounded text-gray-800 dark:text-gray-100 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
          />
          <label className="absolute right-0 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-emerald-700 dark:peer-focus:text-emerald-400 peer-valid:-top-4 peer-valid:text-xs">
            اضف اسمك
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="peer w-full border-b-2 border-gray-300 dark:border-zinc-700 bg-transparent p-2 rounded text-gray-800 dark:text-gray-100 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
          />
          <label className="absolute right-0 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-emerald-700 dark:peer-focus:text-emerald-400 peer-valid:-top-4 peer-valid:text-xs">
            البريد الإلكتروني
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="peer w-full border-b-2 border-gray-300 dark:border-zinc-700 bg-transparent p-2 rounded text-gray-800 dark:text-gray-100 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-2 top-3 text-gray-500 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <label className="absolute right-0 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-emerald-700 dark:peer-focus:text-emerald-400 peer-valid:-top-4 peer-valid:text-xs">
            كلمة المرور
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="peer w-full border-b-2 border-gray-300 dark:border-zinc-700 bg-transparent p-2 rounded text-gray-800 dark:text-gray-100 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
          />
          <label className="absolute right-0 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-emerald-700 dark:peer-focus:text-emerald-400 peer-valid:-top-4 peer-valid:text-xs">
            رقم الهاتف
          </label>
        </div>

        {admin && (
          <div className="relative mb-4">
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="peer w-full border-b-2 border-gray-300 dark:border-zinc-700 bg-transparent p-2 rounded text-gray-800 dark:text-gray-100 focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
            />
            <label className="absolute right-0 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-emerald-700 dark:peer-focus:text-emerald-400 peer-valid:-top-4 peer-valid:text-xs">
              الدور
            </label>
          </div>
        )} 

        <motion.button
          whileTap={{ scale: 0.96 }}
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-800 dark:bg-emerald-600 text-white py-2 rounded-lg
          hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-all disabled:opacity-60 disabled:pointer-events-none"
        >
          {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
        </motion.button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-5">
          لديك حساب بالفعل؟{" "}
          <Link href="/signIn" className="text-emerald-700 dark:text-emerald-400 hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </motion.form>
    </section>
  );
}