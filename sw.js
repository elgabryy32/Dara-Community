const CACHE_NAME = 'zagazig-dara-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './image_093e97.jpg',
  './image_094140.jpg',
  './image_09415e.jpg',
  './image_09417c.jpg',
  './image_094184.jpg',
  './image_094507.jpg',
  './image_094541.jpg'
];

// تثبيت السيرفس وركر وحفظ الملفات
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// استدعاء الملفات من الكاش عند عدم وجود إنترنت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});