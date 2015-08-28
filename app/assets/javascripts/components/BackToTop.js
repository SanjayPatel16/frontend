define(['jquery', 'DoughBaseComponent', 'eventsWithPromises', 'mediaQueries'], function($, DoughBaseComponent, eventsWithPromises, mediaQueries) {
  'use strict';

  var BackToTop,
      defaultConfig = {
        definedHeight: 1704,
        atSmallViewport: false,
        active: false,
        linkHeight: 0
      };

  BackToTop = function($el, config) {
    BackToTop.baseConstructor.call(this, $el, config, defaultConfig);

    this.$reLink = this.$el.find('.article-3col-main__reLink');
  };

  /**
  * Inherit from base module, for shared methods and interface
  */
  DoughBaseComponent.extend(BackToTop);

  BackToTop.componentName = 'BackToTop';

  BackToTop.prototype._defer = function() {
    this.$reLink.removeClass('visually-hidden');
    this.config.linkHeight = this.$reLink.outerHeight();

    var self = this;
    var active = false;
    var atSmallViewport = false;

    if (mediaQueries.atSmallViewport()) {
      this.config.atSmallViewport = true;
    }

    $(window).resize(function() {self._resize();});
    $(window).scroll(function() {self._scroll();})

    this.$reLink
      .css('bottom', 0 - this.config.linkHeight)
      .unbind('click')
      .click(function() {
        $('html, body').animate({
          scrollTop: $($('body')).offset().top
        }, 800);
      });
  };

  BackToTop.prototype._getActive = function() {
    if ($(window).scrollTop() >= this.config.definedHeight) {
      return true;
    } else {
      return false;
    }
  }

  BackToTop.prototype._resize = function() {
    if (mediaQueries.atSmallViewport()) {
      this.config.atSmallViewport = true;
      this._positioning();
    } else {
      this.config.atSmallViewport = false;
    }
  };

  BackToTop.prototype._scroll = function() {
    if (this.config.atSmallViewport) {
      this._positioning();
    }
  };

  BackToTop.prototype._positioning = function() {
    if (this._getActive()) {
      if (!this.config.active) {
        this.config.active = true;

        if (this.$reLink.css('bottom') != "0px") {
          this.$reLink.stop().animate({bottom:'0px'}, 400);
        }
      }

      var currentBottom = $(window).scrollTop() + $(window).innerHeight();
      var isCookieVisible = $('.cookie-message').length > 0 && $('.cookie-message').css('display') != 'none';
      var whereIsFooter = $('body').outerHeight() - $('.l-footer').outerHeight();
      var howMuchBottom = 0;

      if (currentBottom > whereIsFooter) {
        howMuchBottom = $('.l-footer').outerHeight() - ($('body').outerHeight() - currentBottom);
      }

      this.$reLink.css('bottom', howMuchBottom);
    } else {
      if (this.config.active) {
        this.config.active = false;

        if (this.$reLink.css('bottom') != (0 - this.config.linkHeight) + 'px') {
          this.$reLink.stop().animate({bottom: (0 - this.config.linkHeight) + 'px'}, 400);
        }
      }
    }
  }

  /**
  * @param {Promise} initialised
  */
  BackToTop.prototype.init = function(initialised) {
    this._defer();
    this._initialisedSuccess(initialised);
  };

  return BackToTop;
});
