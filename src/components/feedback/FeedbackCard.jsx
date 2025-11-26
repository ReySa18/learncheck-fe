import FeedbackItem from "./FeedbackItem";

export default function FeedbackCard({ result }) {
  if (!result) return null;

  const userAnswer = Array.isArray(result.userSelectedIndex)
    ? result.userSelectedIndex.map(i => result.options[i]).join(", ")
    : result.userSelectedIndex != null
    ? result.options[result.userSelectedIndex]
    : "Tidak dijawab";

  const correctAnswer = Array.isArray(result.correctIndex)
    ? result.correctIndex.map(i => result.options[i]).join(", ")
    : result.correctIndex != null
    ? result.options[result.correctIndex]
    : "-";

  const isCorrect = result.isCorrect ?? false;

  return (
    <div
      className={`
        p-5 rounded-2xl shadow mt-6 border 
        ${
          isCorrect
            ? "bg-green-50 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-600 dark:text-green-300"
            : "bg-red-50 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-600 dark:text-red-300"
        }
      `}
    >
      <div
        className={`
          text-lg font-bold mb-3
          ${
            isCorrect
              ? "text-green-700 dark:text-green-300"
              : "text-red-700 dark:text-red-300"
          }
        `}
      >
        {isCorrect ? "Jawaban Anda Benar! 🎉" : "Jawaban Anda Salah."}
      </div>

      {/* Jawaban User */}
      <FeedbackItem label="Jawaban Anda" value={userAnswer} />

      {/* Jawaban Benar */}
      <FeedbackItem label="Jawaban yang Benar" value={correctAnswer} />

      {/* Penjelasan */}
      <FeedbackItem label="Penjelasan" value={result.explanation} />
    </div>
  );
}
