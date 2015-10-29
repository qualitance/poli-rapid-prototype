angular.module('starter.controllers', [])

  .controller('AppController', function ($scope, $rootScope, $state) {
    $scope.init = function () {

      $scope.$on("$stateChangeSuccess", function (ev, newState) {
        console.log(newState);
        if ($state.is("app"))
          $state.go("app.gallery");
      });

    };

    $scope.init();
  })


  .controller("LogoutController", function($rootScope, $state) {
    $rootScope.user = null;
    window.sessionStorage.fbtoken = undefined;
    $state.go("login");
  })

;
