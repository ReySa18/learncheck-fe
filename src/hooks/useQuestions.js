// ================================================================
// Mengelola seluruh state dan proses LearnCheck,
// termasuk load soal, menyimpan jawaban, navigasi pertanyaan,
// mengirim jawaban ke server, dan menampilkan feedback hasil evaluasi.
// ================================================================
import { useEffect, useState } from 'react';
import { fetchGeneratedQuestions } from '../api/generate';
import { submitUserAnswers } from '../api/submit';

import { getQuestions, saveQuestions, getUserAnswers, saveUserAnswer, clearLearncheckState, saveFeedback, getFeedback, saveStatus, getStatus, StorageKeys, savePreferences, getPreferences, storage } from '../utils/learncheckState';

// ================================================================
// Main Hook
// menerima parameter tutorialId + userId untuk otentikasi data
// ================================================================
export default function useQuestions({ tutorialId, userId }) {
  const [questions, setQuestions] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CURRENT_INDEX_KEY = `${StorageKeys.CURRENT_INDEX}_${userId}_${tutorialId}`;

  // ================================================================
  // NORMALIZER → Menyamaratakan struktur soal agar konsisten
  // field API kadang berbeda penamaan → diselaraskan di sini
  // ================================================================
  function normalizeQuestion(q) {
    return {
      id: q.id,
      text: q.question ?? q.text ?? '',
      options: q.choices ?? q.options ?? [],
      hint: q.hint ?? '',
      correct_index: Array.isArray(q.correct_index) ? q.correct_index : typeof q.correct_index === 'number' ? [q.correct_index] : [],
      raw: q,
    };
  }

  // ================================================================
  // LOAD DATA → mengambil pertanyaan dari localStorage jika ada
  // jika belum ada → generate dari API
  // ================================================================
  async function load() {
    setError(null);
    setIsGenerating(true);

    const status = getStatus();
    const savedQuestions = getQuestions();
    const savedAnswers = getUserAnswers();
    const savedFeedback = getFeedback();
    const savedIndex = storage.get(CURRENT_INDEX_KEY);
    const savedPreferences = getPreferences();

    const hasExisting = savedQuestions.length > 0;

    try {
      if (hasExisting) {
        const normalized = savedQuestions.map(normalizeQuestion);

        setQuestions(normalized);
        setUserAnswers(savedAnswers);
        setFeedback(status.submitted ? savedFeedback : null);

        if (savedPreferences) {
          setPreferences(JSON.stringify(savedPreferences));
        }

        setCurrentIndex(savedIndex ? Number(savedIndex) : 0);

        setIsGenerating(false);
        return;
      }

      const res = await fetchGeneratedQuestions({ tutorialId, userId });
      const data = res.data;

      const fetched = data?.questions || [];
      const normalized = fetched.map(normalizeQuestion);

      setQuestions(normalized);
      saveQuestions(fetched);

      setPreferences(JSON.stringify(data?.preferences ?? {}));
      savePreferences(data?.preferences ?? {});

      setUserAnswers({});
      saveStatus({ submitted: false, feedback_generated: false });

      setCurrentIndex(0);
      storage.set(CURRENT_INDEX_KEY, 0);
    } catch (err) {
      console.error('Load error:', err);
      setError(err.message || 'Failed loading questions');
      setQuestions([]);
      clearLearncheckState();
    } finally {
      setIsGenerating(false);
    }
  }

  useEffect(() => {
    load();
  }, [tutorialId, userId]);

  // ================================================================
  // SET ANSWER → ajukan jawaban user (single/multi choice)
  // ================================================================
  function setAnswer(questionId, value) {
    const q = questions.find((x) => x.id === questionId);
    const isMulti = q && Array.isArray(q.correct_index) && q.correct_index.length > 1;

    setUserAnswers((prev) => {
      let updatedAnswer;

      if (!isMulti) {
        updatedAnswer = value;
      } else {
        const prevArr = Array.isArray(prev[questionId]) ? prev[questionId] : [];
        updatedAnswer = prevArr.includes(value) ? prevArr.filter((v) => v !== value) : [...prevArr, value];
      }

      const next = { ...prev, [questionId]: updatedAnswer };

      saveUserAnswer(questionId, updatedAnswer);
      return next;
    });
  }

  // ================================================================
  // CLEAR ANSWER → menghapus jawaban untuk soal tertentu
  // ================================================================
  function clearAnswer(questionId) {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[questionId];

      storage.remove(StorageKeys.ANSWERS);

      Object.entries(next).forEach(([qid, val]) => {
        saveUserAnswer(qid, val);
      });

      return next;
    });
  }

  /* ============================================
     NAVIGATION
  ============================================ */
  function nextQuestion() {
    setCurrentIndex((i) => {
      const ni = Math.min(i + 1, questions.length - 1);
      storage.set(CURRENT_INDEX_KEY, ni);
      return ni;
    });
  }

  function prevQuestion() {
    setCurrentIndex((i) => {
      const ni = Math.max(i - 1, 0);
      storage.set(CURRENT_INDEX_KEY, ni);
      return ni;
    });
  }

  /* ============================================
     HELPERS
  ============================================ */
  function resolveSelectedIndex(q, stored) {
    if (stored == null) return [];
    if (typeof stored === 'number') return [stored];
    if (Array.isArray(stored)) return stored;
    return [];
  }

  function isAnswered(v) {
    if (v == null) return false;
    if (Array.isArray(v)) return v.length > 0;
    return true;
  }

  const answeredCount = questions.filter((q) => isAnswered(userAnswers[q.id])).length;

  const allAnswered = answeredCount === questions.length;

  // ================================================================
  // SUBMIT JAWABAN ke BACKEND + GENERATE FEEDBACK
  // ================================================================
  async function submitAnswers() {
    setIsSubmitting(true);

    try {
      const payload = questions.map((q) => ({
        id: q.id,
        question_text: q.text,
        options: q.options,
        correct_answer: q.correct_index.map((i) => q.options[i]),
        user_answer: resolveSelectedIndex(q, userAnswers[q.id]).map((i) => q.options[i]),
      }));

      const res = await submitUserAnswers({
        tutorialId,
        userId,
        questions: payload,
      });

      const merged = res.data.details.map((fb) => {
        const q = questions.find((x) => x.id === fb.id);
        const userIdx = resolveSelectedIndex(q, userAnswers[fb.id]);

        return {
          id: fb.id,
          question: q.text,
          options: q.options,
          userSelectedIndex: userIdx,
          correctIndex: q.correct_index,
          isCorrect: fb.is_correct,
          explanation: fb.explanation,
        };
      });

      const finalFeedback = {
        total: res.data.total,
        correct: res.data.correct,
        details: merged,
      };

      saveFeedback(finalFeedback);
      saveStatus({ submitted: true, feedback_generated: true });

      setFeedback(finalFeedback);
      return merged;
    } finally {
      setIsSubmitting(false);
    }
  }

  // ================================================================
  // RESET SESSION → hapus semua data & generate soal baru
  // ================================================================
  function resetSession() {
    // Hapus semua data Learncheck
    clearLearncheckState();

    // Reset state di React
    setQuestions([]);
    setUserAnswers({});
    setFeedback(null);
    setCurrentIndex(0);

    // Muat ulang soal (localStorage sudah bersih)
    load();
  }

  /* ============================================ */
  return {
    questions,
    preferences,
    userAnswers,
    currentIndex,
    isGenerating,
    isSubmitting,
    feedback,
    setAnswer,
    clearAnswer,
    nextQuestion,
    prevQuestion,
    submitAnswers,
    allAnswered,
    error,
    resetSession,
  };
}
