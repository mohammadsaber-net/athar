
"use client";

import FixedModal from "@/components/animation/FixedModal";
import { WakafatFormData, WakafatType } from "@/lib/type";
import { fetchWakafat } from "@/redux/slice/wakafatData";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
type Props = {
  setCreate?: (value: boolean) => void;
  setEdit?: (value: WakafatType | null) => void;
  edit?: WakafatType | null;
  create?: boolean;
};

export default function WakafatForm({
  setCreate,
  setEdit,
  edit,
  create,
}: Props) {
  const [formData, setFormData] = useState<WakafatFormData>({
    aya: edit?.aya || "",
    ayaSource: edit?.ayaSource || "",
    tafsir: edit?.tafsir || "",
    tafsirSource: edit?.tafsirSource || "",
  });

  const dispatch = useDispatch<AppDispatch>();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const url = edit
      ? `/api/wakafat/${edit.id}`
      : "/api/wakafat";

    const method = edit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setCreate?.(false);
        setEdit?.(null);
        dispatch(fetchWakafat());
      } else {
        toast.error(data.message || "خطأ");
      }
    } catch (error) {
      toast.error((error as Error).message || "خطأ");
    }
  }

  return (
    <FixedModal
      isOpen={!!edit || !!create}
      onClose={() => {
        setEdit?.(null);
        setCreate?.(false);
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-xl p-2 mx-auto space-y-4"
      >
        <h2 className="text-center text-xl font-bold text-blue-800 dark:text-emerald-400">
          {edit ? "تعديل" : "إضافة"} محتوى
        </h2>

        {/* Aya */}
        <input
          name="aya"
          placeholder="الآية"
          value={formData.aya}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        {/* Aya Source */}
        <input
          name="ayaSource"
          placeholder="مصدر الآية"
          value={formData.ayaSource}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <textarea
          name="tafsir"
          placeholder="اكتب التفسير هنا (Markdown مدعوم: **bold** - `code` - https://...)"
          value={formData.tafsir}
          onChange={handleChange}
          rows={8}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        
        <input
          name="tafsirSource"
          placeholder="مصدر التفصيل"
          value={formData.tafsirSource || ""}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            حفظ
          </button>

          <button
            type="button"
            onClick={() => {
              setCreate?.(false);
              setEdit?.(null);
            }}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            إلغاء
          </button>
        </div>
      </form>
    </FixedModal>
  );
}