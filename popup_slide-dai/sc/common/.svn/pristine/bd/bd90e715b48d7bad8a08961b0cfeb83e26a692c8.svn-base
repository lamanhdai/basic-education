;(function($){
"use strict";

  var Index = $.index = (function(){

    var
      $ele = null,

      delay = 0,
      interval = 1000,
      $pattern = [0,1,0,1,0,1,0,1,2];

    function init(){
      $ele = $(".luck img");

      $(window).on("resize", function(){
        if( $(window).width() < 767 ) {
          replaceSP();
        } else {
          replacePC();
        }
      });

      setTimeout(runShake(0), interval);
    }

    function runShake(i){
      if(i<$pattern.length){
        $ele.eq($pattern[i]).show();
        setTimeout(function(){
          if(i+1 < $pattern.length) {
            $ele.eq($pattern[i]).hide();
            runShake(++i);
          }
        }, interval);
      }
    }

    function replaceSP(){
      $ele.each(function(){
        var filename = $(this).attr("src").replace( /^.+\// , '' );
        $(this).attr("src", "../../../common/campaign/omikuji/img/sp/" + filename);
      });
    }

    function replacePC(){
      $ele.each(function(){
        var filename = $(this).attr("src").replace( /^.+\// , '' );
        $(this).attr("src", "../../../common/campaign/omikuji/img/" + filename);
      });
    }

    return {
      init: init
    }

  })();

  $(Index.init);


})(jQuery);