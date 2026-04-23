// "use client"
// import { WakafatType } from '@/lib/type'
// import Aya from "./Aya";
// import { useEffect, useRef, useState } from "react";
// import { Star } from "lucide-react";
// import AllWakafat from './AllWakafat';
// type Props={
//     content:WakafatType[]
// }
// export default function WakafatContent({content}:Props) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [stars, setStars] = useState<any[]>([]);
//   const [admin,setAdmin]=useState<any>(null)
//   useEffect(()=>{
//     const isAdminClient = async () => {
//       const res = await fetch("/api/users/isLogged", {
//         method: "GET",
//         credentials: "include",
//         cache: "no-store"
//       });
//       const data = await res.json();
//       if (data.user) return setAdmin(data.user);
//     };
//     isAdminClient()
//   },[])
//   useEffect(() => {
//   if (!containerRef.current) return;

//   const element = containerRef.current;

//   function generateStars() {
//     const width = element.offsetWidth;
//     const height = element.offsetHeight;

//     const density = 8000;
//     const count = Math.floor((width * height) / density);

//     const newStars = Array.from({ length: count }).map(() => ({
//       top: Math.random() * height,
//       left: Math.random() * width,
//       size: Math.random() * 10 + 10,
//       opacity: Math.random(),
//     }));

//     setStars(newStars);
//   }
//   generateStars();
//   const observer = new ResizeObserver(() => {
//     generateStars();
//   });
//   observer.observe(element);
//   return () => observer.disconnect();
// }, []);
//   return (
//     <div
//         ref={containerRef}
//         className="relative pb-8 border-t-2 pt-3 border-gray-300"
//     >
//     <div className="absolute inset-0 overflow-hidden">
//     {stars.map((star, i) => (
//         <Star
//         key={i}
//         className="absolute text-blue-400"
//         style={{
//             top: star.top,
//             left: star.left,
//             width: star.size,
//             height: star.size,
//             opacity: star.opacity,
//         }}
//         />
//     ))}
//     </div>
//       {content.map((aya:WakafatType)=>(
//         <Aya key={aya.id} aya={aya}/>
//       )) }
//       </div>
//   )
// }
"use client";

import { WakafatType } from "@/lib/type";
import Aya from "./Aya";
import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  content: WakafatType[];
};

export default function WakafatContent({ content }: Props) {
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const isAdminClient = async () => {
      const res = await fetch("/api/users/isLogged", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await res.json();
      if (data.user) setAdmin(data.user);
    };

    isAdminClient();
  }, []);

  return (
    <div
      className="relative py-10 "
    >
      <div className='absolute z-10 inset-0 bg-repeat opacity-10 bg-[url("/pattern.png")]'></div>
      <div className="max-w-4xl bg-transparent z-20 relative mx-auto">
        {content.map((aya) => (
          <div className="mb-10 border-t-2 p-2 border-gray-300" key={aya.id}>
            <h2 className="text-xl md:max-w-xl max-w-md text-indigo-900 md:text-2xl">
              {aya.aya}
            </h2>
            <div className="mt-2 text-gray-700 max-w-2xl 
            ">
              <div dangerouslySetInnerHTML={{__html:aya.tafsir.slice(0,200)}}/>
              <Link className="text-blue-600 active:text-blue-800" href={`wakafat/${aya.id}`}>
              عرض المزيد...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}