"use client";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error("من فضلك أكمل البيانات");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("تم إرسال رسالتك بنجاح ✨");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("حدث خطأ، حاول مرة أخرى");
      }
    } catch {
      toast.error("تعذر الإرسال");
    }
    setLoading(false);
  };
  return (
    <section className="relative py-16 px-4 bg-[#fdfaf3]">
      <div className="absolute inset-0 opacity-5 bg-[url('/pattern1.png')] bg-repeat"></div>
      <div className="relative max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-emerald-900 mb-6">
          اتصل بنا
        </h2>
        <p className="text-center text-gray-700 mb-8 leading-loose">
          يسعدنا تواصلك معنا 🤍 <br />
          إذا كان لديك اقتراح أو ملاحظة أو رغبة في نشر الخير،
          فلا تتردد في مراسلتنا.
        </p>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-emerald-800 mb-1">
              الاسم
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="block text-sm text-emerald-800 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="block text-sm text-emerald-800 mb-1">
              الرسالة
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-2 rounded-lg
            hover:bg-emerald-800 transition disabled:opacity-50 bg-emerald-600"
          >
            {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-6">
          نسأل الله أن يبارك فيك ويجعل تواصلك سببًا في الخير 🤍
        </p>
      </div>
    </section>
  );
}