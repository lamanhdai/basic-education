;(function($, win) {
    'use strict';

    var TopPage = $.TopPage = (function() {
        var
            $win = null,

            winHeight = 0,
            winWidth = 0,
            widthFlg = false,
            isTablet = false,


            $el = null,
            $tabNavigationLinks = null,
            $tabContentContainers = null,
            indexActive = 0,
            initCalled = false;

        function init() {
            $win = $(window);
            winHeight = $win.height();
            winWidth = $win.width();
            widthFlg = ($win.winWidth > 767) ? false : true;
            isTablet = (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent.indexOf('Android') != -1) ? true : false;
            $win.on('resize orientationchange', function(){
              winWidth = $win.width();
              widthFlg = (winWidth > 767) ? false: true;
              navCloseHandler();
            });


            $el = $("#tabs");
            $tabNavigationLinks = $(".nav-tabs .c-tabs-nav__link");
            $tabContentContainers = $('.tab-pane');
            
            if (!initCalled) {
                initCalled = true;
                $el.removeClass('no js');
                for (var i = 0; i < $tabNavigationLinks.length; i++) {
                    var link = $tabNavigationLinks[i];
                    handleClick(link, i);
                }
            }
        }


        function handleClick (link, index){
          link.addEventListener('click', function(e) {
                e.preventDefault();
                goToTab(index);
            });
        }

        function goToTab (index){
          if (index !== indexActive && index >= 0 && index <= $tabNavigationLinks.length) {
              $tabNavigationLinks[indexActive].classList.remove('is-active');
              $tabNavigationLinks[index].classList.add('is-active');
              $tabContentContainers[indexActive].classList.remove('is-active');
              $tabContentContainers[index].classList.add('is-active');
              indexActive = index;
          } 
        }

        /**
         * navCloseHandler
         * Reset Open/Close TopPage
         */
        function navCloseHandler() {
            if (!widthFlg) {

            }
        }


        return {
            init: init
        };

    })();

    $(TopPage.init);

})(jQuery, window);
