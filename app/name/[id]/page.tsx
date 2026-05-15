
import Name from '@/components/namesShow/Name'
import db from '@/db'
import { namesTable } from '@/db/schema'
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
    const [content]=await db.select().from(namesTable)
    .where(eq(namesTable.shortId,shortId))
  return (
    <div className='relative dark:bg-[#0d0d1f] dark:text-white min-h-screen'>
        <Name logged={logged} searchedName={content}/>
    </div>
  )
}
