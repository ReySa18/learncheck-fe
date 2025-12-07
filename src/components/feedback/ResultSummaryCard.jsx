export default function ResultSummaryCard({ feedback, preferences }) {
  if (!feedback) return null;

  const correct = feedback.correct;
  const total = feedback.total;
  const incorrect = total - correct;

  let theme = {};
  try {
    theme = preferences ? JSON.parse(preferences) : {};
  } catch (e) {
    theme = {};
  }

  const success = theme.successColor || "green";
  const danger = theme.dangerColor || "red";
  const cardBg = theme.cardBackground || "white";

  return (
    <div
      className={`
        p-6 rounded-xl shadow-md w-full max-w-sm mx-auto mt-6
        bg-${cardBg} dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
      `}
    >
      <h2 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
        Hasil Penilaian
      </h2>

      <div className="flex gap-4">
        {/* Benar */}
        <div
          className={`
            flex-1 p-4 rounded-xl text-center 
            bg-${success}-100 text-${success}-700
            dark:bg-${success}-900/30 dark:text-${success}-300
          `}
        >
          <p className="text-sm">Benar</p>
          <p className="text-3xl font-bold">{correct}</p>
        </div>

        {/* Salah */}
        <div
          className={`
            flex-1 p-4 rounded-xl text-center 
            bg-${danger}-100 text-${danger}-700
            dark:bg-${danger}-900/30 dark:text-${danger}-300
          `}
        >
          <p className="text-sm">Salah</p>
          <p className="text-3xl font-bold">{incorrect}</p>
        </div>
      </div>
    </div>
  );
}
