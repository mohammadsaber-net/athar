import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
type Props={
    text:string
}
export default function FormatingText({text}:Props) {
  return (
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            a: ({ href, children }) => (
            <a 
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500 dark:hover:text-blue-300 transition-colors cursor-pointer"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
            ),
            strong: ({ children }) => (
            <strong className="text-red-600 dark:text-red-400 font-bold">
                {children}
            </strong>
            ),
            code: ({ children }) => (
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                {children}
            </span>
            ),
            p: ({ children }) => (
            <p className="text-gray-900 dark:text-zinc-200 md:text-xl">
                {children}
            </p>
            ),
            li: ({ children }) => (
            <li className="text-gray-900 dark:text-zinc-200">
                {children}
            </li>
            ),
        }}
        >
        {text}
        </ReactMarkdown>
  )
}
