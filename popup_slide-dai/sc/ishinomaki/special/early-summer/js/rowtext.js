(function($, win){
  "use strict";

  var CountText = $.counttext = (function(){

    function init(){
      countTxt();
    }

    function countTxt() {
      var 
          $item = $('.item'),
          $name = $item.find('.name'),
          $des = $item.find('.descript');
      var isFirefox = typeof InstallTrigger !== 'undefined';
      var $initialNames = [];
      var $initialDescs = [];
      for (var i = 0, len = $item.length; i < len; i++) {
        $initialNames.push($name.eq(i).text());
        $initialDescs.push($des.eq(i).text());
      }
      $(window).on('load resize', function() {
        $name.each(function(index, el) {
          truncate(el, $initialNames[index], { line: 1 });
        });
        $des.each(function(index, el) {
          truncate(el, $initialDescs[index], { line: 2 });
        });
        if($(window).width() < 1000 && isFirefox ) {
          $des.each(function(index, el) {
            truncate(el, $initialDescs[index], { line: 3 });
          });
        }
      });

    }

    return {
      init: init
    };

    })();

  $(CountText.init);
  
})(jQuery, window);