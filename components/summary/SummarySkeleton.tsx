export function SummarySkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <div className="h-6 w-[70%] md:w-80 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="h-8 w-[80%] md:w-96 bg-gray-200 animate-pulse rounded-md mt-2"></div>
      </div>
      {[1,2,3].map((i) => (
        <div 
        key={i}
        className="w-full relative z-10 overflow-x-auto border-t-2 border-zinc-300 pt-2">
          <div className="w-xl md:w-2xl m-auto flex gap-4 items-center justify-center mb-4">
          <div className="h-40 bg-gray-200 w-32 animate-pulse rounded-lg"/>
          <div className="h-40 bg-gray-200 w-32 animate-pulse rounded-lg"/>
          <div className="h-40 bg-gray-200 w-32 animate-pulse rounded-lg"/>
          <div className="h-40 bg-gray-200 w-32 animate-pulse rounded-lg"/>
        </div>
        </div>
      ))}
    </div>
  );
}