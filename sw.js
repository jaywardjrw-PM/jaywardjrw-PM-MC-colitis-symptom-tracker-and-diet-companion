/**
 * sw.js
 * Lymphocytic Colitis Companion — Service Worker
 *
 * Strategy: Cache-first for all app shell assets (HTML, CSS, JS, manifest).
 * On install, pre-cache everything. On fetch, serve from cache first,
 * fall back to network. On activate, delete old caches.
 *
 * This means the app works fully offline after the first load.
 * Diary data lives in localStorage — not affected by the service worker.
 */

const CACHE_NAME = "mc-compass-v1";

// All files that make up the app shell — update this list when adding screens
const APP_SHELL = [
  "./",
  "index.html",
  "food-guide.html",
  "diary.html",
  "patterns.html",
  "style.css",
  "data.js",
  "diary.js",
  "manifest.json",
];

// ─── INSTALL ──────────────────────────────────────────────────────────────────
// Pre-cache the entire app shell on first install.
// skipWaiting() activates immediately rather than waiting for old tabs to close.

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE ─────────────────────────────────────────────────────────────────
// Delete any caches from previous versions of the app.
// claim() takes control of open tabs immediately.

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ─── FETCH ────────────────────────────────────────────────────────────────────
// Cache-first: serve from cache if available, otherwise fetch from network
// and cache the response for next time.
// Non-GET requests (POST etc.) bypass the cache entirely.

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // Only handle same-origin requests — don't intercept CDN calls (Chart.js etc.)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Only cache valid responses
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          // Clone — one copy for cache, one to return
          const toCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, toCache);
          });
          return response;
        })
        .catch(() => {
          // Network failed and not in cache — return a simple offline message
          // for HTML requests only (navigations)
          if (event.request.headers.get("accept")?.includes("text/html")) {
            return new Response(
              "<h1>You are offline</h1><p>Open the app while connected to the internet once, and it will work offline after that.</p>",
              { headers: { "Content-Type": "text/html" } }
            );
          }
        });
    })
  );
});
