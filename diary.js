/**
 * diary.js
 * Lymphocytic Colitis Companion — Diary Data Layer
 *
 * Handles all reading and writing of diary entries to localStorage.
 * No server, no account, no sync — data lives on this device only.
 *
 * DATA MODEL
 * ----------
 * A DiaryEntry represents one meal or symptom log event.
 *
 * DiaryEntry {
 *   id          — string, UUID v4, generated at creation
 *   createdAt   — ISO 8601 string, exact time entry was saved
 *   date        — string "YYYY-MM-DD", the calendar date this entry belongs to
 *   time        — string "HH:MM" (24h), time of meal/symptom
 *   type        — "meal" | "symptom"
 *
 *   // Meal fields (type === "meal")
 *   foods       — string[], food names or free-text entries
 *   foodIds     — string[], optional IDs from data.js FOODS (for tier tracking)
 *   portion     — "S" | "M" | "L"
 *   prepMethod  — string, free text (e.g. "steamed", "baked", "plain")
 *   notes       — string, optional free text
 *
 *   // Symptom fields (type === "symptom")
 *   bmCount     — number, bowel movements since last log entry (0–20)
 *   urgency     — boolean
 *   bloating    — number 0–5 (0 = none, 5 = severe)
 *   cramping    — boolean
 *   symptomNotes — string, optional free text
 *   linkedMealId — string|null, optional link to a prior meal entry
 *   hoursAfterMeal — number|null, e.g. 1 or 4, for the timed check-in prompts
 * }
 *
 * STORAGE KEY
 * -----------
 * All entries stored under a single key: "lc_diary_entries"
 * Value: JSON array of DiaryEntry objects, sorted newest-first on write.
 *
 * SETTINGS stored separately under "lc_settings"
 * Settings {
 *   recoveryStartDate — "YYYY-MM-DD", the date recovery phase began
 *                       Used to calculate which week the patient is in.
 *   name              — string, optional first name for personalisation
 * }
 */

const STORAGE_KEY = "lc_diary_entries";
const SETTINGS_KEY = "lc_settings";

// ─── ID GENERATION ────────────────────────────────────────────────────────────

/**
 * Generate a simple UUID v4.
 * Uses crypto.randomUUID() where available (all modern browsers),
 * falls back to a manual implementation for older environments.
 */
function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─── DATE HELPERS ─────────────────────────────────────────────────────────────

/**
 * Return today's date as "YYYY-MM-DD".
 */
export function todayString() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Return current time as "HH:MM" (24h).
 */
export function nowTimeString() {
  const d = new Date();
  return d.toTimeString().slice(0, 5);
}

/**
 * Format a "YYYY-MM-DD" string for display: "Monday, June 23, 2026"
 */
export function formatDateDisplay(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a "YYYY-MM-DD" string as a short label: "Jun 23"
 */
export function formatDateShort(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Return the number of days between two "YYYY-MM-DD" strings.
 * Positive if dateB is after dateA.
 */
export function daysBetween(dateA, dateB) {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

/**
 * Return an array of "YYYY-MM-DD" strings for the last N days,
 * from oldest to newest, inclusive of today.
 */
export function lastNDays(n) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────

/**
 * Load settings object from localStorage.
 * Returns defaults if not yet set.
 */
export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return { recoveryStartDate: todayString(), name: "" };
    }
    return JSON.parse(raw);
  } catch {
    return { recoveryStartDate: todayString(), name: "" };
  }
}

/**
 * Save settings object to localStorage.
 * Merges with existing settings so partial updates are safe.
 */
export function saveSettings(updates) {
  const current = loadSettings();
  const merged = { ...current, ...updates };
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    console.error("Could not save settings to localStorage.");
    return merged;
  }
}

/**
 * Return the current recovery week number (1-indexed).
 * Week 1 = days 1–7 from recoveryStartDate, etc.
 * Returns null if no recoveryStartDate is set.
 */
export function currentRecoveryWeek() {
  const { recoveryStartDate } = loadSettings();
  if (!recoveryStartDate) return null;
  const days = daysBetween(recoveryStartDate, todayString());
  return Math.max(1, Math.floor(days / 7) + 1);
}

/**
 * Return the recovery phase label for the current week.
 * "repair" for weeks 1–6, "reintroduction" for week 7+.
 */
