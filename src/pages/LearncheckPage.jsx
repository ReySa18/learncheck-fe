import { useState, useEffect } from "react"; 
import MainCardContainer from "../components/layout/MainCardContainer";
import CenteredGeneratingCard from "../components/common/CenteredGeneratingCard";
import Header from "../components/layout/Header";
import ProgressIndicator from "../components/common/ProgressIndicator";
import QuestionCard from "../components/question/QuestionCard";
import useQuestions from "../hooks/useQuestions";
import NavigationButtons from "../components/navigation/NavigationButtons";
import QuestionReviewCard from "../components/feedback/QuestionReviewCard";
import ReviewNavigationButtons from "../components/feedback/ReviewNavigationButtons";
import FeedbackLoading from "../components/common/FeedbackLoading";
import AppAlert from "../components/common/AppAlert";

export default function LearncheckPage({ tutorialId, userId }) {
  const {
    questions,
    preferences,
    userAnswers,
    currentIndex,
    isGenerating,
    isSubmitting,
    feedback,
    setAnswer,
    nextQuestion,
    prevQuestion,
    submitAnswers,
    clearAnswer,
    error,
  } = useQuestions({ tutorialId, userId });

  const [showHint, setShowHint] = useState(false);


  const [reviewIndex, setReviewIndex] = useState(0);

  const question = questions?.[currentIndex];

  useEffect(() => {
    setShowHint(false);
  }, [currentIndex]);

  if (error) {
    return (
      <MainCardContainer preferences={preferences}>
        <Header />
        <div className="mt-4">
          <AppAlert
            type="error"
            message={`Gagal memuat data`}
          />
        </div>
      </MainCardContainer>
    );
  }


  if (isGenerating) {
    return (
      <MainCardContainer preferences={preferences}>
        <CenteredGeneratingCard message="LearnCheck sedang membuat soal..." />
      </MainCardContainer>
    );
  }

  if (questions.length === 0) {
    return (
      <MainCardContainer preferences={preferences}>
        <Header />
        <AppAlert
          type="info"
          message="Tidak ada pertanyaan tersedia untuk materi ini."
          className="mt-6"
        />
      </MainCardContainer>
    );
  }

  if (isSubmitting) {
    return <FeedbackLoading message="LearnCheck sedang memeriksa jawaban..." />;
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
      />
    </MainCardContainer>
  );
}