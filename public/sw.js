// Interact with the registered Service Worker via its API

// caching
this.addEventListener('install', function(event) {
  var urlsToCache = [
        '/',
        '/assets/application.js',
        '/assets/enhanced_responsive.css'
      ];

  event.waitUntil(
    // open a cache named 'mas-static-v4'
    caches.open('mas-static-v4').then(function(cache) {
      // add the urls in urlsToCache to opened cache
      return cache.addAll(urlsToCache);
    })
  );
});
