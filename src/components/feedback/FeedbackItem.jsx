export default function FeedbackItem({ label, value }) {
  return (
    <div className="mb-3">
      <div className="font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </div>

      <div
        className="
          mt-1 
          p-3 
          rounded-lg 
          border 
          text-sm
          bg-gray-50 dark:bg-gray-800 
          border-gray-300 dark:border-gray-700
          text-gray-800 dark:text-gray-200
        "
      >
        <div
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
    </div>
  );
}
