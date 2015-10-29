/**
 * Created by oxybogdan on 29/10/15.
 */

angular.module('starter.controllers')
  .controller('ProfileController', ['$scope',
    function ($scope) {
      $scope.init = function () {

      };

      $scope.getUserBackground = function() {
        if ($scope.user && $scope.user.cover) {
          return {
            "background-image": "url("+$scope.user.cover.source+")",
            "background-size": "cover"
          }
        }
      };

      $scope.init();
    }
  ]);
