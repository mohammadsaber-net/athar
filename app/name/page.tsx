
import NamesContent from '@/components/namesShow/NamesContent'
import SearchInput from '@/components/search/SearchInput'
import db from '@/db'
import { namesTable } from '@/db/schema'
export default async function NamePage() {
const data = await db.select().from(namesTable)
  return (
    <section
        className='bg-gray-100 px-6 min-h-screen md:pt-8 pt-16'>
          <SearchInput />
          <div className='mb-2 py-2 max-w-7xl'>
            <h1 className='text-2xl md:text-3xl text-[#0f3d2e] font-bold mb-2'>
              أسماء الله الحسنى ومعانيها
            </h1>
            <p className='max-w-md'>
              في هذا القسم سنتعرف بعون الله على أسماء الله الحسنى، محاولين فهم معانيها 
              وآثارها في حياتنا، وكيف يتعبد المسلم لله بها ويدعوه بها، 
              <span className='text-cyan-600'>
                وذلك بالرجوع إلى القرآن الكريم والسنة الصحيحة وشرح أهل العلم بإذن الله تعالى.
              </span>
              <span className='text-blue-600 block'>
                يمكنك التعليق أسفل كل اسم ومشاركة تأملاتك
              </span>
            </p>
          </div>
          <NamesContent content={data}/>
        </section>
      )
}