export function currentRecoveryPhase() {
  const week = currentRecoveryWeek();
  if (week === null) return "repair";
  return week <= 6 ? "repair" : "reintroduction";
}

// ─── CORE STORAGE ─────────────────────────────────────────────────────────────

/**
 * Load all diary entries from localStorage.
 * Returns an empty array if nothing is stored or on parse error.
 */
export function loadAllEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    console.error("Could not load diary entries from localStorage.");
    return [];
  }
}

/**
 * Persist the full entries array to localStorage.
 * Internal — use the public mutation functions below.
 */
function persistEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch (e) {
    // localStorage can throw if storage quota is exceeded
    console.error("Could not save diary entries:", e);
    return false;
  }
}

// ─── ENTRY CRUD ───────────────────────────────────────────────────────────────

/**
 * Add a new diary entry.
 * Automatically assigns id, createdAt, and date if not provided.
 * Returns the saved entry.
 */
export function addEntry(entryData) {
  const entries = loadAllEntries();
  const now = new Date();

  const entry = {
    id: generateId(),
    createdAt: now.toISOString(),
    date: entryData.date || todayString(),
    time: entryData.time || nowTimeString(),
    ...entryData,
  };

  // Validate required type field
  if (!["meal", "symptom"].includes(entry.type)) {
    throw new Error(`Invalid entry type: "${entry.type}". Must be "meal" or "symptom".`);
  }

  entries.unshift(entry); // newest first
  persistEntries(entries);
  return entry;
}

/**
 * Update an existing entry by ID.
 * Merges the provided fields into the existing entry.
 * Returns the updated entry, or null if not found.
 */
export function updateEntry(id, updates) {
  const entries = loadAllEntries();
  const index = entries.findIndex((e) => e.id === id);
  if (index === -1) return null;

  entries[index] = { ...entries[index], ...updates };
  persistEntries(entries);
  return entries[index];
}

/**
 * Delete an entry by ID.
 * Returns true if deleted, false if not found.
 */
export function deleteEntry(id) {
  const entries = loadAllEntries();
  const filtered = entries.filter((e) => e.id !== id);
  if (filtered.length === entries.length) return false;
  persistEntries(filtered);
  return true;
}

/**
 * Get a single entry by ID.
 * Returns the entry or null.
 */
export function getEntryById(id) {
  return loadAllEntries().find((e) => e.id === id) || null;
}

// ─── QUERIES ──────────────────────────────────────────────────────────────────

/**
 * Return all entries for a specific date ("YYYY-MM-DD"),
 * sorted by time ascending.
 */
export function getEntriesForDate(dateStr) {
  return loadAllEntries()
    .filter((e) => e.date === dateStr)
    .sort((a, b) => a.time.localeCompare(b.time));
}

/**
 * Return all entries for a date range (inclusive), sorted by date+time ascending.
 * dateFrom and dateTo are "YYYY-MM-DD" strings.
 */
export function getEntriesForRange(dateFrom, dateTo) {
  return loadAllEntries()
    .filter((e) => e.date >= dateFrom && e.date <= dateTo)
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
    });
}

/**
 * Return all meal entries only.
 */
export function getMealEntries() {
  return loadAllEntries().filter((e) => e.type === "meal");
}

/**
 * Return all symptom entries only.
 */
export function getSymptomEntries() {
  return loadAllEntries().filter((e) => e.type === "symptom");
}

/**
 * Return today's entries, sorted by time ascending.
 */
export function getTodaysEntries() {
  return getEntriesForDate(todayString());
}

/**
 * Return today's symptom entry count and meal entry count.
 */
export function getTodaySummary() {
  const today = getTodaysEntries();
  return {
    mealCount: today.filter((e) => e.type === "meal").length,
    symptomCount: today.filter((e) => e.type === "symptom").length,
    totalCount: today.length,
  };
}

// ─── PATTERNS & ANALYTICS ────────────────────────────────────────────────────

/**
 * Return daily BM totals for the last N days.
 * Result: array of { date, bmCount } sorted oldest to newest.
 * Days with no symptom entries get bmCount = null (not 0 — distinction matters for charts).
 */
