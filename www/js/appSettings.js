/**
 * Created by bogdan on 10.03.2015.
 */


angular.module('RapidSettings', ['openfb'])
  .factory('appSettings', function(OpenFB, $location) {

    //var placesToMarkers = function (points) {
    //
    //  return points.map(function (ap) {
    //
    //    return {
    //      layer: 'MyPlaces',
    //      lat: ap.place.location.latitude,
    //      lng: ap.place.location.longitude,
    //      message: ap.place.name + '-' + moment(ap.created_time).fromNow(),
    //      focus: false,
    //      draggable: false
    //    };
    //  });
    //};

    return {
      fbKey: '907995412612227',
      fbCallbackFile: 'http://localhost:8100/oauthcallback.html',
      fbServerCallbackFile: 'http://rapid.qualitance.com/oauthcallback.html',

      loginPermissions: 'public_profile,email,user_about_me,user_tagged_places,user_photos,user_hometown,user_location,user_about_me',
      userFields: 'about,picture,name,cover,bio,email,hometown,location',

      createMap: function(places) {
       return {
         defaults: {
           tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
           maxZoom: 18,
           zoomControlPosition: 'bottomleft'
         },
         markers: placesToMarkers(places),
         center: {
           lat: 44.4268,
           lng: 26.1025,
           zoom: 11
         },
         events: {
           map: {
             enable: ['moveend', 'popupopen'],
             logic: 'emit'
           },
           marker: {
             enable: [],
             logic: 'emit'
           }
         },
         layers: {
           baselayers: {
             osm: {
               name: 'OpenStreetMap',
               type: 'xyz',
               url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
               layerOptions: {
                 subdomains: ['a', 'b', 'c'],
                 attribution: '© OpenStreetMap contributors',
                 continuousWorld: true
               }
             }
           },
           overlays: {
             MyPlaces: {
               name: "MyPlaces",
               type: "markercluster",
               visible: true,
               "layerOptions": {
                 "chunkedLoading": true,
                 "showCoverageOnHover": false,
                 "removeOutsideVisibleBounds": true
               }
             }
           }
         }
       };
      },

      createCorners: function(places) {
       var upperleft = {}
       var lowerright = {}
      
       angular.forEach(places, function (item) {
         if (!upperleft.lat) {
           upperleft.lat = item.place.location.latitude;
      
         } else if (upperleft.lat > item.place.location.latitude) {
           upperleft.lat = item.place.location.latitude;
         }
      
         if (!upperleft.lng) {
           upperleft.lng = item.place.location.longitude;
      
         } else if (upperleft.lng < item.place.location.longitude) {
           upperleft.lng = item.place.location.longitude;
         }
      
         if (!lowerright.lat) {
           lowerright.lat = item.place.location.latitude;
      
         } else if (lowerright.lat < item.place.location.latitude) {
           lowerright.lat = item.place.location.latitude;
         }
      
         if (!lowerright.lng) {
           lowerright.lng = item.place.location.longitude;
      
         } else if (lowerright.lng > item.place.location.longitude) {
           lowerright.lng = item.place.location.longitude;
         }
       });
      
       return {
         upperLeft: upperleft,
         lowerRight: lowerright
       };
      },

      initFb: function() {
        OpenFB.init(this.fbKey, ($location.absUrl().search('localhost') >=0) ? this.fbCallbackFile : this.fbServerCallbackFile);
      }
    }
  });
