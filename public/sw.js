// Interact with the registered Service Worker via its API

/* cache assets
this.addEventListener('install', function(event) {
  var urlsToCache = [
        '/',
        '/assets/application.js',
        '/assets/enhanced_responsive.css'
      ];

  event.waitUntil(
    // open a cache named 'mas-static-v4'
    caches.open('mas-static-v5').then(function(cache) {
      // add the urls in urlsToCache to opened cache
      return cache.addAll(urlsToCache);
    })
  );
});
*/

// get cached assets
this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
