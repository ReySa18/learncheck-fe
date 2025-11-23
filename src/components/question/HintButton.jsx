export default function HintButton({ onToggle, isOpen }) {
  return (
    <button
      onClick={onToggle}
      className="
        flex items-center gap-2 
        text-blue-600 dark:text-blue-300
        text-sm font-medium
        mt-2
        hover:text-blue-700 dark:hover:text-blue-200
        transition
      "
    >
      <span
        className={`
          inline-block transition-transform
          ${isOpen ? "rotate-180" : "rotate-0"}
        `}
      >
        💡
      </span>

      {isOpen ? "Tutup Hint" : "Hint"}
    </button>
  );
}