export function getDailyBMTotals(days = 30) {
  const dateRange = lastNDays(days);
  const symptomEntries = getSymptomEntries();

  return dateRange.map((date) => {
    const dayEntries = symptomEntries.filter((e) => e.date === date);
    if (dayEntries.length === 0) {
      return { date, bmCount: null };
    }
    const total = dayEntries.reduce((sum, e) => sum + (e.bmCount || 0), 0);
    return { date, bmCount: total };
  });
}

/**
 * Return daily bloating averages for the last N days.
 * Result: array of { date, avgBloating } sorted oldest to newest.
 * Days with no entries get avgBloating = null.
 */
export function getDailyBloatingAverages(days = 30) {
  const dateRange = lastNDays(days);
  const symptomEntries = getSymptomEntries();

  return dateRange.map((date) => {
    const dayEntries = symptomEntries.filter(
      (e) => e.date === date && typeof e.bloating === "number"
    );
    if (dayEntries.length === 0) {
      return { date, avgBloating: null };
    }
    const avg = dayEntries.reduce((sum, e) => sum + e.bloating, 0) / dayEntries.length;
    return { date, avgBloating: Math.round(avg * 10) / 10 };
  });
}

/**
 * Return symptom frequency summary for the last N days.
 * Useful for the patterns screen summary cards.
 */
export function getSymptomSummary(days = 7) {
  const dateFrom = lastNDays(days)[0];
  const dateTo = todayString();
  const entries = getEntriesForRange(dateFrom, dateTo).filter(
    (e) => e.type === "symptom"
  );

  if (entries.length === 0) {
    return {
      totalBMs: 0,
      avgBMsPerDay: 0,
      urgencyDays: 0,
      crampingDays: 0,
      avgBloating: 0,
      entryCount: 0,
      daysTracked: 0,
    };
  }

  // Count days that had at least one urgency/cramping entry
  const daysWith = (field) => {
    const datesWithField = new Set(
      entries.filter((e) => e[field] === true).map((e) => e.date)
    );
    return datesWithField.size;
  };

  const totalBMs = entries.reduce((sum, e) => sum + (e.bmCount || 0), 0);
  const daysWithEntries = new Set(entries.map((e) => e.date)).size;
  const bloatingEntries = entries.filter((e) => typeof e.bloating === "number");
  const avgBloating =
    bloatingEntries.length > 0
      ? Math.round(
          (bloatingEntries.reduce((sum, e) => sum + e.bloating, 0) /
            bloatingEntries.length) *
            10
        ) / 10
      : 0;

  return {
    totalBMs,
    avgBMsPerDay:
      daysWithEntries > 0
        ? Math.round((totalBMs / daysWithEntries) * 10) / 10
        : 0,
    urgencyDays: daysWith("urgency"),
    crampingDays: daysWith("cramping"),
    avgBloating,
    entryCount: entries.length,
    daysTracked: daysWithEntries,
  };
}

/**
 * Return the most frequently logged foods over the last N days,
 * sorted by frequency descending.
 * Result: array of { name, count, foodId? }
 */
