export function SummarySkeleton() {
  return (
    <div className="p-6 space-y-6">
      {[1,2,3].map((i) => (
        <div
          key={i}
          className="h-40 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}