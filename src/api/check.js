export async function submitUserAnswers({ tutorialId, userId, answers }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const res = await fetch(`${baseUrl}/api/check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tutorial_id: tutorialId,
      user_id: userId,
      answers,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to submit answers");
  }

  return res.json();
}
