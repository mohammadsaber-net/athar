"use client"
import { NamesType, SunnaType} from '@/lib/type'
import { useEffect, useRef, useState } from "react";
import {  Moon} from "lucide-react";
import Name from './Name';
import Link from 'next/link';
import AllNames from './AllNames';
type Props={
    content:NamesType[]
}
export default function NamesContent({content}:Props) {
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
      className="relative pb-8 border-t-2 pt-3 border-gray-300"
    >
    <div className="absolute inset-0 overflow-hidden">
    {stars.map((star, i) => (
        <Moon
        key={i}
        className="absolute rounded-full size-4"
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
      <div className='flex gap-4 flex-wrap items-center justify-center mb-4'>
        {content.map((searchedName:NamesType)=>(
        <AllNames searchedName={searchedName} key={searchedName.id}/>
      )) }
      </div>
  </div>
  )
}
