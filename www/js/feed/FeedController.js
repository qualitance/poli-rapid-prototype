/**
 * Created by oxybogdan on 28/10/15.
 */

angular.module('starter.controllers')
  .controller('FeedController', ['$scope',
    function($scope) {
      $scope.init = function() {
        console.log("IN FEED");
      };

      $scope.init();
    }
  ]);
