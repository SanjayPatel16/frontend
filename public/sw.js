// Interact with the registered Service Worker via its API

this.addEventListener('fetch', function(event) {
	// console.log(event.request);
  event.respondWith(
    new Response(
      '<h1>helloooo <b>the</b> <i>world!</i></h1>', {
      headers: {'Content-Type': 'text/html'}
    })
  );
});
