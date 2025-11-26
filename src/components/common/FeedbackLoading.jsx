export default function FeedbackLoading({
  message = "LearnCheck sedang memeriksa jawaban..."
}) {
  return (
    <div
      className="
        fixed inset-0 z-[999] 
        flex items-center justify-center
        backdrop-blur-sm
      "
      style={{
        backgroundColor: "var(--lc-overlay)"
      }}
    >
      <div className="
        bg-white dark:bg-gray-800 
        shadow-xl rounded-xl 
        p-6 w-72 text-center
        border border-gray-200 dark:border-gray-700
      ">
        
        {/* Spinner */}
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="
            absolute inset-0 rounded-full 
            border-4 border-blue-300 
            border-t-blue-600 
            animate-spin
          "></div>
        </div>

        {/* Text */}
        <div className="text-gray-700 dark:text-gray-200 font-semibold text-sm">
          {message}
        </div>
      </div>
    </div>
  );
}
