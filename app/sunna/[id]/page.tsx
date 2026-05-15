import MainNav from '@/components/header/MainNav'
import Sunna from '@/components/sunnaShow/Sunna'
import db from '@/db'
import { sunnaTable } from '@/db/schema'
import { isAdmin } from '@/lib/isAdmin'
import { isLogged } from '@/lib/logged'
import { eq } from 'drizzle-orm'
type Props={
    params:Promise<{id:string}>
}
export default async function page({params}:Props) {
    const logged=await isLogged()
    const {id}=await params
    const shortId=id
    const [content]=await db.select().from(sunnaTable)
    .where(eq(sunnaTable.shortId,shortId))
  return (
    <div className='relative dark:bg-[#0d0d1f] dark:text-white min-h-screen'>
        <Sunna logged={logged} sunna={content}/>
    </div>
  )
}
