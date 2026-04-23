"use client"
import { SunnaType} from '@/lib/type'
import { useEffect, useRef, useState } from "react";
import {  Moon} from "lucide-react";
import Sunna from './Sunna';
import AllSunna from './AllSunna';
import Link from 'next/link';
type Props={
    content:SunnaType[]
}
export default function SunnanContent({content}:Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<any[]>([]);
  const [admin,setAdmin]=useState<any>(null)
  useEffect(()=>{
    const isAdminClient = async () => {
      const res = await fetch("/api/users/isLogged", {
        method: "GET",
        credentials: "include",
        cache: "no-store"
      });
      const data = await res.json();
      if (data.user) return setAdmin(data.user);
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
      className="relative pb-8 pt-3"
    >
    <div className="absolute inset-0 overflow-hidden">
    {stars.map((star, i) => (
        <Moon
        key={i}
        className="absolute z-10 rounded-full text-indigo-400"
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
        <div className="mb-10 border-t-2 p-2 bg-transparent relative z-20 border-gray-300" key={sunna.id}>
          <h2 className="text-xl md:max-w-xl max-w-md text-indigo-900 md:text-2xl">
            {sunna.sunna}
          </h2>
          <div className="mt-2 text-gray-700 max-w-2xl 
          ">
            <div dangerouslySetInnerHTML={{__html:(sunna.tafsir || "").slice(0,200)}}/>
            <Link className="text-blue-600 active:text-blue-800" href={`sunna/${sunna.id}`}>
             عرض المزيد...
            </Link>
          </div>
        </div>
        // <AllSunna key={sunna.id} sunna={sunna}/>
      )) }
  </div>
  )
}
