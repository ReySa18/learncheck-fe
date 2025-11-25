import { useState, useEffect } from "react"; 
import MainCardContainer from "../components/layout/MainCardContainer";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import Header from "../components/layout/Header";
import ProgressIndicator from "../components/common/ProgressIndicator";
import QuestionCard from "../components/question/QuestionCard";
import FeedbackCard from "../components/feedback/FeedbackCard";
import useQuestions from "../hooks/useQuestions";
import NavigationButtons from "../components/navigation/NavigationButtons";

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

  // 🔥 Tambahan: state untuk menandai soal
  const [flaggedQuestions, setFlaggedQuestions] = useState({});

  const markQuestion = (id) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const question = questions?.[currentIndex];

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
        onToggleHint={() => setShowHint((prev) => !prev)}
      />

      {/* 🔥 Modularized Navigation */}
      <NavigationButtons
        currentIndex={currentIndex}
        isLast={isLast}
        prevQuestion={prevQuestion}
        nextQuestion={nextQuestion}
        submitAnswers={submitAnswers}
        question={question}
        userAnswers={userAnswers}
        flaggedQuestions={flaggedQuestions}
        markQuestion={markQuestion}
      />

    </MainCardContainer>
  );
}
