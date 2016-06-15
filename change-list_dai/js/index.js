$(document).ready(function () {
    "use strict";

    var selectData, $states;

    function updateSelects() {
        $('#city_names').attr('disabled', false);
        var cities = $.map(selectData[this.value], function (city) {
            return $("<option />").attr('value',city).text(city);
        });
        $("#city_names").empty().append(cities);
    }

    $.getJSON("js/data.json", function (data) {
        var state;
        selectData = data;
        $states = $("#us_states").on("change", updateSelects);
        for (state in selectData) {
          $("<option />").attr('value',state).text(state).appendTo($states);
        }
        $states.change();
    });
    // $.getJSON("js/data.json", function (data) {
    //   var address = data;
    //   var state;
    //   for(state in address) {
    //     $("<option />").attr('value',state).text(state).appendTo($city);
    //   }
    //   $city = $('#city_names').change(function(){
    //     $district = address[$(this).val()];
    //     $city.change();
    //     $('#us_states').each(function(){
    //       if ( $district.includes( $(this).val() ) ) {
    //       $(this).attr('disabled', false);
    //       } else {
    //       $(this).attr('disabled', true);
    //       }
    //     });
    //   });
    // });
});
