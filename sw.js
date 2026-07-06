// ===== Service Worker - عبيد للصيانة =====
// هذا الملف مسؤول عن استقبال إشعارات Push الحقيقية وعرضها على الشاشة
// حتى لو كان المتصفح/التطبيق مغلقاً تماماً (طالما الجهاز متصل بالإنترنت ويعمل).

const SW_VERSION = 'obied-sw-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// ===== استقبال إشعار Push حقيقي من الخادم (Supabase Edge Function) =====
self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    payload = { title: 'عبيد للصيانة', body: event.data ? event.data.text() : '' };
  }

  const title = payload.title || 'عبيد للصيانة';
  const options = {
    body: payload.body || '',
    icon: payload.icon || 'https://cdn-icons-png.flaticon.com/512/2913/2913461.png',
    badge: payload.icon || 'https://cdn-icons-png.flaticon.com/512/2913/2913461.png',
    // اهتزاز للأجهزة التي تدعمه (أندرويد) - صوت الإشعار الافتراضي للنظام يصدر تلقائياً
    vibrate: [200, 100, 200, 100, 200],
    tag: payload.tag || 'obied-notif',
    renotify: true,
    requireInteraction: false,
    data: { url: payload.url || '/' }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ===== عند الضغط على الإشعار: افتح الموقع أو ركّز على التبويب المفتوح =====
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
