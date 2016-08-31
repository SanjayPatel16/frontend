// Interact with the registered Service Worker via its API

this.addEventListener('fetch', function(event) {
	console.log(event.request);
});

