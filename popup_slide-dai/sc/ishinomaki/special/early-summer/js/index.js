/* -----------------------------------
   index.js
-------------------------------------*/
(function($){
  'use strict';
  var Summer = $.summer = (function(){
    var
      modalNm = 0,
      scrTop = 0,
      mySwiper = null,
      $slider_product = null,
      $gallery = null,
      $thumbnail = null,
      slideHeight = 0,
      current = 0;
      function init(){
        setModal();

        $('.item_list li:nth-child(3n+1)').each(function(){
          $(this).addClass('first');
        });

      /* ナビゲーションのon off */
        $('#contents_header nav li').each(function(){
          if($(this).hasClass("current")){
            $(this).css('background-image', $(this).css('background-image').replace('_off', '_on'));
          }
        });

        $('#contents_header nav li').off();
        $('#contents_header nav li').on({
          'mouseover': function(){
            $(this).css('background-image', $(this).css('background-image').replace('_off', '_on'));
          }, 
          'mouseout': function(){
            if(!$(this).hasClass("current")){
              $(this).css('background-image', $(this).css('background-image').replace('_on', '_off'));
             }
          },
          'click': function(){
              var num = $("#contents_header nav li").index(this);
              $(".panel").addClass('disnon');
              $(".panel").eq(num).removeClass('disnon');
              $(this).css('background-image', $(this).css('background-image').replace('_off', '_on'));
              $('#contents_header nav li.current').css('background-image', $('#contents_header nav li.current').css('background-image').replace('_on', '_off'));
              $("#contents_header nav li.current").removeClass('current');
              $(this).addClass('current');
              return false;
            }
        });
      }

      // モーダルウィンドウ
      function setModal(){
        // 「.modal_open」をクリック
        $('.modal_open').on({
          'click' : (function(){
            // オーバーレイ用の要素を追加
            $('body').append('<div class="modal_overlay"></div>');
            // オーバーレイをフェードイン
            $('.modal_overlay').animate({
              opacity: 0.7}
              ,0);
            $('.modal_overlay').fadeIn('slow');

            // モーダルコンテンツのIDを取得
            var modal = '#' + $(this).attr('data-target');
            var index = $(".modal_open").index(this);
            modalNm = index;

            // モーダルコンテンツの表示位置を設定
            modalResize();
             // モーダルコンテンツフェードイン
            $(modal).fadeIn('slow');

            // 「.modal_overlay」あるいは「.modal_close」をクリック
            $('.modal_overlay, .modal_close').on({
                'click': function(){
                    // モーダルコンテンツとオーバーレイをフェードアウト
                    $(modal).fadeOut('slow');
                    $('.modal_overlay').fadeOut('slow',function(){
                        // オーバーレイを削除
                        $('.modal_overlay').remove();
                    });
                }
            });

            // モーダルコンテンツの表示位置を設定する関数
            function modalResize(){

                // ウィンドウの横幅、高さを取得
                var w = $(window).width();
              //  var x = 767;
                var modalWidth = $(modal).width();
             //   var scrollWidth = $('.scroll_box').width();
                var modalHight = modalWidth * 0.92;
             //   var scrollHight = scrollWidth * 1.45;

                // モーダルコンテンツの表示位置を取得
                var x = (w - $(modal).outerWidth(true)) / 2;
                var y = scrTop + 50;

                // モーダルコンテンツの表示位置を設定
                $(modal).css({'left': x + 'px','top': y + 'px'});
            }

            if(mySwiper == null){
            //  var thumbNo;
              mySwiper = new Swiper('.swiper-container',{
                loop:true,
                grabCursor: true,
                paginationClickable: true,
                onTouchStart: function(){
                  slider();
                }
              })

              mySwiper.swipeTo(modalNm);
              $('.arrow-left').on('click', function(e){
                e.preventDefault()
                mySwiper.swipePrev()
              })
              $('.arrow-right').on('click', function(e){
                e.preventDefault()
                mySwiper.swipeNext()
              })
            }else{
              if ( navigator.userAgent.indexOf('iPhone') > 0 ){
                setTimeout(function(){
                   mySwiper.swipeTo(modalNm);
                },400);
              }else{
                mySwiper.swipeTo(modalNm);
              }
            }
          })
        })
      }

      /**
       * slider
       * Click thumbnail to change slide
      */
      function slider() {
        $slider_product = $('.swiper-slide-active');
        $gallery = $slider_product.find('figure li');
        $thumbnail = $slider_product.find('.thumb_area li');
        slideHeight = $gallery.height();
        $slider_product.find('figure ul').css({'height': slideHeight});

        $slider_product.find('figure li').each(function(){
          var $item_gallery = $(this),
              itemWidth = 0;
          $item_gallery.css({'position': 'absolute'});
          itemWidth = $item_gallery.width();
        });


        $thumbnail.off().on({
          'click' : (function(e){
            e.preventDefault();
            var $this_thumb = $(this);
            var current = $(this).index();
            $thumbnail.removeClass('current');
            $(this).addClass('current');
            $gallery.stop().fadeTo('slow', 0, function() { 
              $(this).css('z-index', '0');
            });
            $gallery.removeClass('current');
            $gallery.eq(current).addClass('current');
            $gallery.eq(current).delay(50).stop().fadeTo('slow', 1, function() { 
              $(this).css('z-index', '1');
            });
          })
        })
      }
      return {
        init: init
      }
  })();
/* document.ready
----------------------------------------*/
$(Summer.init);

})(jQuery);