;(function($, win){
  'use strict';

  var CheckBox = $.checkbox = (function() {

    function init(){
      bgCheckbox();
    }

    /**
     * checkbox
     * using for search form
     */
    function bgCheckbox(){
      var checkbox = $('.check_list input:checkbox');
      checkbox.each(function(){
        if ($(this).is(':checked'))
          $(this).hide().after('<div class="class_checkbox checked"></div>');
        else
          $(this).hide().after('<div class="class_checkbox" />');
      });

      $('.class_checkbox').on('click',function(e){
        $(this).toggleClass('checked');
        $(this).prev().prop('checked',$(this).is('.checked'));
        e.preventDefault();
      });

      $('.check_list label > span').on('click',function(e){
        $(this).prev().toggleClass('checked').prev().prop('checked',$(this).prev().is('.checked'));
        e.preventDefault();
      });
    }


    return {
      init: init
    };

  })();

  $(CheckBox.init);

})(jQuery, window);