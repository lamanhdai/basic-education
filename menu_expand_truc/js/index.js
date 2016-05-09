;
(function($, win) {
    'use strict';

    var Menu = $.Menu = (function(e) {
        var
            $win = null,
            $navItem = null,
            $menuGlobal = null,
            $navbarDropdown = null,

            $btnMenu = null,
            $navigation = null,
            winWidth = 0,
            widthFlg = false,
            isTablet = false;


        function init() {
            $win = $(window);
            winWidth = $win.width();
            widthFlg = ($win.width() > 767) ? false : true;
            isTablet = (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent.indexOf('Android') != -1) ? true : false;

            $win.on('resize orientationchange', function() {
                winWidth = $win.width();
                widthFlg = (winWidth > 767) ? false : true;
                navCloseHandler();

                // $menuGlobal.find("a").on({
                //     "click": function(e) {
                //         event.preventDefault();
                //         $btnMenu.trigger("click");
                //         location.href = $(this).attr("href");
                //     }
                // });
                if (!widthFlg) {
                    rollover();
                }
            });

            $navigation = $('.menu_global .nav');
            $btnMenu = $('.menu_sp .icon-bars');
            $navItem = $navigation.find('> li.dropdown');
            $menuGlobal = $('.menu_global');
            $navbarDropdown = $menuGlobal.find('p.navbar');

            if (!widthFlg) {
                rollover();
            }

            hoverMegamenu();
            pushMenu();
            rollover();
            navbarDropdown();
        }
        /**
         * hoverNav
         * Hover to open/hide Header Nav on PC
         */
        function hoverMegamenu() {
            $navItem.off().on({
                'mouseenter': function(e) {
                    if (!widthFlg && !isTablet) {
                        $(this).find('a').addClass('active');
                        $(this).children('ul').stop().slideDown(300);
                    }
                },

                'mouseleave': function(e) {
                    if (!widthFlg && !isTablet) {
                        $(this).find('a').removeClass('active');
                        $(this).children('ul').stop().hide('fast');
                    }
                },

                'click': function(e) {
                    if (!widthFlg && isTablet) {
                        $(this).find('a').addClass('active');
                        $(this).children('ul').stop().hide('fast');
                    }
                }
            });
        }

        /**
         * navbarDropdown
         * Click to open/hide dropdown-menu on SP
         */
        function navbarDropdown() {
            $navbarDropdown.off().each(function() {
                var $tab = $(this);
                $tab.off().on('click', function() {
                    if (widthFlg) {
                        $(this).toggleClass('expand');
                        if ($(this).hasClass('expand')) {
                            $(this).next().stop().slideDown('300');
                        } else {
                            $(this).next().stop().slideUp('fast');
                        }
                    }
                });
            });
        }
        /**
         * pushMenu
         * Push Menu right to left
         */
        function pushMenu() {
            $btnMenu.click(function(e) {
                var $btn = $(this);
                var heightNav = $win.height();
                $btn.toggleClass('show');
                if ($btn.hasClass('show')) {
                    $navigation.stop().animate({ 'right': 0, width: '100%', easing: "easeOutBounce" });
                    $navigation.addClass('open');
                    $navigation.css('height', heightNav);
                } else {
                    $navigation.stop().animate({ 'right': '-100%', width: 0, easing: "easeOutBounce" });
                    $navigation.removeClass('open');
                }
            });
        }

        /**
         * navCloseHandler
         * Reset Open/Close menu
         */
        function navCloseHandler() {
            if (!widthFlg) {
                $navigation.removeClass('open');
                $navigation.attr('style', '').removeAttr();
                $navItem.attr('style', '').removeAttr();
            }
        }


        function rollover() {
            $('a').on({
                'mouseenter': function() {
                    if ($(this).find("img[src*='_off.']").size() > 0) $(this).find("img:not(.current)").attr("src", $(this).find("img").attr("src").replace("_off.", "_on."));
                    else if ($(this).find("img:not(.current)").size() > 0) $(this).find("img").css("opacity", "0.5");
                },
                'mouseleave': function() {
                    if ($(this).find("img[src*='_on.']").size() > 0) $(this).find("img:not(.current)").attr("src", $(this).find("img").attr("src").replace("_on.", "_off."));
                    else if ($(this).find("img:not(.current)").size() > 0) $(this).find("img").css("opacity", "1");
                }
            });
        }
        return {
            init: init
        };

    })();

    $(Menu.init);

})(jQuery, window);
