
import Aya from '@/components/wakafatShow/Aya'
import db from '@/db'
import { wakafatTable } from '@/db/schema'
import { isLogged } from '@/lib/logged'
import { eq } from 'drizzle-orm'
type Props={
    params:Promise<{id:string}>
}
export default async function page({params}:Props) {
    const logged=await isLogged()
    const {id}=await params
    const [content]=await db.select().from(wakafatTable)
    .where(eq(wakafatTable.id,id))
  return (
    <div className='relative dark:bg-[#0d0d1f] dark:text-white min-h-screen'>
      <div
        className="absolute inset-0 z-10 dark:opacity-5 opacity-20 bg-repeat bg-center"
        style={{
        backgroundImage: `url(/pattern.png)`,
        backgroundSize: "150px"
        }}
      />
      <Aya logged={logged} aya={content}/>
    </div>
  )
}
