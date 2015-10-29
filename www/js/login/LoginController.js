/**
 * Created by oxybogdan on 28/10/15.
 */

angular.module('starter.controllers').controller('LoginController', function ($scope, OpenFB, $rootScope, $state, appSettings) {
  $scope.init = function () {

  };

  $scope.login = function () {
    OpenFB.login(appSettings.loginPermissions).then(
      function () {
        OpenFB.get('/me', {fields: appSettings.userFields})
          .success(function (user) {
            console.log(user);
            $rootScope.user = user;
            $state.go("app");
          });
      },
      function () {
        console.log("LOGIN ERROR");
      }
    )
  };

  $scope.init();
});
