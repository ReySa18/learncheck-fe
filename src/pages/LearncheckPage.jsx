import { useState, useEffect } from "react"; 
import MainCardContainer from "../components/layout/MainCardContainer";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import Header from "../components/layout/Header";
import ProgressIndicator from "../components/common/ProgressIndicator";
import QuestionCard from "../components/question/QuestionCard";
import FeedbackCard from "../components/feedback/FeedbackCard";
import useQuestions from "../hooks/useQuestions";
import NavigationButtons from "../components/navigation/NavigationButtons";
//import FeedbackReview from "../components/feedback/FeedbackReview";
import QuestionReviewCard from "../components/feedback/QuestionReviewCard";
import ReviewNavigationButtons from "../components/feedback/ReviewNavigationButtons";

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
    clearAnswer,
    error,
  } = useQuestions({ tutorialId, userId });

  const [showHint, setShowHint] = useState(false);

  const [flaggedQuestions, setFlaggedQuestions] = useState({});

  const [reviewIndex, setReviewIndex] = useState(0);

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
    const item = feedback.details[reviewIndex]; // ambil soal yg sedang direview

    return (
      <MainCardContainer preferences={preferences}>
        <Header />

        <QuestionReviewCard
          item={item}
          index={reviewIndex}
          total={feedback.total}
        />

        <ReviewNavigationButtons
          index={reviewIndex}
          total={feedback.total}
          onPrev={() => setReviewIndex(i => Math.max(0, i - 1))}
          onNext={() => setReviewIndex(i => Math.min(feedback.total - 1, i + 1))}
          onRestart={() => window.location.reload()}
        />
      </MainCardContainer>
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
        onClearAnswer={() => clearAnswer(question.id)}   // ✅ Tambahkan ini!
        showHint={showHint}
        onToggleHint={() => setShowHint((prev) => !prev)}
      />

      {/* 🔥 Modularized Navigation */}
      <NavigationButtons
        currentIndex={currentIndex}
        isLast={isLast}
        total={total}     
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