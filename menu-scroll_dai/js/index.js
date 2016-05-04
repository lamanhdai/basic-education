(function($) {
  'use strict';
  var MenuScrool = $.menuscroll = (function(){
    var
      $global_navi = null,
      $global_navi_item = null,
      $header = null,
      $pageTop = null,
      $win = $(window),
      $header = null,
      $top_header = null,
      $navigation = null,
      $products = null,
      $item= null,
      hashvalue = null,

      winScroll = 0,
      itemLen = 0,
      rows = 0;

    function init() {

      $global_navi = $('.global_navi');
      $global_navi_item = $global_navi.find('a');
      $header = $('#header');

      $pageTop = $('.page_top a');

      $header = $('#header');
      $top_header = $header.find('.top_header');
      $navigation = $header.find('.navigation');

      smoothScroll();
      menuScroll();
      $(window).on('scroll load', function(){
        winScroll = $(window).scrollTop();
        fixGlobalNavigation();
        setActiveNavigation();
      });
    }

    /**
     * smooth scroll
     * click button scroll to top
    */
    function smoothScroll() {
      $pageTop.off().on('click', function(e){
        e.preventDefault();
        $('html, body').scrollTop(0);
      });
      $win.on({
        'scroll': function(){
          if ($win.scrollTop() > 50) {
            $pageTop.show();
          } else {
            $pageTop.hide();
          }
        }
      });
      if ($win.scrollTop() < 50) {
        $pageTop.css({'display': 'none'});
      }
    }

    /**
     * fix global navigation
     *
    */
    function fixGlobalNavigation() {
      if(winScroll >= $header.height()) {
        $header.addClass('fixed');
      } else {
        $header.removeClass('fixed');
      }
    }

    /**
     * navi scroll
     * click on menu to scroll
    */
    function menuScroll() {
      var height = $navigation.outerHeight();
      var top = 0;
      var target = null;
      $global_navi_item.off().on({
        'click': function(e) {
          $header.addClass('fixed');
          target = $(this).attr('href');
          top = $(target).offset().top + 1 - height;
          $('html, body').scrollTop(top);
          return false;
        },
      });
    }

    /**
     * set Active Navigation
     *
    */
    function setActiveNavigation () {
      var target = null;
      var top = 0;
      var heightContent = 0;
      var scrollTop = $(window).scrollTop();
      $global_navi_item.each(function(){
        target = $(this).attr('href');
        top = $(target).offset().top - $navigation.outerHeight();
        heightContent = $(target).outerHeight() + top;
        if(scrollTop >= top && scrollTop < heightContent) {
          $(this).addClass('active');
        }
        else {
          $(this).removeClass('active');
        }
      });
    }
    return {
      init : init
    }
  })();
  $(MenuScrool.init);
})(jQuery, window);