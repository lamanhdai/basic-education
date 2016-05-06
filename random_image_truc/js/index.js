;(function($, win) {
    'use strict';

    var TopPage = $.TopPage = (function() {
        var
            $win = null,

            $listItem = null,
            $item,
            $itemActive,
            

            winHeight = 0,
            winWidth = 0,
            widthFlg = false,
            isTablet = false,

            itemLength = 0,
            rows,
            timer;
            



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

            $listItem = $('.list_item');
            $item = $listItem.find('li');
            timer = setTimeout(randomList,0);
        }

        function randomList(){
            var count_item = $listItem.find('li.active').length;
            if (count_item < 6) {
                var temp  = $listItem.find('li').length -1;
                var card  = Math.floor(Math.random()*temp)+1;
                if(!$item.eq(card).hasClass('active')) {
                    $item.eq(card).addClass('active');
                }
            }

            rows = 3;
            sizing(rows);
            timer = setTimeout(randomList,0);
        }

        function sizing(rows) {
            $listItem.each(function(index, el) {
              $itemActive = $(this).find('li.active');
              itemLength = $itemActive.length;
              $itemActive.css({
                "height": "auto"
              }); 
              
              for( var i = -1, len = Math.ceil( itemLength / rows); ++ i < len; ){
                var itemArray = [];
                for(var j = -1; ++ j < rows;){
                  itemArray.push( i * rows + j );
                }
                setItemColumn(itemArray);
              }
            });
          }

        function setItemColumn( itemNum ){
            var txtMaxHeight = 0;
            for( var i = 0; i < itemNum.length; i++){
              txtMaxHeight = $itemActive.eq(itemNum[i]).height() > txtMaxHeight ? $itemActive.eq(itemNum[i]).height() : txtMaxHeight;
            }
            for(i = 0; i < itemNum.length; i++){
              $itemActive.eq(itemNum[i]).css({
                "height": txtMaxHeight + "px"
              });
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
