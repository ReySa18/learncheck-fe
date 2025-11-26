import { X } from "lucide-react";

export default function AppAlert({
  type = "info",
  message,
  onClose,
  className = "",
}) {
  const colors = {
    error: "bg-red-50 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300",
    success: "bg-green-50 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300",
    info: "bg-blue-50 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300",
  };

  return (
    <div
      className={`
        p-4 rounded-lg border shadow-sm flex items-start gap-3
        ${colors[type]}
        ${className}
      `}
    >
      {/* ICON */}
      <div className="mt-1">
        {type === "error" && "❌"}
        {type === "warning" && "⚠️"}
        {type === "success" && "✅"}
        {type === "info" && "ℹ️"}
      </div>

      {/* MESSAGE */}
      <div className="flex-1 text-sm leading-relaxed">{message}</div>

      {/* CLOSE */}
      {onClose && (
        <button
          onClick={onClose}
          className="text-sm opacity-70 hover:opacity-100"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
