
var onYouTubeIframeAPIReady;

;(function(){
  "use strict";

  // read youtube API
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var
    UA = navigator.userAgent,
    macOs = UA.match(/Mac|PPC/), //Mac OS
    safari = (UA.indexOf("Safari") > 0 && UA.indexOf("Chrome") < 0),
    $window,
    width = 0,
    height = 0,
    ratioWidth = 16/9,
    ratioPadding = 43/355,
    player,
    videoID = "2ips2mM7Zqw",
    initHeight,
    initWidth,
    innerHeight,
    paddingWidth,
    paddingHeight,
    init,
    onPlayerReady,
    onPlayerStateChange,
    onPlayerError,
    onMovieEnd,
    checkFlash,
    $brosPlayer,
    $brosVideo,
    hoverImgOf,
    normalImgOf,
    hoverImage,
    muteVideo = true,
    image,
    isMobile,
    smartphoneMovieInit;

  // pre-load image
  image = new Image();

  init = function(){
    $(function(){
      $window = $(window);
      width = $window.width();
      height = $window.height();
      initHeight = Math.ceil( width * ( 9 / 16) );

      player = new YT.Player("bros_video", {
        "width": width,
        "videoId": videoID,
        "events": {
          "onReady": onPlayerReady,
          "onStateChange": onPlayerStateChange
        },
        playerVars: {
          "wmode": "transparent",
          "autoplay": 1,
          "controls": 0,
          "rel": 0,
          "showinfo": 0,
          "enablejsapi": 1,
          "html5": (macOs && safari)? 1 : 0
        }
      });

      innerHeight = initHeight * ( 267 / 355 );

      $brosPlayer = $("#bros_player")
        .css({
          "max-height": innerHeight + "px",
          "text-align": "center",
          "overflow": "hidden",
          "position": "relative"
      });

      $brosVideo = $("#bros_video");
      $brosPlayer
        .children(".video_overlay")
          .css({
            "position": "absolute",
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%"
          })
          .children(".controler")
            .css({
              "position": "relative",
              "width": "980px",
              "height": "100%",
              "margin": "0 auto"
            });
            
        $(".sound_ico").on("click tap", function(event){
          var $this = $(this),
              srcImg = $this.find('img').attr('src');

          event.preventDefault();
          if(muteVideo) {
            $this.removeClass('mute');

            srcImg = srcImg.replace("_off", "_on");
            $this.find('img').attr('src', srcImg).css('opacity','1');

          } else {
            $this.addClass('mute');

            srcImg = srcImg.replace("_on", "_off");
            $this.find('img').attr('src', srcImg).css('opacity','0.7');

          }
          muteVideo = !muteVideo;
          if(muteVideo){
            player.mute();
          } else {
            player.unMute();
          }
            
       });

      $window
        .on({
          "resize": function(event){
            width = $window.width();
            height = $window.height();
            paddingWidth = width * (6 / 640);
            initWidth = width + paddingWidth;
            initWidth = width;
            initHeight = ( width * ( 9 / 16 )  );
            paddingHeight = initHeight * ratioPadding;

            $brosVideo
              .css({
                "width": initWidth,
                "height": initHeight + "px",
                "margin-top": - paddingHeight -1 + "px"
            });
                
          }
        })
        .trigger('resize');
    });
  };

  onPlayerReady = function(event) {
    player.playVideo();  
    if(muteVideo === true) {
      player.mute();
    } else {
      player.unMute();
    }
  };

  onPlayerStateChange = function(event){
    switch( event.data ){
      case -1 :
        break;
      case 0 :
       player.loadVideoById(videoID);
        break;
      case 1 :
        break;
      case 2 :
        break;
      case 3 :
        break;
      case 5 :
        break;
    }
  };

  //check Browser support Flash
  checkFlash = function(){
    var hasFlash = false;
    try {
      var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (fo) {
        hasFlash = true;
      }
    } catch (e) {
      if (navigator.mimeTypes
            && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
            && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
        hasFlash = true;
      }
    }
    return hasFlash;
  };

  //hover Sound Icon
  hoverImage = function(){
    $(".sound_ico").hover( function(){
      var hoverImg = hoverImgOf($(this).find('img').attr("src"));
      $(this).find('img').attr("src", hoverImg);
    },function() {
      var normalImg = normalImgOf($(this).find('img').attr("src"));
      $(this).find('img').attr("src", normalImg);
    });
  }
  hoverImgOf = function(filename){
   var re = new RegExp("(.+)_off\\.(gif|png|jpg)", "g");
   return filename.replace(re, "$1_on.$2");
  }
  normalImgOf = function(filename){
   var re = new RegExp("(.+)_on\\.(gif|png|jpg)", "g");
   return filename.replace(re, "$1_off.$2");
  }

  isMobile = function(){
    var useragents = [
      "iPhone",         //  Apple iPhone
      "iPod",           //  Apple iPod touch
      "Android",        //  1.5+ Android
      "dream",          //  Pre 1.5 Android
      "CUPCAKE",        //  1.5+ Android
      "blackberry9500", //  Storm
      "blackberry9530", //  Storm
      "blackberry9520", //  Storm v2
      "blackberry9550", //  Storm v2
      "blackberry9800", //  Torch
      "webOS",          //  Palm Pre Experimental
      "incognito",      //  Other iPhone browser
      "webmate",        //  Other iPhone browser
      "iPad"            //  Other iPad browser
    ],
    i = -1,
    len = arguments.length;
      
    for( ; ++ i < len; ){
      useragents.push(arguments[i]);
    }

    var
      pattern = new RegExp(useragents.join("|"), "i"),
      matchStr = UA.match(pattern);

    return matchStr? matchStr[0] : false;
  };


  onYouTubeIframeAPIReady = function(){
    if(!isMobile()){
      init();  
    } else if(isMobile()) {
      smartphoneMovieInit();
    }
    
  };
  
  smartphoneMovieInit = function(){
    var
      $window = $(window),
      $body = $('body'),
      $movieBtn = $('#top_nav.nav_sp > li:eq(0)').find('a'),
      iframePrefix = '//www.youtube.com/embed/',
      iframeSuffix = '?rel=0',
      movieKey = $movieBtn.attr('href').replace('http://youtu.be/',''),
      iframeSrc = iframePrefix + movieKey + iframeSuffix,
      videoDom = '<div id="video_wrapper"><div id="video_container"><div class="inner"><iframe width="800" height="450" frameborder="0" allowfullscreen></iframe></div><div class="close_btn"><p>CLOSE</p></div></div></div>',
      $videoWrapper,
      $videoContainer,
      $btnVideoClose;
      
    
      $movieBtn.on('click', function(event){
        event.preventDefault();
        
        $body.append( videoDom );
        
        $videoWrapper = $('#video_wrapper');
        $videoContainer = $('#video_container');
        $btnVideoClose = $videoContainer.find('.close_btn');
        
        $videoWrapper.css('height', getHeight($body));
        $videoContainer.find('iframe').attr('src', iframeSrc);
        $videoWrapper.addClass('view');
        var $videoContainerTop = ($window.height()-$videoContainer.height())/2;
        if($videoContainerTop < 10) {
          $videoContainerTop = 10;
        }
        $videoContainer.css('margin-top', $videoContainerTop + 'px');
        
        closeVideoModal( $videoWrapper, $btnVideoClose );
        closeVideoModal( $videoWrapper, $videoWrapper );
        
      });
      
    function closeVideoModal( target, btn ){
       btn.on('click', function(){
        target.remove();
      });
    }

    function getHeight( element ) {
      var elemHeight = element.height();
      return elemHeight;
    }
    
    
  }
  

})(jQuery);