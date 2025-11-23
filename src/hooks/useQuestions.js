// src/hooks/useQuestions.js
import { useEffect, useState } from "react";
import { fetchGeneratedQuestions } from "../api/generate";

/**
 * Hook useQuestions (final)
 * - Mengambil data dari backend via fetchGeneratedQuestions
 * - Menormalisasi struktur soal supaya komponen UI konsisten:
 *     { id, text, options, hint, correct_index }
 * - Menyimpan userAnswers (bisa berupa index number atau option string)
 * - Menyediakan navigasi dan submit lokal (submitAnswers -> menghasilkan feedback)
 */
export default function useQuestions({ tutorialId, userId }) {
  const [questions, setQuestions] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedIndexOrValue }
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    load();
    // reset when tutorialId/userId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutorialId, userId]);

  // Normalize backend question shape -> { id, text, options, hint, correct_index }
  function normalizeQuestion(q) {
    return {
      id: q.id,
      text: q.question ?? q.text ?? "",
      options: q.choices ?? q.options ?? [],
      hint: q.hint ?? "",
      correct_index:
        typeof q.correct_index === "number"
          ? q.correct_index
          : // try to resolve if backend provided correct_answer as value
            typeof q.correct_answer !== "undefined"
          ? (q.choices || q.options || []).indexOf(q.correct_answer)
          : null,
      raw: q, // keep original in case needed
    };
  }

  async function load() {
    setLoading(true);
    setError(null);
    setFeedback(null);
    setCurrentIndex(0);
    setUserAnswers({});

    try {
      const response = await fetchGeneratedQuestions({ tutorialId, userId });
      const data = response?.data ?? response;

      const rawQuestions = data?.questions || [];
      const normalized = rawQuestions.map(normalizeQuestion);

      setQuestions(normalized);
      setPreferences(JSON.stringify(data?.preferences ?? {}));
    } catch (err) {
      console.error("Failed loading questions:", err);
      setError(err?.message ?? String(err));
      setQuestions([]);
      setPreferences(null);
    } finally {
      setLoading(false);
    }
  }

  function setAnswer(questionId, valueOrIndex) {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: valueOrIndex,
    }));
  }

  function nextQuestion() {
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  }

  function prevQuestion() {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  function resolveSelectedIndex(q, stored) {
    if (stored == null) return null;
    if (typeof stored === "number") return stored;
    const idx = (q.options || []).indexOf(stored);
    return idx >= 0 ? idx : null;
  }

  function submitAnswers() {
    const details = questions.map((q) => {
      const selIdx = resolveSelectedIndex(q, userAnswers[q.id]);
      const isCorrect =
        typeof q.correct_index === "number" && selIdx === q.correct_index;

      return {
        id: q.id,
        question: q.text,
        options: q.options,
        correct_index: q.correct_index,
        correctAnswer:
          typeof q.correct_index === "number"
            ? q.options[q.correct_index]
            : null,
        userSelectedIndex: selIdx,
        userAnswer:
          selIdx != null && typeof q.options[selIdx] !== "undefined"
            ? q.options[selIdx]
            : null,
        isCorrect,
        hint: q.hint ?? null,
      };
    });

    const correctCount = details.filter((d) => d.isCorrect).length;
    const total = details.length;

    setFeedback({
      total,
      correct: correctCount,
      details,
    });
    return { total, correct: correctCount, details };
  }

  return {
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
  };
}
