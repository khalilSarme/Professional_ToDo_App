// تحديد اسم ورقم إصدار الذاكرة المؤقتة
const CACHE_NAME = 'task-manager-cache-v1';

// قائمة بالملفات التي نريد تخزينها لتعمل بدون إنترنت
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/*'
];

// 1. حدث التثبيت (Install Event) - حفظ الملفات في الذاكرة المؤقتة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح الذاكرة المؤقتة');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. حدث الجلب (Fetch Event) - تقديم الملفات من الذاكرة المؤقتة عند انقطاع الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وُجد الملف في الذاكرة المؤقتة، قم بإرجاعه
        if (response) {
          return response;
        }
        // وإلا، قم بجلبه من الشبكة كالمعتاد
        return fetch(event.request);
      })
  );
});

// 3. حدث التفعيل (Activate Event) - تنظيف الذاكرة المؤقتة القديمة عند تحديث التطبيق
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});