export function getMostLoggedFoods(days = 30, limit = 10) {
  const dateFrom = lastNDays(days)[0];
  const dateTo = todayString();
  const mealEntries = getEntriesForRange(dateFrom, dateTo).filter(
    (e) => e.type === "meal" && Array.isArray(e.foods)
  );

  const counts = {};
  const idMap = {};

  mealEntries.forEach((entry) => {
    entry.foods.forEach((foodName, index) => {
      const key = foodName.toLowerCase().trim();
      counts[key] = (counts[key] || 0) + 1;
      // Store the foodId if available for tier lookup
      if (entry.foodIds && entry.foodIds[index]) {
        idMap[key] = entry.foodIds[index];
      }
    });
  });

  return Object.entries(counts)
    .map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      count,
      foodId: idMap[name] || null,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Identify high-symptom days (BM count > 3 OR bloating >= 4 OR urgency present).
 * Return the foods logged on those days for potential trigger correlation.
 *
 * This is the core "pattern detection" feature — gives the patient something
 * to discuss with their GI doctor.
 *
 * Returns: array of { date, symptoms, foods }
 */
export function getHighSymptomDaysWithFoods(days = 30) {
  const dateFrom = lastNDays(days)[0];
  const dateTo = todayString();
  const allEntries = getEntriesForRange(dateFrom, dateTo);

  // Group by date
  const byDate = {};
  allEntries.forEach((e) => {
    if (!byDate[e.date]) byDate[e.date] = { meals: [], symptoms: [] };
    if (e.type === "meal") byDate[e.date].meals.push(e);
    if (e.type === "symptom") byDate[e.date].symptoms.push(e);
  });

  const highSymptomDays = [];

  Object.entries(byDate).forEach(([date, { meals, symptoms }]) => {
    if (symptoms.length === 0) return;

    const totalBMs = symptoms.reduce((sum, e) => sum + (e.bmCount || 0), 0);
    const hasUrgency = symptoms.some((e) => e.urgency === true);
    const maxBloating = Math.max(...symptoms.map((e) => e.bloating || 0));
    const hasCramping = symptoms.some((e) => e.cramping === true);

    const isHighSymptom =
      totalBMs > 3 || maxBloating >= 4 || hasUrgency;

    if (isHighSymptom) {
      const foodsLogged = meals.flatMap((m) => m.foods || []);
      highSymptomDays.push({
        date,
        symptoms: {
          totalBMs,
          hasUrgency,
          maxBloating,
          hasCramping,
        },
        foods: [...new Set(foodsLogged)], // deduplicate
      });
    }
  });

  return highSymptomDays.sort((a, b) => b.date.localeCompare(a.date));
}

// ─── CSV EXPORT ───────────────────────────────────────────────────────────────

/**
 * Export all diary entries as a CSV string.
 * Designed to be shared with a gastroenterologist.
 *
 * CSV columns:
 *   Date, Time, Type, Foods, Portion, Prep Method, BM Count,
 *   Urgency, Bloating (0-5), Cramping, Notes
 */
export function exportToCSV() {
  const entries = loadAllEntries();

  if (entries.length === 0) {
    return "No diary entries recorded yet.";
  }

  const headers = [
    "Date",
    "Time",
    "Type",
    "Foods",
    "Portion",
    "Prep method",
    "BM count",
    "Urgency",
    "Bloating (0-5)",
    "Cramping",
    "Notes",
  ];

  const rows = entries
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .map((e) => {
      const foods =
        e.type === "meal" && Array.isArray(e.foods) ? e.foods.join("; ") : "";
      const notes =
        e.type === "meal"
          ? (e.notes || "")
          : (e.symptomNotes || "");

      return [
        e.date,
        e.time,
        e.type,
        foods,
        e.portion || "",
        e.prepMethod || "",
        e.type === "symptom" ? (e.bmCount ?? "") : "",
        e.type === "symptom" ? (e.urgency ? "Yes" : "No") : "",
        e.type === "symptom" ? (e.bloating ?? "") : "",
        e.type === "symptom" ? (e.cramping ? "Yes" : "No") : "",
        notes,
      ]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",");
    });

  return [headers.join(","), ...rows].join("\n");
}

/**
 * Trigger a browser download of the CSV file.
 * Filename includes today's date for easy filing.
 */
