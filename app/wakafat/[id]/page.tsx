
import Aya from '@/components/wakafatShow/Aya'
import db from '@/db'
import { namesTable, sunnaTable, wakafatTable } from '@/db/schema'
import { isAdmin } from '@/lib/isAdmin'
import { eq } from 'drizzle-orm'
type Props={
    params:Promise<{id:string}>
}
export default async function page({params}:Props) {
    const admin=await isAdmin()
    const {id}=await params
    const [content]=await db.select().from(wakafatTable)
    .where(eq(wakafatTable.id,id))
  return (
    <div className='bg-slate-100 px-6 min-h-screen md:pt-8 pt-20 max-w-7xl'>
        <Aya admin={admin} aya={content}/>
    </div>
  )
}
