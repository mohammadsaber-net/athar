
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
    const shortId=id
    const [content]=await db.select().from(wakafatTable)
    .where(eq(wakafatTable.shortId,shortId))
  return (
    <div className='relative dark:bg-[#0d0d1f] dark:text-white min-h-screen'>
      <Aya logged={logged} aya={content}/>
    </div>
  )
}
