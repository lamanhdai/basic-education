now = new Date(); 
var thday = new Array ("Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"); 
var thmonth = new Array ("Tháng một","Tháng hai","Tháng ba","Tháng tư","Tháng năm","Tháng sáu","Tháng bảy","Tháng tám","Tháng chín","Tháng mười","Tháng mười một","Tháng mười hai"); 

document.write("&#3623;&#3633;&#3609;" + thday[now.getDay()]+ "&#3607;&#3637;&#3656; "+ now.getDate()+ " " + 
thmonth[now.getMonth()]+ " " + (0+now.getFullYear()+543));

&nbsp;&nbsp;<span id="tick2"> </span>


function show2(){
if (!document.all&&!document.getElementById)
return
thelement=document.getElementById? document.getElementById("tick2"): document.all.tick2
var Digital=new Date()
var hours=Digital.getHours()
var minutes=Digital.getMinutes()
var seconds=Digital.getSeconds()
var dn="PM"
if (hours<12)
dn="AM"
if (hours>12)
hours=hours-12
if (hours==0)
hours=12
if (minutes<=9)
minutes="0"+minutes
if (seconds<=9)
seconds="0"+seconds
var ctime=hours+":"+minutes+":"+seconds+" "+dn
thelement.innerHTML="<b style='font-size:9;color:#EAEAEA;'>"+ctime+"</b>"
setTimeout("show2()",1000)
}
window.onload=show2

;(function($) {
  'use strict';
  var Time = $.menuscroll = (function(){
    var
    function init() {

      $global_navi = $('.global_navi');
      $global_navi_item = $global_navi.find('a');
      $header = $('#header');

      $pageTop = $('.page_top a');

      $header = $('#header');
      $navigation = $header.find('.navigation');

      smoothScroll();
      menuScroll();
      $(window).on('scroll load', function(){
        winScroll = $(window).scrollTop();
        fixGlobalNavigation();
        setActiveNavigation();
      });
    }
    return {
      init : init
    }
  })();
  $(Time.init);
})(jQuery, window);