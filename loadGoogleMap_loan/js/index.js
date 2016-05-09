;(function(){


var Index = $.index = (function(){
  
  var select_html = "";
  var gmarkers = [];
  var map = null;


  function createMarker(latlng, lable, html) {
    var contentString = html;
    var image = '/loadGoogleMap/img/copy.jpg';
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
    icon: image,
    zIndex: Math.round(latlng.lat()*-100000)<<5
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(contentString); 
      infowindow.open(map,marker);
    });

  gmarkers.push(marker);
  return marker; 

  }

  function handleSelected(opt) {
    var i = opt.selectedIndex - 1; 
    if (i > -1) {
      google.maps.event.trigger(gmarkers[i],"click");
    } else {
      infowindow.close();
    }
  }

  function myclick(i) {
    google.maps.event.trigger(gmarkers[i],"click");
  }


  function initialize() {
  // create the map
  var myOptions = {
    zoom: 13,
    center: new google.maps.LatLng(10.928508, 108.291113),
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map"),
                                myOptions);
 
  google.maps.event.addListener(map, 'click', function() {
    infowindow.close();
  });

  // Read the data from 100.xml
  downloadUrl("/loadGoogleMap/store.xml", function(doc) {
    var xmlDoc = xmlParse(doc);
    var markers = xmlDoc.documentElement.getElementsByTagName("marker");

    // ==== first part of the select box ===
    select_html = '';
    // =====================================

    for (var i = 0; i < markers.length; i++) {
    // obtain the attribues of each marker
    var lat = parseFloat(markers[i].getAttribute("lat"));
    var lng = parseFloat(markers[i].getAttribute("lng"));
    var point = new google.maps.LatLng(lat,lng);
    var html = markers[i].getAttribute("html");
    var label = markers[i].getAttribute("label");
          // create the marker
    var marker = createMarker(point,label,html);
    }
  });
}
var infowindow = new google.maps.InfoWindow(
  { 
    size: new google.maps.Size(150,50)
  });
return {
    init:initialize
  }
    
})();
  $(Index.init);

})(jQuery);