export default function HintContent({ hint, isOpen }) {
  if (!isOpen) return null;

  return (
    <div
      className="
        p-3 mt-2 rounded-lg 
        bg-blue-50 dark:bg-blue-900 
        border border-blue-200 dark:border-blue-700
        text-sm text-blue-800 dark:text-blue-200
      "
    >
      {hint}
    </div>
  );
}
