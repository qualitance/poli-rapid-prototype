/**
 * Created by cristian on 29/10/15.
 */


angular.module('MapModule', [])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app.map', {
        url: '/map',
        views: {
          "tab-map": {
            controller: 'MapController',
            templateUrl: 'js/map/templates/map.html'
          }
        }
      })
    ;
  });