var _geolocationWithMaker=
    function(marker,callback){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          GMAP.panTo(pos);
          GMAP.setZoom(11);
          
          marker.setPosition(pos);
          marker.setMap(GMAP);
          
          callback && callback(position);

        }, function() {
          //
        });
      }
    }


$().ready(function() {
  var geocoder = new google.maps.Geocoder();

});
