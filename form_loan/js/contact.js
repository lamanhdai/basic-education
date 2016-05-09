;(function($, win){
  "use strict";

  var Contact = $.contact = (function() {
    var $contact_form = null,
        $required_field = null,
        $error = null,
        $loading = null,
        lang = "jp";

    function init(){
      $contact_form = $("#contact_form");
      $required_field = $contact_form.find(".required");
      $loading = $('<div class="loading"><img src="/form/img/loading.gif" alt="loading" /></div>');
      var formAction = $contact_form.attr('action');

      var url = window.location.pathname;
      var arrayurl = url.split("/");
      // if(arrayurl[1] == "vn") lang ="vn";
      // else if(arrayurl[1] == "en") lang ="en";
      // else if(arrayurl[1] == "jp") lang ="jp";

      $contact_form.on({
        "submit": function(event) {
          validation_contact();
          $error = $contact_form.find(".error");
          if($error.length == 0) {
            $(".form").append($loading);
            $contact_form.hide();
            $.ajax({
              url: '/form/contact/send-mail.php',
              type: 'POST',
              data: {
                lang: lang,
                info: {
                  name: $('#name').val(),
                  tel: $('#tel').val(),
                  email: $('#email').val(),
                  re_email: $('#re_email').val(),
                  message: $('#message').val()
                }},
              success: function(data){
                $loading.remove();
                var message = $.parseJSON(data);
                $(".form").append(message).fadeIn();
              }
            });
          }
          event.preventDefault();
        }
      });
    }

    function validation_contact(){
      $error = $contact_form.find(".error");
      $error.remove();
      var telReg = /^(0|([\+][8][4]))[0-9]{2}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4,5}$/;
      var emailReg = /([\w\-]+\@[\w\-]+\.[\w\-]+)/;
      $required_field.each(function(){
        var inputVal = $(this).val();
        var $parentTag = $(this).parent();
        if($(this).hasClass('name')){
          if(inputVal == ''){
            var text = "氏名を記入してください";
            $parentTag.append('<p class="error">'+text+'</p>');
          }
        }
        if($(this).hasClass('tel')){
          if(!telReg.test(inputVal)){
            var text = "電話番号を記入してください";
            $parentTag.append('<p class="error">'+text+'</p>');
          }
        }
        if($(this).hasClass('email')){
          if(!emailReg.test(inputVal)){
            var text = "正しいメールアドレスを記入してください";
            
            $parentTag.append('<p class="error">'+text+'</p>');
          }
        }
        if($(this).hasClass('re_email')){
          var match_email = $contact_form.find(".email").val();
          if(!emailReg.test(inputVal) || match_email != inputVal){
            var text = "正しい確認用のメールアドレスを記入してください";
            
            $parentTag.append('<p class="error">'+text+'</p>');
          }
        }
        if($(this).hasClass('message')){
          if(inputVal == '' || inputVal.length < 20){
            var text = "入力するメッセージは20文字以上です。";
            
            $parentTag.append('<p class="error">'+text+'</p>');
          }
        }
      });
    }
    return {
      init: init
    };

  })();

  $(Contact.init);

})(jQuery, window);