/**
 * Created by oxybogdan on 29/10/15.
 */

angular.module('starter.controllers')
  .controller('GalleryController', ['$scope', 'OpenFB',
    function($scope, OpenFB) {
      console.log('GalleryController loaded');

      $scope.init = function() {

        OpenFB.get("/me/photos", {fields: 'id,name,picture'})
          .success(function(data) {

            $scope.pictures = data.data.map(function(picture) {
              return {
                id: picture.id,
                sub: picture.name,
                src: picture.picture
              }
            });
          });

      };

      $scope.init();
    }
  ]);
