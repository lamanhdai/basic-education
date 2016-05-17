;(function($, win) {
    'use strict';

    var TopPage = $.TopPage = (function() {
        var
            $win = null,

            winHeight = 0,
            winWidth = 0,
            widthFlg = false,
            isTablet = false,

            scrollHandler,
            scrollInfobox;


        function init() {
            $win = $(window);
            winHeight = $win.height();
            winWidth = $win.width();
            widthFlg = ($win.winWidth > 767) ? false : true;
            isTablet = (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent.indexOf('Android') != -1) ? true : false;
            $win.on('resize orientationchange', function() {
                winWidth = $win.width();
                widthFlg = (winWidth > 767) ? false : true;
                navCloseHandler();
            });
            $win.on({
                "scroll": function() {
                    scrollInfobox();
                }
            });

        }

        function scrollInfobox() {
            var
                top_window = $win.scrollTop(),
                win_height = $win.height();

            $('.box-img').each(function() {

                var target_pos = $(this).offset().top;

                if (top_window > target_pos - win_height + 200) {

                    $(this)
                        .find('.content')
                        .velocity({
                            'top': '50%',
                            'opacity': 1
                        }, 500, 'easeOutQuad');

                    $(this)
                        .find('.box-bg')
                        .delay(400)
                        .velocity({
                            'marginLeft': 0,
                            'marginRight': 0,
                            'opacity': 1
                        }, 500, 'easeOutQuad');
                }
            });
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
