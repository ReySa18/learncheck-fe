// src/hooks/useQuestions.js
import { useEffect, useState } from "react";
import { fetchGeneratedQuestions } from "../api/generate";
import { submitUserAnswers } from "../api/submit"; // pastikan ini menunjuk ke submit API baru

export default function useQuestions({ tutorialId, userId }) {
  const [questions, setQuestions] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    load();
  }, [tutorialId, userId]);

  function normalizeQuestion(q) {
    return {
      id: q.id,
      text: q.question ?? q.text ?? "",
      options: q.choices ?? q.options ?? [],
      hint: q.hint ?? "",
      correct_index:
        typeof q.correct_index === "number"
          ? q.correct_index
          : typeof q.correct_answer !== "undefined"
          ? (q.choices || q.options || []).indexOf(q.correct_answer)
          : null,
      raw: q,
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

  function clearAnswer(questionId) {
    setUserAnswers((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
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

  async function submitAnswers() {
    // bentuk payload untuk backend
    const payload = questions.map((q) => ({
      id: q.id,
      question_text: q.text,
      options: q.options,
      correct_answer: q.options[q.correct_index],
      user_answer:
        resolveSelectedIndex(q, userAnswers[q.id]) != null
          ? q.options[resolveSelectedIndex(q, userAnswers[q.id])]
          : null
    }));

    // panggil backend
    const res = await submitUserAnswers({
      tutorialId,
      userId,
      questions: payload
    });

    // merge data backend + FE untuk membuat bentuk final
    const merged = res.data.details.map((fb) => {
      const q = questions.find((x) => x.id === fb.id);
      const userIdx = resolveSelectedIndex(q, userAnswers[fb.id]);

      return {
        id: fb.id,
        question: q.text,
        options: q.options,
        userSelectedIndex: userIdx,
        correctIndex: q.correct_index,   // ← konsisten!
        isCorrect: fb.is_correct,
        explanation: fb.explanation,
      };
    });

    setFeedback({
      total: res.data.total,
      correct: res.data.correct,
      details: merged,
    });

    return merged;
  }

  return {
    questions,
    preferences,
    userAnswers,
    currentIndex,
    loading,
    feedback,
    setAnswer,
    clearAnswer,
    nextQuestion,
    prevQuestion,
    submitAnswers,
    error,
  };
}
