// Interact with the registered Service Worker via its API

// caching
this.addEventListener('install', function(event) {
  console.log(event);

  event.waitUntil()
});

/*
this.addEventListener('fetch', function(event) {
	// console.log(event.request);
  event.respondWith(
    // test for network and send appropriate response
    fetch(event.request).then(function(response) {
      console.log(response);

      if (response.status == 404) {
        return new Response(
          '<h1 style="font-weight: normal;">The <i>MAS</i> site is <b>not</b> available at this URL (aka a 404 error)!</h1>', {
          headers: {'Content-Type': 'text/html'}
        })
      }
      return response;
    }).catch(function() {
      return new Response(
        '<h1 style="font-weight: normal;">The <i>MAS</i> site has <b>failed</b> to load \'cos of no network!</h1>', {
        headers: {'Content-Type': 'text/html'}
      });
    })
  );
});
*/
