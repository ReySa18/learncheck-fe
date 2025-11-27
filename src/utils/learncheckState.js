// ========================
// Storage Keys
// ========================
export const StorageKeys = {
  PREFERENCES: 'lc_preferences',
  QUESTIONS: 'lc_questions',
  ANSWERS: 'lc_answers',
  FEEDBACK: 'lc_feedback',
  STATUS: 'lc_status',
  CURRENT_INDEX: 'lc_current_index',
};

// ========================
// Storage interface
// ========================
export const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key) {
    const raw = localStorage.getItem(key);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clearAll() {
    Object.values(StorageKeys).forEach((k) => localStorage.removeItem(k));
  },
};

// ========================
// PREFERENCES
// ========================
export function savePreferences(prefs) {
  storage.set(StorageKeys.PREFERENCES, prefs);
}

export function getPreferences() {
  return storage.get(StorageKeys.PREFERENCES) ?? null;
}

// ========================
// QUESTIONS
// ========================
export function saveQuestions(q) {
  storage.set(StorageKeys.QUESTIONS, q);
}

export function getQuestions() {
  return storage.get(StorageKeys.QUESTIONS) ?? [];
}

// ========================
// ANSWERS
// ========================
export function saveUserAnswer(id, value) {
  const all = storage.get(StorageKeys.ANSWERS) ?? {};
  all[id] = value;
  storage.set(StorageKeys.ANSWERS, all);
}

export function getUserAnswers() {
  return storage.get(StorageKeys.ANSWERS) ?? {};
}

// ========================
// FEEDBACK
// ========================
export function saveFeedback(fb) {
  storage.set(StorageKeys.FEEDBACK, fb);
}

export function getFeedback() {
  return storage.get(StorageKeys.FEEDBACK);
}

// ========================
// STATUS
// ========================
export function saveStatus(status) {
  storage.set(StorageKeys.STATUS, status);
}

export function getStatus() {
  return (
    storage.get(StorageKeys.STATUS) ?? {
      submitted: false,
      feedback_generated: false,
    }
  );
}

// ========================
// CLEAR ALL (FIXED)
// ========================
export function clearLearncheckState() {
  // Ambil snapshot semua key localStorage
  const keysToRemove = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('lc_')) {
      keysToRemove.push(key);
    }
  }

  // Hapus semua key yang match prefix lc_
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
