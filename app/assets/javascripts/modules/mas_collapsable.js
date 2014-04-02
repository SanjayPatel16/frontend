
define([MAS.bootstrap.I18n_locale, 'log', 'jquery'], function (Text, Global, $) {
  'use strict';

  var defaults = {
    // Setup
    triggerEl: '.collapsible',
    targetEl: '.collapsible-section',
    targetType: 'class', // class / href / data-attr
    activeClass: 'is-on',
    inactiveClass: 'is-off',
    closeOffFocus: false,
    parentWrapper: false,
    accordion: false,
    showOnlyFirst: false,

    // Display options
    showText: true,
    showIcon: false,
    headingIcon: '<span class="icon icon--toggle"></span>',
    headingText: '<span class="visually-hidden">{{txt}}</span>',
    useButton: false,

    // Localised text strings
    textString: {
      showThisSection: Text.show || 'Show',
      hideThisSection: Text.hide || 'Hide'
    },

    // Callbacks
    onSelect: false,
    onFocusout: false
  };

  var _swapClass = function(el, from, to){
    el.removeClass(from).addClass(to);
  };

  var _testHidden = function(target, opts){
    if( target.hasClass(opts.inactiveClass) ) return true;
    if( target.hasClass(opts.activeClass) ) return false;
    return ( target.is(':hidden') );
  };

  var _getTarget = function($el, opts){
    switch(opts.targetType){
    case 'class':
      return $el.next(opts.targetEl);
    case 'href':
      var href = $el.attr('href'),
        $t = $(href);
      return ($t.length)? $t : false;
    default:
      return false;
    }
  };

  var Collapsible = function(opts){
    this.o = $.extend({}, defaults, opts);
    this.sections = [];
    this.selected = false;

    var _this = this,
        triggers = $(this.o.triggerEl),
        l = triggers.length,
        i = 0;

    if(l === 0){
      return Global.warn('mas_collapsible => no trigger elements in page: ' + this.o.triggerEl);
    }

    for(i; i<l; i++){
      this._setupEach.call(this, i, triggers[i]);
    }

    if(this.o.closeOffFocus){
      this.$parent = $(this.o.parentWrapper);

      if(!this.o.parentWrapper || !this.$parent.length) {
        Global.warn('options.parentWrapper should be set & valid for closeOffFocus to work properly');
        return;
      }

      this.$parent.on('focusout', function(){
        setTimeout(function(){
          if( _this.$parent.find(document.activeElement).length === 0 && _this.selected !== false){
            // Callback
            if(typeof _this.o.onFocusout === 'function') _this.o.onFocusout(_this);
            // Action
            _this.hide(_this.selected);
          }
        },300);
      });
    }
  };

  Collapsible.prototype._modifyButtonHTML = function(i){
    var trigger = this.sections[i].trigger,
        txt = (this.o.showText)? this.o.headingText.replace('{{txt}}', this.o.textString.showThisSection) : '',
        icon = (this.o.showIcon)? this.o.headingIcon : '';

    if(this.o.useButton){
      var buttonTitle = trigger.text();

      if(trigger[0].nodeName === 'A'){
        // Anchor => replace elemnt
        var newEl = $('<a class-"' + trigger[0].className + '" id="' + trigger[0] + '">' + icon + txt + buttonTitle + '</a>');
        // add new
        trigger.after(newEl);
        // remove old
        trigger.remove();
        trigger = newEl;
      }else{
        // Anything else => insert button inside
        trigger.html('<button class="button--unstyled">' + icon + txt + buttonTitle  + '</button>');
      }
    }else{
      // Use aria-role
      trigger.attr('aria-role','button');
      trigger.attr('tabindex', '0');
      trigger.prepend(icon);
      trigger.prepend(txt);
    }

    if(this.o.showIcon) this.sections[i].icon = trigger.find('.icon');
    if(this.o.showText) this.sections[i].txt = trigger.find('.visually-hidden');
  };

  Collapsible.prototype._setupEach = function(i,el){
    var $el = $(el),
      _this = this,
      _target = _getTarget($el, _this.o);

    this.sections[i] = {
      index: i,
      trigger: $el,
      target: _target,
      hidden: _testHidden(_target, _this.o)
    };

    // Dont modify or bind events if no target element
    if(!this.sections[i].target.length) return;

    // Set show / hide states based on options
    if(this.o.showOnlyFirst){
      this.sections[i].hidden = (i === 0)? false : true;
    }

    if(this.o.accordion){
      if(this.selected === false && !this.sections[i].hidden){
      }else{
        this.sections[i].hidden = true;
      }
    }

    // Update Button HTML to make accessible
    this._modifyButtonHTML(i);

    // Set initial state
    this.toggle(!this.sections[i].hidden,i);

    // Bind events
    this.sections[i].trigger.on('click', i, function(e){
      e.preventDefault();
      // Check for callbacks
      if(typeof _this.o.onSelect === 'function') _this.o.onSelect(_this.sections[i]);
      _this.toggle(_this.sections[i].hidden, i);
    });

    // Accessibility support for spacebar
    this.sections[i].trigger.on('keypress', function(e){
      if(e.which === 32 && _this.sections[i].trigger[0].nodeName !== 'BUTTON' && !_this.o.useButton) {
        e.preventDefault();
        _this.sections[i].trigger.trigger('click');
      }
    });
    return this;
  };

  Collapsible.prototype.toggle = function(show,i){
    var method = (show)? 'show' : 'hide';
    this[method](i);
    return this;
  };

  Collapsible.prototype.show = function(i){
    var item = this.sections[i];
    _swapClass(item.trigger, this.o.inactiveClass, this.o.activeClass);
    _swapClass(item.target, this.o.inactiveClass, this.o.activeClass);
    item.target.attr('aria-hidden', 'false');
    item.hidden = false;
    if(this.o.showText) item.txt.text(this.o.textString.hideThisSection);
    if(this.o.accordion && (this.selected !== false && this.selected !== i)) this.hide(this.selected);
    this.selected = i;
    return this;
  };

  Collapsible.prototype.hide = function(i){
    var item = this.sections[i];
    _swapClass(item.trigger, this.o.activeClass, this.o.inactiveClass);
    _swapClass(item.target, this.o.activeClass, this.o.inactiveClass);
    item.target.attr('aria-hidden', 'true');
    item.hidden = true;
    if(this.o.showText) item.txt.text(this.o.textString.showThisSection);
    return this;
  };

  return Collapsible;
});
