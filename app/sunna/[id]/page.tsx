import MainNav from '@/components/header/MainNav'
import Sunna from '@/components/sunnaShow/Sunna'
import db from '@/db'
import { sunnaTable } from '@/db/schema'
import { isAdmin } from '@/lib/isAdmin'
import { eq } from 'drizzle-orm'
type Props={
    params:Promise<{id:string}>
}
export default async function page({params}:Props) {
    const admin=await isAdmin()
    const {id}=await params
    const [content]=await db.select().from(sunnaTable)
    .where(eq(sunnaTable.id,id))
  return (
    <div className='bg-zinc-100 px-6 min-h-screen py-5 max-w-7xl'>
        <Sunna admin={admin} sunna={content}/>
    </div>
  )
}
