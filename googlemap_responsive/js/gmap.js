;(function($) {
    "use strict";
    var
        init = function() {
            google_Map();
        },

        google_Map = function() {
            var initBJD = function() {
                var myLatlng = new google.maps.LatLng(10.78883916, 106.70362025);
                var mapOptions = {
                    zoom: 15,
                    center: myLatlng
                };
                var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map
                });
            };
            google.maps.event.addDomListener(window, 'load', initBJD);
        };

    //document.ready
    $(function() {
        init();
    });

})(jQuery);
