const CACHE_NAME = 'companion-auth-cache-v4';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];
const NETWORK_TIMEOUT_MS = 6000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function timeoutFetch(request, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  // bypass the browser's own HTTP cache too, not just this SW's cache --
  // GitHub Pages can set caching headers that would otherwise mask fresh
  // deploys the same way the SW cache did.
  return fetch(request, { signal: controller.signal, cache: 'no-store' })
    .finally(() => clearTimeout(timer));
}

// Same-origin only, network-first with a bounded timeout. A brief network
// hiccup (e.g. radios reconnecting after the phone resumes from background)
// should NOT be treated the same as genuinely offline -- but if the network
// truly doesn't respond within NETWORK_TIMEOUT_MS, or fails outright, fall
// back to the cached shell so the app still works offline.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== 'GET') return;

  event.respondWith(
    timeoutFetch(event.request, NETWORK_TIMEOUT_MS)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
