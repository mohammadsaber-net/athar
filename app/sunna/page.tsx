import MainNav from "@/components/header/MainNav";
import SunnanContent from "@/components/sunnaShow/SunnanContent";
import db from "@/db";
import { sunnaTable } from "@/db/schema";
export default async function sunnaPage() {
  const data = await db.select().from(sunnaTable)
  return (
    <section
    className='bg-zinc-100 px-6 min-h-screen md:pt-8 pt-20 max-w-7xl'>
      <MainNav />
      <div className='mb-2 pb-2'>
        <h1 className='text-2xl md:text-3xl text-[#0f3d2e] font-bold mb-2'>
          السنن المهجورة من هدي النبي ﷺ
        </h1>
        <p className='max-w-md'>
          في هذا القسم سنعرض بعون الله مجموعة من السنن المهجورة التي وردت عن النبي ﷺ، 
          محاولين إحياءها في حياتنا اليومية، وبيان فضلها وأثرها على المسلم في دنياه وآخرته، 
          <span className='text-cyan-600'>
            وذلك بالاعتماد على الأحاديث الصحيحة وشرح أهل العلم بإذن الله تعالى.
          </span>
          <span className='text-blue-600 block'>
            يمكنك التعليق أسفل كل سنة ومشاركتنا تجربتك في تطبيقها
          </span>
        </p>
      </div>
      <SunnanContent content={data}/>
    </section>
  )
}
