;(function($, win) {
    "use strict";
    var 
    $win = null,
    widthFlg = false,
    winWidth = 0,
    $selectSlider = null,
    $selectCountryBox = null,
    listLen = 0,
    $wrapIntro = null,
    $slider = null,
    itemLen = 0,
    src;
    function init() {
        $win = $(win);
        widthFlg = ($win.width() > 767) ? false : true;
      $selectSlider = $('.bxslider');
      listLen = $('.bxslider').find('li').length;
      $(window).on('load resize',function(event) {
        winWidth = $win.width();
        widthFlg = (winWidth > 767) ? false : true;
        if($slider !== null) {
          $selectSlider.destroySlider();
          listLen = $('.bxslider').find('li').length;
        }
        if(widthFlg) {
          sliderSP();
        } else {
          sliderPC();
        }
      });
    }

    /**
     * sliderPC
     * set slide for PC page
    */
    function sliderPC() {
      var
      diffMargin = 371,
      marginSlide = 87;
      $slider = $selectSlider.bxSlider({
        maxSlides: listLen,
        speed: 600,
        slideMargin: marginSlide,
        auto: true,
        onSliderLoad: function() {
          var currentClass = listLen + 'n+1';
          $selectSlider.find('li:nth-child(' + currentClass + ')').addClass('current');
          $selectSlider.find('.current').prev()
          .addClass('pre-current')
          .css({
            'margin-right': diffMargin + 'px',
            'margin-left': '-371px'
          });
          $selectSlider.find('.pre-current').not('.bx-clone').hide();
          hoverSlide();
          $selectSlider.css({"margin-left": marginSlide});
        },
        onSlideBefore: function() {
          $selectSlider.find('.pre-current').not('.bx-clone').show();
          $selectSlider.find('li').removeClass('active');
          resetMargin();
          $slider.startAuto();
          var current = $slider.getCurrentSlide(),
          currentClass = listLen + 'n+' + (current + 1);
          $selectSlider.find('li:nth-child(' + currentClass + ')').addClass('current');
          $selectSlider.find('li:not(.bx-clone)').eq(current).addClass('active');
          $selectSlider.find('.current').prev()
          .addClass('pre-current')
          .css({
            'margin-right': diffMargin + 'px',
          });
          $selectSlider.css({"margin-left": 0});
          hoverSlide();
        }
      });

      //reset Margin before adding margin to each slide
      var resetMargin = function() {
        $selectSlider = $('.bxslider');
        $selectSlider.find("li").css('margin-right', marginSlide + "px");
        $selectSlider.find("li").css('margin-left', '0px');
        $selectSlider.find("li").removeClass('current');
        $selectSlider.find("li").removeClass('pre-current');
      };
    }
    function hoverSlide(){
      $selectSlider.find("li").off();
      $selectSlider.find("li span:not(.region) img").each(function(){
        var reset_src = null;
        reset_src = $(this).attr("src").replace("_on", "_off");
        $(this).attr("src", reset_src);
      });
      $selectSlider.find("li.active").off().on({
        'mouseenter': function(e){
          var src = $(this).find("span:not(.region) img").attr("src").replace("_off", "_on");
          $(this).find("span:not(.region) img").attr("src", src);
        },
        'mouseleave': function(e){
          var src = $(this).find("span:not(.region) img").attr("src").replace("_on", "_off");
          $(this).find("span:not(.region) img").attr("src", src);
        }
      });
    }

    /**
     * sliderSP
     * set slide for SP page
    */
    function sliderSP() {
      var
      marginSlide = 10;
      $slider = $selectSlider.bxSlider({
        maxSlides: listLen,
        speed: 600,
        slideMargin: marginSlide,
        auto: true
      });
    }


    $(function() {
        init();
    });
})(jQuery, window);
