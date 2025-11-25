export default function ReviewNavigationButtons({
  index,
  total,
  onPrev,
  onNext,
  onRestart
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className="flex items-center justify-between mt-6">

      {/* Prev */}
      {!isFirst ? (
        <button
          onClick={onPrev}
          className="
            px-4 py-2 rounded-lg 
            bg-gray-200 hover:bg-gray-300 
            text-gray-800
            dark:bg-gray-700 dark:hover:bg-gray-600 
            dark:text-gray-200
            transition
          "
        >
          Sebelumnya
        </button>
      ) : (
        <div></div>
      )}

      {/* Next / Restart */}
      {!isLast ? (
        <button
          onClick={onNext}
          className="
            px-4 py-2 rounded-lg 
            bg-blue-600 hover:bg-blue-700 
            text-white
            dark:bg-blue-500 dark:hover:bg-blue-600
            transition
          "
        >
          Selanjutnya
        </button>
      ) : (
        <button
          onClick={onRestart}
          className="
            px-4 py-2 rounded-lg
            bg-green-600 hover:bg-green-700 
            text-white
            dark:bg-green-500 dark:hover:bg-green-600
            transition
          "
        >
          Mulai Ulang
        </button>
      )}
    </div>
  );
}
