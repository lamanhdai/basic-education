;(function(){

  var Index = $.index = (function(){
    var $hoverLi = null;

    function init(){
      $hoverLi = $(".menu li");

      $hoverLi.append("<span class='bg_hover'></span>");

      $hoverLi.on({
        "mouseover": function(){
          $(this).find(".bg_hover")
          .stop()
          .animate({top: '-45px',left: '0'}, 300)
        },
        "mouseout": function() {
          $(this).find(".bg_hover").stop().animate({top: '0',left: '0'}, 300)
        }
      });
    }
    return {
      init:init
    }

  })();
  $(Index.init);

})(jQuery);
