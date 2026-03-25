"use client"
import { SunnaType} from '@/lib/type'
import { useEffect, useRef, useState } from "react";
import {  Moon} from "lucide-react";
import Sunna from './Sunna';
type Props={
    content:SunnaType[]
}
export default function SunnanContent({content}:Props) {
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
      size: Math.random() * 5 + 5,
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
        <Moon
        key={i}
        className="absolute rounded-full text-indigo-500"
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
      {content.map((sunna:SunnaType)=>(
        <Sunna admin={admin} key={sunna.id} sunna={sunna}/>
      )) }
  </div>
  )
}
