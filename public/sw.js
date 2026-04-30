const CACHE_NAME = "roastmycv-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/offlineimage.png"
];

// Install: pre-cache all static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // activate immediately without waiting
});

// Fetch: serve from cache first, fall back to network, then offline page
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests and cross-origin requests (e.g. Gemini API calls)
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request)
          .then((response) => {
            // Cache newly fetched assets dynamically
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return response;
          })
          .catch(() => caches.match("/"))  // offline fallback → serve root
      );
    })
  );
});

// Activate: remove old caches from previous versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim(); // take control of all open tabs immediately
});
