import FeedbackItem from "./FeedbackItem";

export default function FeedbackCard({ result }) {
  const isCorrect = result?.is_correct;

  return (
    <div
      className={`
        p-5 rounded-2xl shadow mt-6 
        border 
        ${isCorrect
          ? "bg-green-50 border-green-300 text-green-800 dark:bg-green-900/20 dark:border-green-600 dark:text-green-300"
          : "bg-red-50 border-red-300 text-red-800 dark:bg-red-900/20 dark:border-red-600 dark:text-red-300"
        }
      `}
    >
      {/* Judul */}
      <div
        className={`
          text-lg font-bold mb-3
          ${isCorrect
            ? "text-green-700 dark:text-green-300"
            : "text-red-700 dark:text-red-300"
          }
        `}
      >
        {isCorrect ? "Jawaban Anda Benar! 🎉" : "Jawaban Anda Salah."}
      </div>

      {/* Item: Jawaban User */}
      <FeedbackItem label="Jawaban Anda" value={result.user_answer} />

      {/* Item: Penjelasan */}
      <FeedbackItem label="Penjelasan" value={result.explanation} />
    </div>
  );
}
