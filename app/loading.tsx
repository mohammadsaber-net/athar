export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f9f8f3] pt-10 animate-pulse">
      <div className="max-w-6xl pb-10 px-6">
        
        {/* عنوان */}
        <div className="h-8 w-2/3 bg-gray-300 rounded mb-4"></div>

        {/* وصف */}
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded mb-6"></div>

        {/* Sections */}
        {[1,2,3].map((section) => (
          <div key={section} className="border-t-2 border-zinc-300 pt-4 mb-6">
            
            <div className="flex gap-4 overflow-x-auto">
              
              {[1,2,3,4].map((card) => (
                <div
                  key={card}
                  className="min-w-[150px] h-40 bg-gray-300 rounded-lg"
                ></div>
              ))}

              {/* زر عرض المزيد */}
              <div className="min-w-[120px] h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}