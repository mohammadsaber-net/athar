type Props={
    text:String
}
export default function FormatingMention({text}:Props) {
  return text.split(/(@[a-zA-Z0-9_]+)/g).map((part, index) => {
    if (part.startsWith("@")) {
      return (
        <span
          key={index}
          className="
            text-sky-600
            dark:text-sky-400
            font-semibold
          "
        >
          {part}
        </span>
      );
    }
    return part;
  });
}
