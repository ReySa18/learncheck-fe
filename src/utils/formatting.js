// src/utils/formatting.js

export const normalizeText = text => {
  if (!text) return "";
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

export const stripAiIndicator = text => {
  if (!text) return "";
  return text
    .replace(/berikut.?penjelasan.*?:?/gi, "")
    .replace(/penjelasan:?\s*/gi, "")
    .trim();
};

export const formatFeedback = text => {
  return normalizeText(stripAiIndicator(text));
};

export const formatQuestionText = text => {
  return normalizeText(text);
};
