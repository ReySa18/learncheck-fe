export default function OptionItem({ label, isSelected, multiple, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`
        p-3 rounded-xl border cursor-pointer transition shadow-sm
        ${
          isSelected
            ? "bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 shadow-md"
            : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        }
      `}
    >
      {label}
    </div>
  );
}
