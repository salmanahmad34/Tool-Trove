const CACHE_NAME = 'tooltrove-cache-v2';
const basePath = self.location.pathname.substring(0, self.location.pathname.lastIndexOf('/') + 1);
const PRECACHE_ASSETS = [
  basePath,
  basePath + 'index.html',
  basePath + 'favicon.svg',
  basePath + 'manifest.json',
  basePath + 'robots.txt',
  basePath + 'sitemap.xml'
];

// --- 1. INSTALL EVENT: Pre-cache stable app shell resources ---
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching Core Shell Assets...');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// --- 2. ACTIVATE EVENT: Clean up older cache namespaces ---
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Purging Legacy Cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// --- 3. FETCH EVENT: Stale-While-Revalidate Caching Strategy ---
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and ignore chrome-extension / third-party protocols
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve instantly from cache, while updating in background (Stale-While-Revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          })
          .catch(() => {
            // Silently ignore background refresh fails if offline
          });
        return cachedResponse;
      }

      // If not in cache, fetch from network and save to cache dynamically
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If network fails completely and request is for page routing (HTML), fall back to core offline index.html
          if (event.request.mode === 'navigate') {
            return caches.match(basePath + 'index.html');
          }
        });
    })
  );
});
