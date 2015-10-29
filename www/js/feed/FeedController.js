/**
 * Created by oxybogdan on 28/10/15.
 */

angular.module('starter.controllers')
  .controller('FeedController', ['$scope', 'OpenFB',
    function($scope, OpenFB) {
      $scope.init = function() {
        console.log("IN FEED");

        $scope.data = {};

        OpenFB.get("/me/likes", {fields: 'profile_type,id,name,link,username,category,location'})
          .success(function(data) {
            $scope.data.feed = data;
            console.log(data);
          });
      };

      $scope.init();
    }
  ]);
