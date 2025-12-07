import { useState, useEffect } from 'react';
import MainCardContainer from '../components/layout/MainCardContainer';
import CenteredGeneratingCard from '../components/common/CenteredGeneratingCard';
import Header from '../components/layout/Header';
import ProgressIndicator from '../components/common/ProgressIndicator';
import QuestionCard from '../components/question/QuestionCard';
import useQuestions from '../hooks/useQuestions';
import NavigationButtons from '../components/navigation/NavigationButtons';
import QuestionReviewCard from '../components/feedback/QuestionReviewCard';
import ReviewNavigationButtons from '../components/feedback/ReviewNavigationButtons';
import FeedbackLoading from '../components/common/FeedbackLoading';
import ResultSummaryCard from '../components/feedback/ResultSummaryCard';
import AppErrorPage from '../components/common/AppErrorPage';

export default function LearncheckPage({ tutorialId, userId }) {
  const { questions, preferences, userAnswers, currentIndex, isGenerating, isSubmitting, feedback, setAnswer, nextQuestion, prevQuestion, submitAnswers, clearAnswer, error, resetSession } = useQuestions({ tutorialId, userId });

  const [showHint, setShowHint] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const question = questions?.[currentIndex];

  useEffect(() => {
    setShowHint(false);
  }, [currentIndex]);

  // =====================================
  // ERROR
  // =====================================
  if (error) {
    return (
      <MainCardContainer preferences={preferences}>
      <Header />
      <AppErrorPage 
      message="Gagal memuat data. Periksa koneksi atau coba ulang."
      onRetry={resetSession}
    />
    </MainCardContainer>
    );
  }

  // GENERATE
  if (isGenerating) {
    return (
      <MainCardContainer preferences={preferences}>
        <CenteredGeneratingCard message="LearnCheck sedang membuat soal..." />
      </MainCardContainer>
    );
  }

  // NO QUESTIONS
  if (questions.length === 0) {
    return (
      <MainCardContainer preferences={preferences}>
        <Header />
        <AppErrorPage 
          message="Gagal memuat data. Periksa koneksi atau coba ulang."
          onRetry={resetSession}
        />
      </MainCardContainer>
    );
  }

  // SUBMITTING
  if (isSubmitting) {
    return <FeedbackLoading message="LearnCheck sedang memeriksa jawaban..." />;
  }

  // =====================================
  // FEEDBACK MODE
  // =====================================
  if (feedback) {
    const safeIndex = Math.min(reviewIndex, feedback.total - 1);
    const item = feedback.details[safeIndex];

    return (
      <MainCardContainer preferences={preferences}>
        <Header />

        {/* OVERLAY SUMMARY */}
        {!showReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div
              className="
                rounded-xl shadow-lg p-6 w-[90%] max-w-lg
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
              "
            >
              <ResultSummaryCard feedback={feedback} preferences={preferences} />

              <button
                onClick={() => setShowReview(true)}
                className="
                  mt-4 w-full px-4 py-2 rounded-lg transition
                  bg-blue-600 hover:bg-blue-700 text-white
                "
              >
                Lihat Pembahasan
              </button>
            </div>
          </div>
        )}


        {/* REVIEW AREA */}
        <div className={!showReview ? 'blur-sm pointer-events-none' : ''}>
          <QuestionReviewCard 
            item={item} 
            index={safeIndex} 
            total={feedback.total} 
            preferences={preferences} 
          />

          <ReviewNavigationButtons
            index={safeIndex}
            total={feedback.total}
            onPrev={() => setReviewIndex((i) => Math.max(0, i - 1))}
            onNext={() => setReviewIndex((i) => Math.min(feedback.total - 1, i + 1))}
            onRestart={() => {
              setShowReview(false);
              resetSession();
            }}
          />
        </div>
      </MainCardContainer>
    );
  }

  // =====================================
  // DEFAULT QUESTION MODE (FIXED)
  // =====================================
  const total = questions.length;
  const isLast = currentIndex === total - 1;

  return (
    <MainCardContainer preferences={preferences}>
      <Header />

      <ProgressIndicator current={currentIndex + 1} total={total} />

      <QuestionCard question={question} index={currentIndex} total={total} answer={userAnswers[question.id]} showHint={showHint} onAnswerChange={setAnswer} onClearAnswer={clearAnswer} onToggleHint={() => setShowHint((prev) => !prev)} />

      <NavigationButtons currentIndex={currentIndex} isLast={isLast} total={total} prevQuestion={prevQuestion} nextQuestion={nextQuestion} submitAnswers={submitAnswers} question={question} userAnswers={userAnswers} />
    </MainCardContainer>
  );
}
