
import Name from '@/components/namesShow/Name'
import db from '@/db'
import { namesTable } from '@/db/schema'
import { isAdmin } from '@/lib/isAdmin'
import { eq } from 'drizzle-orm'
type Props={
    params:Promise<{id:string}>
}
export default async function page({params}:Props) {
    const admin=await isAdmin()
    const {id}=await params
    const [content]=await db.select().from(namesTable)
    .where(eq(namesTable.id,id))
  return (
    <div className='bg-gray-100 px-6 min-h-screen py-5 max-w-7xl'>
        <Name admin={admin} searchedName={content}/>
    </div>
  )
}
