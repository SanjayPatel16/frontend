// Interact with the registered Service Worker via its API

this.addEventListener('fetch', function(event) {
	// console.log(event.request);
  event.respondWith(
    // console.log(event.request.url)

    /*
    // return some HTML
    new Response(
      '<h1 style="font-weight: normal;">This is <b>not</b> the <i>MAS</i> site!</h1>', {
      headers: {'Content-Type': 'text/html'}
    })
    */

    // return an asset
    // fetch('/assets/campaign/cut-the-costs-of-a-merry-christmas.jpg')

    // test for network
    fetch(event.request).then(function(response) {
      console.log(response);

      if (response.status == 404) {
        return new Response(
          '<h1 style="font-weight: normal;">The <i>MAS</i> site is <b>not</b> available!</h1>', {
          headers: {'Content-Type': 'text/html'}
        })
      }
      return response;
    })
  );
});
