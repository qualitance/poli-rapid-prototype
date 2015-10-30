// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'RapidSettings', 'ion-gallery', 'ChatModule'])

  .run(function ($ionicPlatform, $state, $rootScope, OpenFB, appSettings) {

    appSettings.initFb();

    $rootScope.$on("$stateChangeStart", function (event, toState) {
      if ((toState.name != 'login' && toState.name != 'logout')
        && window.sessionStorage.fbtoken === 'undefined') {
        event.preventDefault();
        $state.go("login");
      }

      if (!$rootScope.user) {
        OpenFB.get('/me', {fields: appSettings.userFields})
          .success(function (user) {
            $rootScope.user = user;
            console.log(user);
          })
          .error(function () {
            $state.go("login");
          })
        ;
      }
    });

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('login', {
        url: '/login',
        controller: "LoginController",
        templateUrl: 'js/login/login.html'
      })

      .state('logout', {
        url: '/logout',
        controller: "LogoutController"
      })

      .state('app', {
        url: '/app',
        controller: 'AppController',
        templateUrl: 'templates/app.html'
      })

      .state('app.gallery', {
        url: '/gallery',
        views: {
          "tab-gallery": {
            controller: 'GalleryController',
            templateUrl: 'js/gallery/gallery.html'
          }
        }
      })

      .state('app.feed', {
        url: '/feed',
        views: {
          "tab-feed": {
            controller: 'FeedController',
            templateUrl: 'js/feed/feed.html'
          }
        }
      })

      .state('app.profile', {
        url: '/profile',
        views: {
          "tab-profile": {
            controller: 'ProfileController',
            templateUrl: 'js/profile/profile.html'
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app');

  });
