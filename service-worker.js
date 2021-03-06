var dataCacheName = 'template-pwa';
var cacheName = 'template-pwa';
var filesToCache = [
  '/',
 "public/fonts",
 "public/fonts/roboto",
 "public/fonts/roboto/Roboto-Bold.woff",
 "public/fonts/roboto/Roboto-Bold.woff2",
 "public/fonts/roboto/Roboto-Light.woff",
 "public/fonts/roboto/Roboto-Light.woff2",
 "public/fonts/roboto/Roboto-Medium.woff",
 "public/fonts/roboto/Roboto-Medium.woff2",
 "public/fonts/roboto/Roboto-Regular.woff",
 "public/fonts/roboto/Roboto-Regular.woff2",
 "public/fonts/roboto/Roboto-Thin.woff",
 "public/fonts/roboto/Roboto-Thin.woff2",
 "public/images",
 "public/images/icons",
 "public/images/icons/icon-128x128.png",
 "public/images/icons/icon-144x144.png",
 "public/images/icons/icon-152x152.png",
 "public/images/icons/icon-192x192.png",
 "public/images/icons/icon-256x256.png",
 "public/index.html",
 "public/manifest.json",
 "public/scripts",
 "public/scripts/app.js",
 "public/scripts/jquery-3.3.1.js",
 "public/scripts/materialize.js",
 "public/service-worker.js",
 "public/styles",
 "public/styles/materialize.css",
 "public/styles/style.css"
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
