/**
 * Created by ovidiu on 29/10/15.
 */
angular.module('ChatModule')
    .controller('ChatController', function ($rootScope, $scope, $ionicPopup, $ionicScrollDelegate, chatservice) {

        console.log('ChatModule loaded');

        $scope.data = {
            messages: []
        };

        var self = $scope;

        $scope.sendMessage = function (message) {
            chatservice.send(message);
            $scope.message = "";
        };

        if($scope.startPopup) return;
        $scope.startPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.username">',
            title: 'Enter your username',
            subTitle: 'Please use a normal name',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Enter chat room</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.data.username) {
                            e.preventDefault();
                        } else {
                            return $scope.data.username;
                        }
                    }
                }
            ]
        });

        $scope.startPopup.then(function (res) {
            chatservice.setUsername(res);

            console.log(res);
            $rootScope.$on('onMessageReceived', function(event, message) {

                $scope.$applyAsync(function() {
                    message.datetimeobj = new Date(message.datetime);
                    $scope.data.messages.push(message);
                });

                $ionicScrollDelegate.$getByHandle('chatScrollHandler').scrollBottom(true);
                console.log(message);
            });
            chatservice.start();
        });

    });