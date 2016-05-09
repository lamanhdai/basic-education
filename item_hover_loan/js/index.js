;(function(){

  var Index = $.index = (function(){
    var
      $btnEle,
      $photoEle,
      $photoDefault;

    function init(){
      $btnEle = $(".btn_item li");
      $photoEle = $(".main_visual li");

      $btnEle.on({
        "mouseenter" : function(){
          var index = $(this).index();
          $btnEle.removeClass("current");
          $(this).addClass("current");
          $photoEle.eq(index).show().siblings().hide();
        },
        "mouseleave" : function(){
          // your code here ...
        }
      });
  }
  return {
    init:init
  }

})();
$(Index.init);

})(jQuery);
