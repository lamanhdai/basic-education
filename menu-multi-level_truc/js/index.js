;
(function($, win) {
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
            
            $navItem.not(".dropdown_list").find("a").append('<i class="material-icons">remove</i>');
            $dropdownItem.append('<i class="material-icons">keyboard_arrow_right</i>');
            if (widthFlg) {
                $btnMenu.css('display', 'block');
            } else {
                $btnMenu.css('display', 'none');
                return false;
            }
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
            var heightMenu = $win.height();
            $btnMenu.click(function(e) {
                if ($navigation.hasClass('show')) {
                    $navigation.stop().animate({ 'margin-left': "100%"}, {duration: 300, easing: "easeOutBack"});
                    $navigation.removeClass('show');
                    // $("body").css('overflow-x', 'auto');
                    // $("body").removeClass("push_right").stop().animate({ 'right': "0", easing: "easeInBounce" }, 300);
                    $(this).text("menu");
                } else {
                    $navigation.stop().animate({'margin-left': "-15px"}, {duration: 300, easing: "swing"});
                    $navigation.addClass('show');
                    $navigation.css('height');
                    // $("body").css('overflow-x', 'auto');
                    // $("body").addClass("push_right").stop().animate({ 'right': "100%", easing: "easeOutBounce" }, {duration: 300, easing: "easeOutBack"});
                    $(this).text("close");
                }
            });
            $btnClose.click(function(e) {
                $navigation.stop().animate({'margin-left': "100%"}, {duration: 300, easing: "easeOutBack"});
                $navigation.removeClass('show');
                $btnMenu.text("menu");
            });
        }

        /**
         * navbar$Dropdown
         * Click to open/hide $dropdown-menu on SP
         */

        function dropdownList() {
            $dropdownItem.click(function() {
                if (widthFlg) {
                    $(this).toggleClass('active');
                    if ($(this).hasClass('active')) {
                        $(this).next("ul").stop().slideDown({duration: 300, easing: "easeOutBack"});
                        $(this).find('.material-icons').text('keyboard_arrow_down');

                    } else {
                        $(this).next("ul").stop().slideUp({duration: 300, easing: "easeOutBack"});
                        $(this).find('.material-icons').text('keyboard_arrow_right');

                    }
                }
            });
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
