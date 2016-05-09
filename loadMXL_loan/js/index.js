;(function(){
  
  var select_html = "";
  var gmarkers = [];

  // read the date from xml
  loadXML = function(){
    downloadUrl("/loadMXL/store.xml", function(doc){
      var xmlDoc = xmlParse(doc);
      var markers = xmlDoc.documentElement.getElementsByTagName("marker");

      // ==== first part of the select box ===
      select_html = '';
      // =====================================

      for (var i = 0; i < markers.length; i++ ) {

        // obtain the attribues of each marker
        var lat = parseFloat(markers[i].getAttribute("lat"));
        var lng = parseFloat(markers[i].getAttribute("lng"));
        var html = markers[i].getAttribute("html");
        var label = markers[i].getAttribute("label");
        var infor = markers[i].getAttribute("infor");

        select_html += '<li>' + label + '<\/a>'+ infor +'<\/a>' + html +'</li>'
      }
      // ===== final part of the select box =====
      select_html += '';
      document.getElementById("mapLocation").innerHTML = select_html;
    });
  };
  $(function(){
    loadXML();
  });

})(jQuery);