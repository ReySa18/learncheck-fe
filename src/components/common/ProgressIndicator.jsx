export default function ProgressIndicator({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full mb-5 select-none">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
