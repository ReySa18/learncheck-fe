export default function NavigationButtons({
  currentIndex,
  isLast,
  total,
  prevQuestion,
  nextQuestion,
  submitAnswers,
  userAnswers,
}) {
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
      ) : <div></div>}

      <div className="flex items-center gap-3">

        {/* Tombol Selanjutnya */}
        {!isLast ? (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Selanjutnya
          </button>
        ) : (
          <button
            onClick={submitAnswers}
            disabled={(Object.keys(userAnswers).length !== total)}
            className={`px-4 py-2 rounded-lg text-white transition ${
              Object.keys(userAnswers).length === total
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
