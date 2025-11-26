// src/hooks/useQuestions.js
import { useEffect, useState } from "react";
import { fetchGeneratedQuestions } from "../api/generate";
import { submitUserAnswers } from "../api/submit";

export default function useQuestions({ tutorialId, userId }) {
  const [questions, setQuestions] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    load();
  }, [tutorialId, userId]);

  /** ------------------------------
   * NORMALIZER — selalu hasilkan correct_index berupa array
   --------------------------------*/
  function normalizeQuestion(q) {
    return {
      id: q.id,
      text: q.question ?? q.text ?? "",
      options: q.choices ?? q.options ?? [],
      hint: q.hint ?? "",
      correct_index: Array.isArray(q.correct_index)
        ? q.correct_index
        : typeof q.correct_index === "number"
        ? [q.correct_index]
        : [],
      raw: q,
    };
  }

  /** ------------------------------
   * LOAD QUESTIONS
   --------------------------------*/
  async function load() {
    setError(null);
    setFeedback(null);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsGenerating(true);

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
      setIsGenerating(false);
    }
  }

  /** ------------------------------
   * SET ANSWER (radio atau checkbox)
   --------------------------------*/
  function setAnswer(questionId, value) {
    setUserAnswers((prev) => {
      const q = questions.find((x) => x.id === questionId);
      const isMulti = q && Array.isArray(q.correct_index) && q.correct_index.length > 1;

      if (!isMulti) {
        // single answer (radio)
        return { ...prev, [questionId]: value };
      }

      // multiple answer (checkbox)
      const prevArr = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      let nextArr;

      if (prevArr.includes(value)) {
        nextArr = prevArr.filter((v) => v !== value); // uncheck
      } else {
        nextArr = [...prevArr, value]; // check
      }

      return { ...prev, [questionId]: nextArr };
    });
  }

  /** ------------------------------ */
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

  /** ------------------------------
   * Convert userAnswers to array of index
   --------------------------------*/
  function resolveSelectedIndex(q, stored) {
    if (stored == null) return [];
    if (typeof stored === "number") return [stored];
    if (Array.isArray(stored)) return stored;
    return [];
  }

  /** ------------------------------
   * Helper untuk tombol submit
   --------------------------------*/
  function isAnswered(value) {
    if (value == null) return false;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  }

  const answeredCount = questions.filter((q) =>
    isAnswered(userAnswers[q.id])
  ).length;

  const allAnswered = answeredCount === questions.length;

  /** ------------------------------
   * SUBMIT ANSWERS (payload multiple answer)
   --------------------------------*/
  async function submitAnswers() {
    setIsSubmitting(true);

    try {
      const payload = questions.map((q) => ({
        id: q.id,
        question_text: q.text,
        options: q.options,

        // correct_answer wajib array
        correct_answer: q.correct_index.map((idx) => q.options[idx]),

        // user_answer selalu array juga
        user_answer: resolveSelectedIndex(q, userAnswers[q.id]).map(
          (idx) => q.options[idx]
        ),
      }));

      const res = await submitUserAnswers({
        tutorialId,
        userId,
        questions: payload,
      });

      // merge backend + FE
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

      setFeedback({
        total: res.data.total,
        correct: res.data.correct,
        details: merged,
      });

      return merged;
    } finally {
      setIsSubmitting(false);
    }
  }

  /** ------------------------------ */
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
  };
}
