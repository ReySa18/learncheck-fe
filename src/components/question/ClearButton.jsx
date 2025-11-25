export default function ClearButton({ onClear }) {
  return (
    <button
      onClick={onClear}
      className="
        inline-flex items-center gap-2
        px-3 py-2
        text-sm font-medium
        text-gray-600 dark:text-gray-300
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-xl
        shadow-sm
        hover:border-red-400 hover:text-red-500 dark:hover:text-red-400
        hover:shadow-md
        transition-all
        active:scale-95
      "
    >
      {/* Icon */}
      <span
        className="
          flex items-center justify-center w-5 h-5
          rounded-lg
          bg-gray-100 dark:bg-gray-700
          text-gray-500 dark:text-gray-300
          text-xs
          transition-all
          group-hover:text-red-500 dark:group-hover:text-red-400
        "
      >
        ✕
      </span>

      <span>Clear</span>
    </button>
  );
}
