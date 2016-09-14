// Interact with the registered Service Worker via its API

this.addEventListener('fetch', function(event) {
	// console.log(event.request);
  event.respondWith(
    new Response(
      '<h1 style="font-weight: normal;">This is <b>not</b> the <i>MAS</i> site!</h1>', {
      headers: {'Content-Type': 'text/html'}
    })
  );
});
