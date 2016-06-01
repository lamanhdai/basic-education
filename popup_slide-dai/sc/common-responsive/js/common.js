//////////////////////////////////////////
//  jQuery common
//////////////////////////////////////////

$(function () {
  ua = navigator.userAgent;
  var isTab = (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0);
  if (isTab) {
    //// sp loader ////
    /*
     $('head').append(
     '<style type="text/css">#fade, #loader { display: block; }</style>'
     );
     jQuery.event.add(window,"load",function() {
     var pageH = $("#wrapper").height();
     $("#fade").css("height", pageH).delay(900).fadeOut(800);
     $("#loader").delay(600).fadeOut(300);
     });
     */
  } else {
    //// fade ////
    $(".fade").hover(function () {
      $(this).fadeTo(100, 0.6);
    }, function () {
      $(this).fadeTo(300, 1.0);
    });
  }

  //// openNav ////
  $( document ).on("click", ".openTtl >.fade", function(e) {
    e.preventDefault();
    
    $("#gNavLi .subNavLi, #languageLi .subNavLi").stop().slideUp(300).parent("li").removeClass("open");

    if($(this).next().css('display') == 'none'){
      $(this).next().stop().slideDown().parent("li").addClass("open");
    }

  });
  //// openNav ////
   $( document ).on("click", ".slideTtl", function(e) {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open').next().slideUp(300);
    } else {
      $(this).addClass('open').next().slideDown(300);
    }
    e.preventDefault();
  });
  $( document ).on("click", ".shopSlideTtl", function(e) {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open').next().slideUp(300);
    } else {
      $(this).addClass('open').next().slideDown(300);
    }
    e.preventDefault();
  });

  //// top news ////
  $('#top .itemList').each(function(){
    for (i = 0; i < 8; i++) {
      $(this).children().eq(i).addClass('show');
    }
  });
  $( document ).on('click', '.moreBtn.list', function(e){
    var cat = $(this).parent().attr('class').replace('newsList','');
    $('.'+cat).find('.itemList > li').not('.show').fadeIn('slow');
    $(this).hide().next().addClass('show');
    e.preventDefault();
  });

  //// font size ////
  var history = $.cookie('fontSize');
  var elm = $('body');
  (!history) ? elm.addClass('fontM') : elm.addClass(history);
  $( document ).on("click", "#fontSize .ib", function (e) {
    var setFontSize = this.id;
    $.cookie('fontSize', setFontSize);
    elm.removeClass().addClass(setFontSize);
    e.preventDefault();
  });

  //// calendar ////
  var calendar = $('.calendarTable');
  $(calendar).find('td:first-child').addClass('sun');
  $(calendar).find('td:last-child').addClass('sut');
  $(calendar).find('.date:empty').parent('td').addClass('spCont');
  $(calendar).find('tr').not(':first-child').find('.day').addClass('pcCont');
  //  function calendarPc(){
    var td = $(calendar).find('td').not('.spCont');
    var tdW = 100/$(td).length;
    $(td).css('width',tdW+'%');
  //}
  //calendarPc();
  
  var userAgent = window.navigator.userAgent.toLowerCase();
  var appVersion = window.navigator.appVersion.toLowerCase();
  if (userAgent.indexOf('msie') != -1) {
    if (appVersion.indexOf("msie 9.") != -1) {
      $('.calendarTable').addClass('ie9');
      $('.calendarTable tr').each(function(){
      var thIn = $(this).find('td').not('.spCont').length;
      $(this).css('width',thIn*tdW+'%');
      $(this).find('td').css('width',100/thIn+'%');
    });
  }
  }

  //// pageScroll ////
  $( document ).on( "click", ".scroll[href^=\"#\"]", function (e) {
    var id = $(this).attr("href");
    var offset = 60;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
      scrollTop: target
    }, 500);
    e.preventDefault();
  });
  $('#pagetop').hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#pagetop').fadeIn();
    }
    else {
      $('#pagetop').fadeOut();
    }
  });

  //// img change ////
  var changeImg = $('.changeImg img');

  var wW = $(window).width();
  var wH = $(window).height();
  var orderTxt = $('.orderTxt');
  var shopN = 50; //ã‚·ãƒ§ãƒƒãƒ—ãƒªã‚¹ãƒˆSPã§ã®è¡¨ç¤ºä»¶æ•°


  //$('#shopSort li').click(function (e) {
  //  var $this = $(this);
  //  var name = $(this).attr('id');
  //  $('#shopSort .active').removeClass('active');
  //  $this.addClass('active');
  //  $('.item').hide();
  //  $('.' + name).fadeIn('slow');
  //  line();
  //  e.preventDefault();
  //});

  $( document ).on('click', '.colorbox', function (e) {
    wW = $(window).width();
    var url = $(this).find('.link').attr('href');
    if (wW < 768) {
      e.preventDefault();
    } else {
      $(this).colorbox();
    }
  });
  $( document ).on('click', '#special .item', function () {
    wW = $(window).width();
    var url = $(this).find('.link').attr('href');
    if (wW < 768 && url) {
      location.href = url;
    }
  });
  $( document ).on('click', '#shopSort li', function () {
    if (wW < 768) {
      $(this).parent().parent().prev().removeClass('open').next().slideUp(300);
    }
  });