export function downloadCSV() {
  const csv = exportToCSV();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `lc-diary-export-${todayString()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ─── DATA MANAGEMENT ─────────────────────────────────────────────────────────

/**
 * Return total entry count and storage size estimate.
 * Useful for a "manage data" settings screen.
 */
export function getStorageInfo() {
  const entries = loadAllEntries();
  const raw = localStorage.getItem(STORAGE_KEY) || "";
  const sizeKB = Math.round((raw.length * 2) / 1024); // UTF-16 = 2 bytes/char

  return {
    entryCount: entries.length,
    estimatedSizeKB: sizeKB,
    oldestDate:
      entries.length > 0
        ? entries.reduce((oldest, e) =>
            e.date < oldest ? e.date : oldest
          , entries[0].date)
        : null,
    newestDate:
      entries.length > 0
        ? entries.reduce((newest, e) =>
            e.date > newest ? e.date : newest
          , entries[0].date)
        : null,
  };
}

/**
 * Delete all diary entries. Irreversible.
 * Settings (recovery start date, name) are preserved.
 * Returns number of entries deleted.
 */
export function clearAllEntries() {
  const count = loadAllEntries().length;
  localStorage.removeItem(STORAGE_KEY);
  return count;
}

// ─── SAMPLE DATA (development only) ─────────────────────────────────────────

/**
 * Populate localStorage with realistic sample entries for UI development.
 * Call this from the browser console during development:
 *   import { seedSampleData } from './diary.js'; seedSampleData();
 *
 * DO NOT call this in production — it overwrites existing data.
 */
export function seedSampleData() {
  clearAllEntries();

  const today = todayString();
  const yesterday = lastNDays(2)[0];
  const twoDaysAgo = lastNDays(3)[0];

  const sampleEntries = [
    // Two days ago — good day
    {
      date: twoDaysAgo,
      time: "08:00",
      type: "meal",
      foods: ["Rolled oats", "Banana"],
      foodIds: ["rolled-oats", "banana-ripe"],
      portion: "M",
      prepMethod: "Oats cooked in water, banana sliced in",
      notes: "",
    },
    {
      date: twoDaysAgo,
      time: "09:30",
      type: "symptom",
      bmCount: 1,
      urgency: false,
      bloating: 1,
      cramping: false,
      symptomNotes: "Feeling okay this morning",
    },
    {
      date: twoDaysAgo,
      time: "12:30",
      type: "meal",
      foods: ["Chicken breast", "White rice", "Carrots (steamed)"],
      foodIds: ["chicken-breast", "white-rice", "carrots"],
      portion: "M",
      prepMethod: "Chicken poached, rice cooked and cooled, carrots peeled and steamed",
      notes: "",
    },
    {
      date: twoDaysAgo,
      time: "18:30",
      type: "meal",
      foods: ["Salmon", "Sweet potato", "Zucchini"],
      foodIds: ["salmon", "sweet-potato", "zucchini"],
      portion: "M",
      prepMethod: "Salmon baked with lemon, sweet potato boiled peeled, zucchini steamed",
      notes: "",
    },
    {
      date: twoDaysAgo,
      time: "19:30",
      type: "symptom",
      bmCount: 1,
      urgency: false,
      bloating: 1,
      cramping: false,
      symptomNotes: "",
    },

    // Yesterday — slightly worse (had decaf coffee)
    {
      date: yesterday,
      time: "07:45",
      type: "meal",
      foods: ["Decaf coffee", "White toast"],
      foodIds: ["decaf-coffee", "white-bread-toast"],
      portion: "S",
      prepMethod: "Toast plain, no butter",
      notes: "Had decaf coffee — forgot it was on the avoid list",
    },
    {
      date: yesterday,
      time: "08:30",
      type: "symptom",
      bmCount: 2,
      urgency: true,
      bloating: 3,
      cramping: false,
      symptomNotes: "Urgency after breakfast — likely the coffee",
      linkedMealId: null,
      hoursAfterMeal: 1,
    },
    {
      date: yesterday,
      time: "13:00",
      type: "meal",
      foods: ["Canned tuna", "White rice cakes"],
      foodIds: ["canned-tuna", "white-rice-cakes"],
      portion: "S",
      prepMethod: "Tuna drained, rice cakes plain",
      notes: "Not very hungry",
    },
    {
      date: yesterday,
      time: "18:00",
      type: "meal",
      foods: ["Eggs (scrambled)", "Plain white toast"],
      foodIds: ["eggs-whole", "white-bread-toast"],
      portion: "M",
      prepMethod: "Eggs scrambled in dry pan with olive oil drizzle",
      notes: "",
    },
    {
      date: yesterday,
      time: "19:00",
      type: "symptom",
      bmCount: 1,
      urgency: false,
      bloating: 2,
      cramping: false,
      symptomNotes: "Better by evening",
    },

    // Today — morning entry
    {
      date: today,
      time: "08:15",
      type: "meal",
      foods: ["Rolled oats", "Banana", "Ginger tea"],
      foodIds: ["rolled-oats", "banana-ripe", "ginger-tea"],
      portion: "M",
      prepMethod: "Oats in water, banana, ginger tea no sweetener",
      notes: "",
    },
    {
      date: today,
      time: "09:00",
      type: "symptom",
      bmCount: 1,
      urgency: false,
      bloating: 1,
      cramping: false,
      symptomNotes: "",
    },
  ];

  // Save settings with a recovery start date 10 days ago
  const startDate = lastNDays(11)[0];
  saveSettings({ recoveryStartDate: startDate, name: "" });

  // Add entries
  sampleEntries.forEach((e) => addEntry(e));

  console.log(
    `Sample data seeded: ${sampleEntries.length} entries, recovery start ${startDate}`
  );
}
