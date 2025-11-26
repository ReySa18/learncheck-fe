export default function QuestionReviewCard({ item, index, total }) {
  const isCorrect = item.isCorrect;

  return (
    <div
      className={`
        relative p-5 rounded-2xl shadow border mb-6
        ${
          isCorrect
            ? "bg-green-50 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-600 dark:text-green-300"
            : "bg-red-50 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-600 dark:text-red-300"
        }
      `}
    >
      {/* Status badge */}
      <div
        className={`
          absolute top-3 right-3 
          px-3 py-1 rounded-full text-xs font-semibold shadow
          ${
            isCorrect
              ? "bg-green-600 text-white dark:bg-green-500"
              : "bg-red-600 text-white dark:bg-red-500"
          }
        `}
      >
        {isCorrect ? "Benar" : "Salah"}
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Soal {index + 1} dari {total}
      </div>

      <div className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {item.question}
      </div>

      <div className="space-y-2">
        {item.options.map((opt, i) => {
          const isUser = Array.isArray(item.userSelectedIndex)
            ? item.userSelectedIndex.includes(i)
            : i === item.userSelectedIndex;

          const isCorrectOpt = Array.isArray(item.correctIndex)
            ? item.correctIndex.includes(i)
            : i === item.correctIndex;

          let style = `
            p-3 rounded-lg border text-sm transition 
            bg-white text-gray-700 border-gray-300
            dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
          `;

          if (isCorrectOpt) {
            style +=
              " bg-green-200 border-green-600 text-green-900 dark:bg-green-700 dark:text-white";
          }

          if (isUser && !isCorrectOpt) {
            style +=
              " bg-red-200 border-red-600 text-red-900 dark:bg-red-700 dark:text-white";
          }

          return (
            <div key={i} className={style}>
              {opt}
              {isUser && " (Jawaban Anda)"}
              {isCorrectOpt && " (Benar)"}
            </div>
          );
        })}
      </div>

      {/* Penjelasan LLM */}
      <div className="
        mt-4 p-3 bg-white dark:bg-gray-800 
        border border-gray-300 dark:border-gray-700 
        rounded-lg text-sm text-gray-700 dark:text-gray-200
      ">
        <div className="font-bold mb-1 text-gray-800 dark:text-gray-300">
          Penjelasan:
        </div>
        
        <div
          dangerouslySetInnerHTML={{ __html: item.explanation }}
        />
      </div>
    </div>
  );
}
