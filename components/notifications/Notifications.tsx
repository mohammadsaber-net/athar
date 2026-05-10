"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Heart,
  AtSign,
  MessageCircle,
  CheckCheck,
} from "lucide-react";
import { handleDate } from "@/lib/handleDate";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";

type NotificationType = {
  id: string;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  senderId?: string;
  contentId?: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const {admin,user}=useSelector((state:RootState)=>state.loggedData)
  
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/notifications");
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setNotifications(data.data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء جلب الإشعارات");
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch("/api/notifications/read-all", {
        method: "PATCH",
      });

      const data = await res.json();

      if (data.success) {
        setNotifications((prev) =>
          prev.map((n) => ({
            ...n,
            isRead: true,
          }))
        );

        toast.success("تم قراءة جميع الإشعارات");
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return (
          <Heart className="size-5 text-rose-500 fill-rose-500" />
        );

      case "mention":
        return (
          <AtSign className="size-5 text-cyan-500" />
        );

      case "reply":
        return (
          <MessageCircle className="size-5 text-indigo-500" />
        );

      default:
        return (
          <Bell className="size-5 text-gray-500" />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] p-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div
          className="
          flex items-center justify-between
          gap-3
          mb-6
          bg-white dark:bg-[#161b22]
          border border-gray-200 dark:border-gray-800
          rounded-3xl
          p-5
          shadow-sm
        "
        >
          <div className="flex items-center gap-4">
            <div
              className="
              size-14
              rounded-2xl
              bg-indigo-100 dark:bg-indigo-500/10
              flex items-center justify-center
            "
            >
              <Bell className="text-indigo-600 dark:text-indigo-400 size-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold dark:text-white">
                الإشعارات
              </h1>

              <p className="text-sm text-gray-500">
                جميع التفاعلات الخاصة بك
              </p>
            </div>
          </div>
          {notifications?.length > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="
              flex items-center gap-2
              px-4 py-2
              rounded-2xl
              text-sm
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              transition-all
              active:scale-95
            "
            >
              <CheckCheck className="size-4" />
              قراءة الكل
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center mt-24 gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="
                size-3
                rounded-full
                bg-indigo-500
                animate-bounce
              "
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
{/* 
        {(!admin && !user)&&
            <div className="text-center">
              <div className="text-xl dark:text-gray-200 md:text-2xl font-semibold">
                من فضلك قم <Link 
                href={"/signIn"}
                className="text-emerald-600 dark:text-emerald-400">
                بتسجيل الدخول
                </Link> لتحصل علي اشعاراتك
              </div>
            </div>
          } */}
        {!loading && notifications?.length === 0 &&  (
          <div
            className="
            bg-white dark:bg-[#161b22]
            border border-gray-200 dark:border-gray-800
            rounded-3xl
            p-10
            text-center
          "
          >
            <div
              className="
              mx-auto mb-5
              size-20
              rounded-full
              bg-gray-100 dark:bg-[#0d1117]
              flex items-center justify-center
            "
            >
              <Bell className="size-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold dark:text-white">
              لا توجد إشعارات
            </h2>
            <p className="text-gray-500 text-sm mt-3 leading-7">
              عندما يتفاعل أحد معك ستظهر الإشعارات هنا
            </p>
          </div>
        )}

        {/* Notifications */}
        {!loading && notifications.length > 0 && (
          <div className="flex flex-col gap-4">
            {notifications.map((noti:any) => (
              <div
                key={noti.id}
                className={`
                  relative
                  rounded-3xl
                  border
                  p-4
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg

                  ${
                    noti.isRead
                      ? `
                        bg-white dark:bg-[#161b22]
                        border-gray-200 dark:border-gray-800
                      `
                      : `
                        bg-indigo-50 dark:bg-indigo-500/10
                        border-indigo-200 dark:border-indigo-500/20
                      `
                  }
                `}
              >
                {!noti.isRead && (
                  <span
                    className="
                    absolute top-4 right-4
                    size-2.5
                    rounded-full
                    bg-indigo-500
                  "
                  />
                )}

                <div className="flex items-start gap-4">
                  <div
                    className="
                    shrink-0
                    size-12
                    rounded-2xl
                    bg-gray-100 dark:bg-[#0d1117]
                    flex items-center justify-center
                  "
                  >
                    {getIcon(noti.type)}
                  </div>

                  <div className="flex-1">
                    <p
                      className="
                      text-sm
                      leading-7
                      text-gray-800 dark:text-gray-100
                      font-medium
                    "
                    >
                      {noti.content}
                    </p>

                    <span
                      className="
                      text-xs
                      text-gray-500
                      mt-2
                      block
                    "
                    >
                      {handleDate(noti.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}