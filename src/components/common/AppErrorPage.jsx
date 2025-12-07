import { XCircle } from "lucide-react";

export default function AppErrorPage({ message, onRetry }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gray-50 dark:bg-gray-900 px-6 py-10">

      <div className="
          max-w-md w-full p-6 rounded-xl shadow-lg border 
          bg-white dark:bg-gray-800
          border-gray-200 dark:border-gray-700
        ">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <XCircle size={50} className="text-red-500" />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold text-red-700 dark:text-red-300">
          Terjadi Kesalahan
        </h2>

        {/* Message */}
        <p className="text-center mt-2 text-gray-700 dark:text-gray-300">
          {message || "Gagal memuat data. Silakan coba lagi."}
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="
              mt-5 w-full px-4 py-2 rounded-lg transition
              bg-red-600 hover:bg-red-700 text-white
            "
          >
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}