//  $('#special .item').each(function () {
//    var _this = $(this);
//    var url = _this.find('.link').attr('href');
//    if (!url) {
//      _this.find('.wrap').addClass('wrapNoLink');
//    }
//  });

  if ($('#post .snsLi')[0]) {
    $('#post').addClass('sns');
  }
  if ($('#shopPage #shopImg')[0]) {
    $('#dtlArea').addClass('clm');
    $('#page').addClass('noClm');
  }

  //// sp ////
  function spMenu() {
    if ($(changeImg).length) {
      $(changeImg).each(function () {
        $(this).attr('src', $(this).attr('src').replace('_pc', '_sp'));
      });
    }
    $(orderTxt).each(function () {
      $(this).insertAfter($(this).next('.newsTtl'));
    });
    //$('#shoplist .item').addClass('more');
    //for (i = 0; i < shopN; i++) {
    //  $('#shoplist .item').eq(i).addClass('show');
    //}
    $('.slideInner').removeClass('pc');
  }

  //// pc ////
  function pcMenu() {
    if ($(changeImg).length) {
      $(changeImg).each(function () {
        $(this).attr('src', $(this).attr('src').replace('_sp', '_pc'));
      });
    }
    $(orderTxt).each(function () {
      $(this).insertBefore($(this).prev('.newsTtl'));
    });
    $('.slideInner').addClass('pc');
  }

  //// sp / tab / pc ////
  $(window).on('resize', function () {
    wW = $(window).width();
    if (wW < 768) {
      spMenu();
    } else {
      pcMenu();
    }
  });
  if (wW < 768) {
    spMenu();
  } else {
    pcMenu();
  }
  //// spMenu ////
  function menuClick() {
    $('#spMenuInner').css('height', wH - 88);
    $('#spMenuWrap,#layer,body').addClass('open');
    $('#layer').on('touchmove.noScroll', function (e) {
      e.preventDefault();
    });
  }
  ;
  $( document ).on('click touchstart','#js_menu', function (e) {
    menuClick();
    e.preventDefault();
  });
  $( document ).on('click', '#layer,#closeBtn,#inner_menu', function (e) {
    $('#spMenuWrap,#layer,body').removeClass('open');
    $('#spMenuInner').css({
      'height': 'auto',
    });
    $('#layer').off('.noScroll');
    e.preventDefault();
  });

  //// External Link ////
  $("a[href^=http]").not("[href*="+location.hostname+"]").attr("target","_blank");
});
