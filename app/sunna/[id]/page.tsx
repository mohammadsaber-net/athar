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
    const [content]=await db.select().from(sunnaTable)
    .where(eq(sunnaTable.id,id))
  return (
    <div className='relative min-h-screen'>
    <div
        className="absolute inset-0 z-10 opacity-[0.08] bg-repeat bg-center"
        style={{
        backgroundImage: `url(/pattern1.png)`,
        backgroundSize: "150px"
        }}
      />
        <Sunna logged={logged} sunna={content}/>
    </div>
  )
}
