// "use client"
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function UserForm() {
//   const redirect=useRouter()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async(e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//     const res=await fetch("/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
//     const data = await res.json();
//     if(data.success){
//       toast.success("تم تسجيل الدخول بنجاح")
//       redirect.push("/")
//     }else{
//       toast.error(data.message||"خطأ في التسجيل")
//     }
//     } catch (error) {
//       toast.error((error as Error).message||"خطأ في التسجيل")
//     }
//   };
//   const [user,setUser]=useState(false)
//     useEffect(()=>{
//       const isAdminClient = async () => {
//           const res = await fetch("/api/users/isLogged", {
//           method: "GET",
//           credentials: "include",
//           cache: "no-store"
//         });
//         const data = await res.json();
//         if(data.user&&data.user.role==="user") setUser(true)
//     };
//     isAdminClient()
//   },[])
//   useEffect(()=>{
//     if(user){
//       redirect.push("/")
//     }
//   },[user])
//   return (
//     <section className="bg-gray-100 min-h-screen py-6 px-4">
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-14 md:mt-10 bg-[#0f3d2e]/10 backdrop-blur-md rounded-xl p-6 flex flex-col gap-4"
//     >
//       <h2 className="text-xl font-bold text-[#c9a24d] text-center mb-4">
//         تسجيل دخول
//       </h2>
//       <input
//         type="email"
//         name="email"
//         placeholder="البريد الإلكتروني"
//         value={formData.email}
//         onChange={handleChange}
//         className="px-4 py-2 rounded-md border border-white/50 text-black focus:outline-none focus:border-[#c9a24d]"
//         required
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="كلمة المرور"
//         value={formData.password}
//         onChange={handleChange}
//         className="px-4 py-2 rounded-md border border-white/50 text-black focus:outline-none focus:border-[#c9a24d]"
//         required
//       />
//       <button
//         type="submit"
//         className="mt-4 bg-[#c9a24d] text-white font-bold py-2 rounded-md hover:bg-[#b08c40] transition"
//       >
//         تسجيل دخول
//       </button>
//       <button type="button">
//         هل انت مستخدم جديد ؟ <Link href="/signUp" className="text-[#c9a24d] hover:underline">إنشاء حساب</Link>
//       </button>
//     </form>
//     </section>
//   );
// }
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
  const dispatch=useDispatch<AppDispatch>()
  const {admin,user}=useSelector((state:RootState)=>state.loggedData)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("تم تسجيل الدخول بنجاح ✨");
        if(data.role==="admin"){
          dispatch(setAdmin(true))
        } else {
          dispatch(setUser(true))
        }
        router.push("/");
      } else {
        toast.error(data.message || "خطأ في تسجيل الدخول");
      }
    } catch {
      toast.error("تعذر تسجيل الدخول");
    }

    setLoading(false);
  };

  // const [user, setUser] = useState(false);
  // useEffect(() => {
  //   const check = async () => {
  //     const res = await fetch("/api/users/isLogged", {
  //       method: "GET",
  //       credentials: "include",
  //       cache: "no-store",
  //     });
  //     const data = await res.json();
  //     if (data.user) setUser(true);
  //   };
  //   check();
  // }, []);

  useEffect(() => {
    if (user||admin) router.push("/");
  }, [user,admin]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#fdfaf3] overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern-green.png')] bg-repeat"></div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-md
        border border-emerald-100 shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-emerald-900 mb-6">
          تسجيل الدخول
        </h2>

        {/* Email */}
        <div className="relative mb-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="peer rounded w-full border-b-2 border-gray-300 bg-transparent p-2 text-gray-800
            focus:outline-none focus:border-emerald-600"
          />
          <label
            className="absolute right-0 top-2 text-gray-500 text-sm
            transition-all duration-200
            peer-focus:-top-4 peer-focus:text-emerald-700 peer-focus:text-xs
            peer-valid:-top-4 peer-valid:text-xs"
          >
            البريد الإلكتروني
          </label>
        </div>
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="peer w-full rounded border-b-2 border-gray-300 bg-transparent p-2 text-gray-800
            focus:outline-none focus:border-emerald-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-2 top-3 text-gray-500 hover:text-emerald-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          <label
            className="absolute right-0 top-2 text-gray-500 text-sm
            transition-all duration-200
            peer-focus:-top-4 peer-focus:text-emerald-700 peer-focus:text-xs
            peer-valid:-top-4 peer-valid:text-xs"
          >
            كلمة المرور
          </label>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-800 text-white py-2 rounded-lg
          hover:bg-emerald-700 transition-all duration-200
          disabled:opacity-60 disabled:pointer-events-none"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </motion.button>
        <p className="text-center text-sm text-gray-600 mt-5">
          مستخدم جديد؟{" "}
          <Link href="/signUp" className="text-emerald-700 hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </motion.form>
    </section>
  );
}