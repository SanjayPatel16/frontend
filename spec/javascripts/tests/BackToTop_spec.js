describe.only('BackToTop', function() {
  'use strict';

  beforeEach(function (done) {
    var self = this;

    requirejs(['jquery', 'BackToTop', 'eventsWithPromises', 'mediaQueries'],
      function ($, BackToTop, eventsWithPromises, mediaQueries) {
        self.$html = $(window.__html__['spec/javascripts/fixtures/BackToTop.html']);
        self.BackToTop = BackToTop;
        done();
    }, done);
  });

  afterEach(function() {
    this.$html.remove();
  });

  it('disables the submit button on event firing', function() {
    console.log('disables the submit button on event firing!');
  });
});
