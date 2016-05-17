;(function($, win) {
    'use strict';

    var Menu = $.Menu = (function(e) {
        var
            $win = null,

            winWidth = 0,
            widthFlg = false,
            isTablet = false,

            $btnClose = null,
            $btnMenu = null,
            $navItem = null,
            $navigation = null,
            $dropdownListItem = null,
            $dropdownItem = null;

        function init() {
            $win = $(window);
            winWidth = $win.width();
            widthFlg = ($win.width() > 767) ? false : true;
            isTablet = (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent.indexOf('Android') != -1) ? true : false;

            $win.on('resize orientationchange', function() {
                winWidth = $win.width();
                widthFlg = (winWidth > 767) ? false : true;
                navCloseHandler();
                // $navigation.find("a").on({
                //     "click": function(e) {
                //         event.preventDefault();
                //         $btnMenu.trigger("click");
                //         location.href = $(this).attr("href");
                //     }
                // });

            });

            $btnClose = $(".menu_sp .btn-close");
            $btnMenu = $(".btn-menu .icons-menu");
            $navigation = $(".menu_sp");
            $navItem = $navigation.find('li');
            $dropdownListItem = $navigation.find('li.dropdown_list');
            $dropdownItem = $navigation.find('li.dropdown_list > a');

            menuPC();
            menuSP();
            dropdownList();
            closeMenu();
        }


        /**
         * Menu for PC
         */
        function menuPC() {
            $dropdownListItem.on({
                'mouseenter': function(e) {
                    if (!widthFlg && !isTablet) {
                        $(this).find('> ul').stop().slideDown(300);
                    }
                },
                'mouseleave': function(e) {
                    if (!widthFlg && !isTablet) {
                        $(this).find('> ul').stop().slideUp(300);
                    }

                }
            });

        }

        /**
         * Menu for SP
         */
        function menuSP() {
            $btnMenu.css('display', 'block');
            var heightMenu = $win.height();
            $btnMenu.click(function(e) {
                if ($navigation.hasClass('show')) {
                    $navigation.stop().animate({ 'margin-left': "100%", easing: "easeInBounce" }, 300);
                    $navigation.removeClass('show');
                    $("body").css('overflow-x', 'auto');
                    // $("body").removeClass("push_right").stop().animate({ 'right': "0", easing: "easeInBounce" }, 300);
                    $(this).text("menu");
                } else {
                    $navigation.stop().animate({ 'margin-left': "-15px", easing: "easeOutBounce" }, 300);
                    $navigation.addClass('show');
                    $navigation.css('height', heightMenu);
                    $("body").css('overflow-x', 'hidden');
                    // $("body").addClass("push_right").stop().animate({ 'right': "100%", easing: "easeOutBounce" }, 300);
                    $(this).text("close");
                }
            });
            $btnClose.click(function(e) {
                $navigation.stop().animate({ 'margin-left': "100%", easing: "easeInBounce" }, 300);
                $navigation.removeClass('show');
                $btnMenu.text("menu");
            });
        }

        function closeMenu() {

        }

        /**
         * navbar$Dropdown
         * Click to open/hide $dropdown-menu on SP
         */

        function dropdownList() {
            if (widthFlg) {
                $navItem.not(".dropdown_list").find("a").append('<i class="material-icons">remove</i>');
                $dropdownItem.append('<i class="material-icons">keyboard_arrow_right</i>');
                $dropdownItem.click(function() {
                    $(this).toggleClass('active');
                    if ($(this).hasClass('active')) {
                        $(this).next("ul").stop().slideDown(400);
                        $(this).find('.material-icons').text('keyboard_arrow_down');

                    } else {
                        $(this).next("ul").stop().slideUp(400);
                        $(this).find('.material-icons').text('keyboard_arrow_right');

                    }
                });
            }
        }

        /**
         * navCloseHandler
         * Reset Open/Close menu
         */
        function navCloseHandler() {
            if (!widthFlg) {
                $navigation.removeClass('show');
                $navigation.attr('style', '');
                $btnMenu.text("menu");
                $dropdownItem.removeClass('active');
                $dropdownItem.attr('style', '');
                $dropdownListItem.find("ul").removeAttr('style');
                $("body").removeClass("push_right");
                $("body").removeAttr('style');
                $btnMenu.css('display', 'none');
                $navItem.not(".dropdown_list").find("a > i.material-icons").text(" ");
                $dropdownItem.find('i.material-icons').text(" ");
            } else {
                $btnMenu.css('display', 'block');
                $navItem.not(".dropdown_list").find("a > i.material-icons").text("remove");
                $dropdownItem.find('i.material-icons').text("keyboard_arrow_right");
            }
        }
        return {
            init: init
        };

    })();

    $(Menu.init);

})(jQuery, window);
