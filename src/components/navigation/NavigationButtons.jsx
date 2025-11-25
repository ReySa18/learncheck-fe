export default function NavigationButtons({
  currentIndex,
  isLast,
  prevQuestion,
  nextQuestion,
  submitAnswers,
  question,
  userAnswers,
  flaggedQuestions,
  markQuestion,
}) {
  const canProceed =
    userAnswers?.[question.id] || flaggedQuestions?.[question.id];

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Tombol Sebelumnya */}
      {currentIndex > 0 ? (
        <button
          onClick={prevQuestion}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Sebelumnya
        </button>
      ) : (
        <div></div>
      )}

      <div className="flex items-center gap-3">

        {/* Tombol Tandai */}
        {!isLast && (
          <button
            onClick={() => markQuestion(question.id)}
            className="
              px-4 py-2 rounded-lg
              bg-yellow-500 hover:bg-yellow-600
              text-white transition
            "
          >
            Tandai
          </button>
        )}

        {/* Tombol Selanjutnya */}
        {!isLast ? (
          <button
            onClick={nextQuestion}
            disabled={!canProceed}
            className={`px-4 py-2 rounded-lg text-white transition ${
              canProceed
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Selanjutnya
          </button>
        ) : (
          <button
            onClick={submitAnswers}
            disabled={Object.keys(userAnswers).length !== Object.keys(flaggedQuestions).length}
            className={`px-4 py-2 rounded-lg text-white transition ${
              Object.keys(userAnswers).length === Object.keys(flaggedQuestions).length
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Jawaban
          </button>
        )}
      </div>
    </div>
  );
}
