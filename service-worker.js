if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

// caching implementation of app's assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-app-cache-v1").then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/style/global.css",
        "/index.js",
        "/public/favicon/favicon.ico",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
