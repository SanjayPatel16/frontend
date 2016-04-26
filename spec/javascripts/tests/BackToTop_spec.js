describe.only('BackToTop', function() {
  'use strict';

  beforeEach(function(done) {
    var self = this;

    requirejs(['jquery', 'BackToTop', 'mediaQueries'],
      function ($, BackToTop, mediaQueries) {
        self.BackToTop = BackToTop;
        self.mediaQueries = mediaQueries;
        self.$html = $(window.__html__['spec/javascripts/fixtures/BackToTop.html']);
        self.$BTTLink = self.$html.find('.article-3col-main__btt-link');
        self.$container = self.$html.find('.l-article-3col-main');

        self.component = new self.BackToTop(self.$html);
        self.component.init();

        self.definedHeight = self.component.config.definedHeight;

        done();
    }, done);
  });

  afterEach(function() {
    this.$html.remove();
  });

  describe('Sets up the back-to-top link', function () {
    it('makes the back-to-top link visible', function() {
      expect(this.$BTTLink).to.not.have.class('visually-hidden');
    });
  });

  describe('calculates if the back-to-top link should be displayed', function () {
    it('moves the link into view if the current scroll position is more than or equal to the target value', function() {
      this.$container.height(4000);

      console.log('height', $(document).height());
      console.log('container height: ', this.$container.height());
      console.log('window.scrollTop: ', $(window).scrollTop());

      $(window).scrollTop(1);
      this.$BTTLink.scrollTop(2000);
      this.$BTTLink.triggerHandler('scrollTop');
      this.component._positioning();

      console.log('window.scrollTop: ', $(window).scrollTop());
      console.log('BTTLink.scrollTop: ', this.$BTTLink.scrollTop());
    });
  });
});
