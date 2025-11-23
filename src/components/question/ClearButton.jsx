export default function ClearButton({ onClear }) {
  return (
    <button
      onClick={onClear}
      className="
        flex items-center gap-1 
        text-gray-600 dark:text-gray-300 
        text-sm font-medium 
        hover:text-red-600 dark:hover:text-red-400
        transition mt-2
      "
    >
      <span
        className="
          inline-block w-4 h-4 flex items-center justify-center 
          border border-gray-400 dark:border-gray-500 
          text-gray-500 dark:text-gray-300 
          rounded-full 
          text-[10px] leading-none 
          hover:border-red-600 dark:hover:border-red-400 
          hover:text-red-600 dark:hover:text-red-400
          transition
        "
      >
        ✖
      </span>

      <span>Clear</span>
    </button>
  );
}
