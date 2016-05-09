;(function(window, $){

  var Index = $.index = (function(){
    var shineStart = false;
    function init(){
      shineStart = true;
      $(".box_star img").each(function(){
        shine($(this));
      });
    };
    var shine = function($element){
      var interval = Math.random() * 3000;

      $element
        .delay(interval)
        .velocity({
          "opacity": 1
        }, {
          "duration": 100
        })
        .velocity({
          "opacity": 0
        }, {
          "duration": 3000,
          "complete": function(){
            shine($element);
          }
        });
    }
    return {
      init:init
    }

  })();
  $(Index.init);

})(window, jQuery);