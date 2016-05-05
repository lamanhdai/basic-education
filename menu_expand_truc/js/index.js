;(function($, win) {
    'use strict';

    var Menu = $.Menu = (function() {
        var
            $win = null,
            $menu = null,
            $openMenuSP = null,
            $pushMenu = null,
            winWidth = 0,
            widthFlg = false,
            isTablet = false;


        function init() {
            $win = $(window);
            winWidth = $win.width();
            widthFlg = ($win.winWidth > 767) ? false : true;
            isTablet = (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent.indexOf('Android') != -1) ? true : false;

            $win.on('resize orientationchange', function(){
              winWidth = $win.width();
              widthFlg = (winWidth > 767) ? false: true;
              navCloseHandler();
            });

            $pushMenu = $('.menu_global .nav');
            $openMenuSP = $('.menu_sp .icon-bars');
            $menu = $('.menu_global ul li');
            hoverMegamenu();
            pushMenu();

        }

        function hoverMegamenu() {
            event.preventDefault();
            $menu.hover(function() {
                if (!widthFlg && isTablet) {
                    return false;
                } else {
                    $(this).toggleClass('active');
                    $(this).children('ul').stop().slideToggle(300);
                }
            });
        }



        function pushMenu() {
            $openMenuSP.click(function(event) {
                event.preventDefault();
                if (widthFlg) {
                    var heightNav = $win.height();
                    if ($pushMenu.hasClass('open')) {
                        $pushMenu.stop().animate({ 'right': '-100%', width: 0 }, "300");
                        $pushMenu.removeClass('open');
                    } else {
                        $pushMenu.stop().animate({ 'right': 0, width: '100%' }, "300");
                        $pushMenu.addClass('open');
                        $pushMenu.css('height', heightNav - 90);
                    }
                } else {
                    return false;
                }
            });
        }

        /**
         * navCloseHandler
         * Reset Open/Close menu
         */
        function navCloseHandler() {
            if (!widthFlg) {
                $pushMenu.removeClass('open');
                $pushMenu.attr('style', '').removeAttr();
                $menu.removeAttr('style');
            }
        }


        return {
            init: init
        };

    })();

    $(Menu.init);

})(jQuery, window);
