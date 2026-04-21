"use client";
import { useState } from "react";
import FixedModal from "../animation/FixedModal";

type Props = {
  text: any;
};

export default function SharePopup({ text }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleShareClick = async () => {
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: "أَثَارَ",
          text,
          url,
        });
      } catch (e) {}
    } else {
      setOpen(true);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={handleShareClick}
        className="bg-[#B89B5E] text-white px-4 py-1 rounded-full text-xs hover:scale-105 transition"
      >
        مشاركة
      </button>
      <FixedModal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="font-bold mb-4 text-center">مشاركة</h2>

        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`}
            target="_blank"
            className="bg-green-500 text-white py-2 rounded-lg text-center"
          >
            واتساب
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            className="bg-blue-600 text-white py-2 rounded-lg text-center"
          >
            فيسبوك
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              text
            )}&url=${url}`}
            target="_blank"
            className="bg-sky-500 text-white py-2 rounded-lg text-center"
          >
            تويتر
          </a>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="bg-gray-800 text-white py-2 rounded-lg"
          >
            {copied ? "✅ تم النسخ" : "📋 نسخ الرابط"}
          </button>

        </div>

        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="mt-4 text-gray-500 text-sm block mx-auto"
        >
          إغلاق
        </button>

      </FixedModal>
    </>
  );
}