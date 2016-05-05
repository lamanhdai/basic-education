(function($, win){
  var currentMap = (function(){
    var winWidth;
    var $areaMap;
  
    function init(){
      $areaMap = $(".area_map");
      $areaMap.data("defaultSrc", $areaMap.attr("src"));
      $("#Map area")
      .mouseover(function(){
        swapImage($(this).attr("class"));
      })
      .mouseout(function(){
        swapImage();
      });
    }
  
    function swapImage(name){
      $areaMap.attr("src", "img/img-map_" + (name? name : "default") + ".jpg");
    }
  
    return {
      init : init
    }
  })();

  $(function(){
    currentMap.init();
  });

  function setZoom(){
    if( $(window).width() <= 767 ){
      var scale = $(window).width() / 768;
      $('.wrap_img').css({'zoom' : scale });
    } else if( $(window).width() > 767 ){
      $('.wrap_img').removeAttr('style');
    }
  }

  $(window).on('load resize', function(){
    setZoom();
    var winWidth = $(window).width();
  });

})(jQuery, window);