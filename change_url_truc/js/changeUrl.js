;(function(){
  var UA = navigator.userAgent,
      CURRENT_URL = location.href,
      isSP_URI = /\/change_url\/sp\//i.test(CURRENT_URL),
      isMobile = (function() {
        var useragents = [
              'iPhone',         //  Apple iPhone
              'iPod',           //  Apple iPod touch
              'Android.*Mobile',//  1.5+ Android
              'dream',          //  Pre 1.5 Android
              'CUPCAKE',        //  1.5+ Android
              'blackberry9500', //  Storm
              'blackberry9530', //  Storm
              'blackberry9520', //  Storm v2
              'blackberry9550', //  Storm v2
              'blackberry9800', //  Torch
              'webOS',          //  Palm Pre Experimental
              'incognito',      //  Other iPhone browser
              'webmate'         //  Other iPhone browser
            ],
            i       = 0,
            len     = arguments.length,
            pattern,
            matchStr;

        for( ; i < len; i++ ) {
          useragents.push(arguments[i]);
        }

        pattern = new RegExp(useragents.join('|'), 'i');
        matchStr = UA.match(pattern);

        return matchStr? matchStr[0] : false;
      })(),

      // é™¤å¤–ãƒšãƒ¼ã‚¸
      exceptPages = [
        "\/change_url\/shoplist\.html",
        "\/change_url\/philosophy\/",
        "\/change_url\/sp\/philosophy\/",
        "\/change_url\/catalog\/"
      ],

      exceptPageExp = new RegExp(exceptPages.join('|'), 'i');



  if( !exceptPageExp.test(CURRENT_URL) ){

    if( isMobile && !isSP_URI ){
      location.href = CURRENT_URL.replace(/\/change_url\//, "/change_url/sp/");
    } else if( !isMobile && isSP_URI ){
      location.href = CURRENT_URL.replace(/\/change_url\/sp\//, "/change_url/");
    }
  }
})();