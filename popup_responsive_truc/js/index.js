;(function($, win) {
    'use strict';

    var Modal = $.Modal = (function() {
        var
            $win = null,
            $openPopup = null,
            $hidePopup = null,
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
              // navCloseHandler();
            });

            $openPopup = $('a.open_popup');
            $hidePopup = $('.btn_close, .overlay');
            showPopup();
            hidePopup();
        }

        function showPopup(){
            $openPopup.click(function(event) {
                // widthOverlay = $win.width();
                // heightOverlay = $win.height();
                var popup = $(this).attr('href');
                $(popup).fadeIn('slow');
                $('body').append('<div class="overlay"></div>');
                $('.overlay').fadeIn(400);
            });
        }
        function hidePopup(){
            $hidePopup.click(function(event) {
                $(popup,'.overlay').fadeOut(300, function() {
                    $('.overlay').remove();
                });
                
            });
        }


        /**
         * navCloseHandler
         * Reset Open/Close Modal
         */
        function navCloseHandler() {
            if (!widthFlg) {

            }
        }


        return {
            init: init
        };

    })();

    $(Modal.init);

})(jQuery, window);
