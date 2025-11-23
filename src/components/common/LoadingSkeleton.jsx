export default function LoadingSkeleton({ lines = 4, className = "" }) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-300 rounded-md w-full last:w-3/4"
        ></div>
      ))}
    </div>
  );
}