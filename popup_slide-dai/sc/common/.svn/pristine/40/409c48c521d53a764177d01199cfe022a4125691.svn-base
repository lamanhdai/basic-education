;(function(){
  "use strict";

  var Index = $.index = (function(){

    var 
      $imgHover = null;


  function btnHover(){

    $imgHover = $(".button_campaign img");
    $imgHover.each(function(){
      var $this = $(this);

      $this.offSrc = $this.attr("src");
      $this.onSrc = $this.offSrc.replace("_off.","_on.");

      $this.on({
        "mouseover": function(){
          $this.attr("src", $this.onSrc);
        },
        "mouseout": function(){
          $this.attr("src", $this.offSrc);
        }
      });
    });
  };
    return {
      btnHover:btnHover
    }

  })();
   // call function
  if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
    $(Index.btnHover);
  }

})(jQuery);
