;(function(){
  "use strict";

  var Index = $.index = (function(){

    var 
      $imgHover = null,
      $btnTitle = null;
  var
      $item,
      itemLen = 0,
      rows = 2;

  var temp,
      lenRow;


  function btnHover(){
    $btnTitle = $("#shop_category li img");
    $imgHover = $(".price_nav li img");
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

    $btnTitle.each(function(){
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


/* setheight
  ----------------------------------------*/
  function setHeight(){

    $(window).on("load resize", function(){
      if ($(window).width() >= 768) {
        
        $('#list_item ul').each(function() {
          $item = $(this).find('dl');
          itemLen = $item.length;
          loopItem(itemLen);
        });
        $('#list_item ul').each(function() {
          $item = $(this).find('.price');
          itemLen = $item.length;
          loopItem(itemLen);
        });
        $('#list_item ul').each(function() {
          $item = $(this).find('.subject');
          itemLen = $item.length;
          loopItem(itemLen);
        });
        $('#list_item ul').each(function() {
          $item = $(this).find('.name_floor');
          itemLen = $item.length;
          loopItem(itemLen);
        });
      } else {
        $('#list_item li dl').css("height", "auto");
        $('#list_item li .price').css("height", "auto");
        $('#list_item li .subject').css("height", "auto");
        $('#list_item li .name_floor').css("height", "auto");
      }  
    });
  };


  function setItemColumn( itemNum ){
        
    var txtMaxHeight = 0;
    for( var i = 0; i < itemNum.length; i++){
      txtMaxHeight = $item.eq(itemNum[i]).height() > txtMaxHeight ? $item.eq(itemNum[i]).height() : txtMaxHeight;
    }
    for(i = 0; i < itemNum.length; i++){
      $item.eq(itemNum[i]).css('height',txtMaxHeight);

    }
  };

  function loopItem(itemLen) {
    for( var i = -1, len = Math.ceil( itemLen / rows); ++ i < len; ){
      var itemArray = [];
      for(var j = -1; ++ j < rows;){
        itemArray.push( i * rows + j );
      }
      setItemColumn(itemArray);
    }
  };

    return {
      btnHover:btnHover,
      setHeight:setHeight
    }

  })();
   // call function
  if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
    $(Index.btnHover);
    $(Index.setHeight);
  }

})(jQuery);
