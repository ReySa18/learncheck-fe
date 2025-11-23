export async function fetchGeneratedQuestions({ tutorialId, userId }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const res = await fetch(
    `${baseUrl}/api/generate?tutorial_id=${tutorialId}&user_id=${userId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch generated questions");
  }

  return await res.json();
}
