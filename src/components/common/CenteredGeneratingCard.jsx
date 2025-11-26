export default function CenteredGeneratingCard({
  message = "LearnCheck sedang membuat soal...",
}) {
  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/30 dark:bg-black/40 backdrop-blur-sm
      "
    >
      <div
        className="
          p-6 rounded-xl shadow-xl border
          bg-white dark:bg-gray-900
          border-gray-300 dark:border-gray-700
          w-[340px]
          flex flex-col items-center
        "
      >
        {/* Spinner */}
        <div className="relative w-16 h-16 mb-4">
          <div
            className="
              absolute inset-0 rounded-full border-4
              border-blue-300 border-t-blue-600
              animate-spin
            "
          ></div>
        </div>

        {/* Text */}
        <div className="text-base font-semibold text-gray-700 dark:text-gray-200 text-center">
          {message}
        </div>
      </div>
    </div>
  );
}
