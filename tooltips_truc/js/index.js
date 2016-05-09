;(function($, win) {
    'use strict';

    var TopPage = $.TopPage = (function() {
        var
            $win = null,

            winHeight = 0,
            winWidth = 0,
            widthFlg = false,
            isTablet = false;


            

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
