import FeedbackItem from "./FeedbackItem";

export default function FeedbackCard({ result }) {
  const isCorrect = result?.is_correct;

  return (
    <div
      className={`p-5 rounded-2xl shadow mt-6 border ${
        isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
      }`}
    >
      <div
        className={`text-lg font-bold mb-3 ${
          isCorrect ? "text-green-700" : "text-red-700"
        }`}
      >
        {isCorrect ? "Jawaban Anda Benar! 🎉" : "Jawaban Anda Salah."}
      </div>

      <FeedbackItem label="Jawaban Anda" value={result.user_answer} />

      <FeedbackItem label="Penjelasan" value={result.explanation} />
    </div>
  );
}
