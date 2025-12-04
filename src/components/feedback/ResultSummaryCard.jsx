// ResultSummaryCard.jsx
export default function ResultSummaryCard({ feedback }) {
  if (!feedback) return null;

  const correct = feedback.correct;
  const total = feedback.total;
  const incorrect = total - correct;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Hasil Penilaian</h2>

      <div className="flex gap-4">
        {/* Benar */}
        <div className="flex-1 bg-green-100 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-700">Benar</p>
          <p className="text-3xl font-bold text-green-700">{correct}</p>
        </div>

        {/* Salah */}
        <div className="flex-1 bg-red-100 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-700">Salah</p>
          <p className="text-3xl font-bold text-red-700">{incorrect}</p>
        </div>
      </div>
    </div>
  );
}
