import { useState, useEffect } from "react"; 
import MainCardContainer from "../components/layout/MainCardContainer";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import Header from "../components/layout/Header";
import ProgressIndicator from "../components/common/ProgressIndicator";
import QuestionCard from "../components/question/QuestionCard";
import FeedbackCard from "../components/feedback/FeedbackCard";
import useQuestions from "../hooks/useQuestions";

export default function LearncheckPage({ tutorialId, userId }) {
  const {
    questions,
    preferences,
    userAnswers,
    currentIndex,
    loading,
    feedback,
    setAnswer,
    nextQuestion,
    prevQuestion,
    submitAnswers,
    error,
  } = useQuestions({ tutorialId, userId });

  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setShowHint(false);
  }, [currentIndex]);

  if (error) {
    return <div className="p-6 text-red-600">Gagal memuat data: {error}</div>;
  }

  if (loading || !questions) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <LoadingSkeleton lines={6} />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        Tidak ada pertanyaan tersedia.
      </div>
    );
  }

  if (feedback) {
    return (
      <div className="max-w-[var(--app-layout-width)] mx-auto px-4 py-6">
        <FeedbackCard result={feedback} />
      </div>
    );
  }

  const question = questions[currentIndex];
  const total = questions.length;
  const isLast = currentIndex === total - 1;

  return (
        <MainCardContainer preferences={preferences}>

          <Header />

          <ProgressIndicator current={currentIndex} total={total} />

          <QuestionCard
            question={question}
            index={currentIndex}
            total={total}
            answer={userAnswers[question.id] || ""}
            onAnswerChange={(val) => setAnswer(question.id, val)}
            showHint={showHint}
            onToggleHint={() => setShowHint(prev => !prev)}
          />

          <div className="flex items-center justify-between mt-6">
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

            {!isLast ? (
              <button
                onClick={nextQuestion}
                disabled={!userAnswers[question.id]}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  userAnswers[question.id]
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Selanjutnya
              </button>
            ) : (
              <button
                onClick={submitAnswers}
                disabled={Object.keys(userAnswers).length !== questions.length}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  Object.keys(userAnswers).length === questions.length
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Jawaban
              </button>
            )}
          </div>
        </MainCardContainer>
  );
}
