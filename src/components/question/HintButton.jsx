export default function HintButton({ onToggle, isOpen }) {
  return (
    <button
      onClick={onToggle}
      className="
        inline-flex items-center gap-2
        px-3 py-2
        text-sm font-medium
        text-blue-600 dark:text-blue-300
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-xl
        shadow-sm
        hover:shadow-md
        hover:border-blue-400 dark:hover:border-blue-300
        transition-all
        active:scale-95
      "
    >
      {/* Icon */}
      <span
        className={`
          flex items-center justify-center w-5 h-5
          rounded-lg
          bg-blue-50 dark:bg-gray-700
          text-blue-500 dark:text-blue-300
          text-xs
          transition-transform
          ${isOpen ? "rotate-180" : "rotate-0"}
        `}
      >
        💡
      </span>

      <span>{isOpen ? "Tutup Hint" : "Hint"}</span>
    </button>
  );
}
