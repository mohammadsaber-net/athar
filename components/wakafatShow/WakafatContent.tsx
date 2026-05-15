import { WakafatType } from "@/lib/type";
import Link from "next/link";
import FormatingText from "../animation/FormatingText";

type Props = {
  content: WakafatType[];
};

export default function WakafatContent({ content }: Props) {
  return (
    <div
      className="relative py-10 "
    >
      <div className='absolute z-10 inset-0 bg-repeat dark:opacity-5 opacity-10 bg-[url("/pattern.png")]'></div>
      <div className="max-w-4xl bg-transparent z-20 relative mx-auto">
        {content.map((aya) => (
          <div className="mb-10 border-t-2 p-2 border-gray-300" key={aya.id}>
            <h2 className="text-xl md:max-w-xl dark:text-white max-w-md text-indigo-900 md:text-2xl">
              {aya.aya}
            </h2>
            <div className="mt-2 text-gray-700 max-w-2xl 
            ">
             <div>
               <FormatingText text={aya.tafsir.slice(0,100)} />
             </div>
              <Link className="text-blue-600 dark:text-cyan-500 active:text-blue-800" href={`wakafat/${aya?.shortId}`}>
              عرض المزيد...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}