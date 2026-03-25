"use client"
import { WakafatType } from '@/lib/type'
import Aya from "./Aya";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
type Props={
    content:WakafatType[]
}
export default function WakafatContent({content}:Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<any[]>([]);
  const [admin,setAdmin]=useState(false)
  useEffect(()=>{
    const isAdminClient = async () => {
      const res = await fetch("/api/users/isLogged", {
        method: "GET",
        credentials: "include",
        cache: "no-store"
      });
      const data = await res.json();
      if (data.user.role === "admin") return setAdmin(true);
    };
    isAdminClient()
  },[])
  useEffect(() => {
  if (!containerRef.current) return;

  const element = containerRef.current;

  function generateStars() {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const density = 8000;
    const count = Math.floor((width * height) / density);

    const newStars = Array.from({ length: count }).map(() => ({
      top: Math.random() * height,
      left: Math.random() * width,
      size: Math.random() * 10 + 10,
      opacity: Math.random(),
    }));

    setStars(newStars);
  }
  generateStars();
  const observer = new ResizeObserver(() => {
    generateStars();
  });
  observer.observe(element);
  return () => observer.disconnect();
}, []);
  return (
    <div
        ref={containerRef}
        className="relative pb-8 border-t-2 pt-3 border-gray-300"
    >
    <div className="absolute inset-0 overflow-hidden">
    {stars.map((star, i) => (
        <Star
        key={i}
        className="absolute text-blue-400"
        style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
        }}
        />
    ))}
    </div>
      {content.map((aya:WakafatType)=>(
        <Aya admin={admin} key={aya.id} aya={aya}/>
      )) }
      </div>
  )
}
