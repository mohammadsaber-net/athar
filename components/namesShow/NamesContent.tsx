import { NamesType} from '@/lib/type'
import Link from 'next/link';
import FormatingText from '../animation/FormatingText';
type Props={
    content:NamesType[]
}
export default function NamesContent({content}:Props) {
  return (
    <div
      className="relative py-8"
    >
        {content.map((searchedName:NamesType)=>(
          <div className="mb-10 flex gap-2 max-w-2xl border-t-2 p-2 border-gray-300" key={searchedName.id}>
            <img
              className='h-20 rounded-full w-20'
              src={searchedName?.image || undefined}
              alt={typeof searchedName?.image === 'string' ? searchedName.image : ''}
            />
            <div className=''>
            <h2 className="text-xl md:max-w-xl max-w-md dark:text-white text-indigo-900 md:text-2xl">
                {searchedName.name}
            </h2>
            <div className="mt-2 text-gray-700 max-w-2xl ">
            <div >
              <FormatingText text={searchedName.meaning.slice(0,100)}/>
            </div>
            <Link className="text-blue-600 dark:text-cyan-500 active:text-blue-800" href={`name/${searchedName.id}`}>
               عرض المزيد...
            </Link>
            </div>
          </div>
          </div>
      )) }
  </div>
  )
}
