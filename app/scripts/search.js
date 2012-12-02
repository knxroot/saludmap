// Copyright 2011 The GeoSearch Authors.
// Licensed under the MIT License, see MIT-LICENSE.txt

/**
 * @fileoverview Funcionalidades específicas de pantalla new Local
 *
 * @author Gustavo Lacoste <gustavo.lacoste@tecogroup.ca>
 * @version 0.1 as of 28 Oct 2011
 * @license Copyright 2011 Lacosox.org. All rights reserved.
 * @supported IE6+, WebKit 525+, Firefox 2+.
 */


var Search = function(w, d, data, undefined) {
  var lat = '-33.44';
  var lng = '-70.63';
  var bound = new google.maps.LatLngBounds(
    new google.maps.LatLng('-34.0106750','-71.5744751'),
    new google.maps.LatLng('-32.8185673','-69.5255249'));

  var data=data.resultados;
  var markers = [];
  var GMAP="";
  var geocoder=GeoSearch.getGeocoder();
  
  var _makeLocalMarkerIcon=function(local){

    var marker = new google.maps.Marker({ 
          map:  GMAP,
          draggable: false,
          icon: new google.maps.MarkerImage(
                    GeoSearch.getUrlRoot()+'/images/icons/local_maker_show.png', 
                    new google.maps.Size(34, 34), new google.maps.Point(0, 0)),
          position:  new google.maps.LatLng(local.lat, local.lng),
          title: local.nombre_local
    });    

    return marker;
  }
  
  
  var _updateLiveSearch = function(){
        bound=GMAP.getBounds();
        var c=GMAP.getCenter();
        lat=c.lat();
        lng=c.lng();
        
      var sw = bound.getSouthWest();
      var ne = bound.getNorthEast();
      var bbox='bbox='+sw.lng()+','+sw.lat()+','+ne.lng()+','+ne.lat();
      var filters='';
      $('input[id^="filterIn"]:checkbox:checked').each( function(i,e) {
        filters+=$(e).attr('id')+'=YES&';
      });
      filters=filters.substring(0, filters.length-1);
      
      $('#info').html(filters+'&'+bbox);   
    }  


    var _initEventListener= function(){
          google.maps.event.addListener(GMAP, 'idle', function() {
            if(document.getElementById("live_search").checked){_updateLiveSearch();}
          })
          $('input[id^="filterIn"]:checkbox').change(function() {
              _updateLiveSearch();
          });
          $('#live_search').change(function() {
              if(this.checked){_updateLiveSearch();}
          });          
    }



  return {

    initMapWithResults: function (){
        
         var gmapSearchOptions = {
                mapTypeId: google.maps.MapTypeId.HYBRID,
                zoom: 9,
                center: new google.maps.LatLng(lat,lng)
            };     
          GeoSearch.setGMAP(document.getElementById('map_canvas'), gmapSearchOptions);

          GMAP=GeoSearch.getGMAP();
          GMAP.fitBounds(bound);
          
          
          $.each(data, function(i, item) {
               var local=_makeLocalMarkerIcon(data[i]);
               markers.push(local);
               console.log("assasdasd");
          });

          
      },   

    getFind_loc: function(emapid, mapopt){
        return find_loc;
    },
    initEventListener: function(){
      _initEventListener();
    }

  };
}

