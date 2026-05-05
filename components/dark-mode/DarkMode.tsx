"use client"
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("");
    useEffect(() => {
        const saved = localStorage.getItem("theme");

        if (saved === "dark") {
            setTheme("dark")
            document.documentElement.classList.add("dark");
        } else if (saved === "light") {
            setTheme("light")
            document.documentElement.classList.remove("dark");
        } else {
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const defaultTheme = systemDark ? "dark" : "light";
            setTheme(defaultTheme);
            document.documentElement.classList.toggle("dark", systemDark);
        }
    }, []);
  const setDark = () => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  };
  const setLight = () => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setTheme("light");
  };
  return (
    <div className="flex gap-2 w-fit dark:bg-white bg-[#0d1117] dark:text-gray-800 text-gray-100 rounded-full
     fixed top-14 left-4 z-[1000000000000] cursor-pointer dark:shadow-md shadow-gray-300/50">
      {theme==="dark" && <Sun className="p-2 size-10" onClick={setLight}/>}
      {theme==="light" &&<Moon className="p-2 size-10" onClick={setDark}/>}
    </div>
  );
}