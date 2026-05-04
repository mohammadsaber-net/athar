
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
    const [content]=await db.select().from(namesTable)
    .where(eq(namesTable.id,id))
  return (
    <div className='relative min-h-screen'>
        <Name logged={logged} searchedName={content}/>
        <div
        className="absolute inset-0 z-0 opacity-[0.05] bg-repeat bg-center"
        style={{
            backgroundImage: `url(${content?.image})`,
            backgroundSize: "150px"
        }}
        />
    </div>
  )
}
