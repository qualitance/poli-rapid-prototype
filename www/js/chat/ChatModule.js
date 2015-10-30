/**
 * Created by ovidiu on 29/10/15.
 */


angular.module('ChatModule', ['ChatModule.services'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.chat', {
                url: '/chat',
                views: {
                    "tab-chat": {
                        controller: 'ChatController',
                        templateUrl: 'js/chat/templates/chat.html'
                    }
                }
            })
        ;

        // if none of the above states are matched, use this as the fallback
        //$urlRouterProvider.otherwise('/app');

    });
angular.module('ChatModule.services', [])
    .constant('chatconfig', {
        firebaseUrl: "https://rp-chat.firebaseio.com/messages"
    })
    .service('chatservice', function (chatconfig, $rootScope) {

        var _username = "Anonymous"
        var messagesRef = new Firebase(chatconfig.firebaseUrl);

        this.setUsername = function (u) {
            _username = u;
        };

        this.send = function (message) {
            messagesRef.push({name: _username, text: message, datetime: (new Date()).toString()}, function () {
                console.log('Message sent');
            });
        };

        this.start = function () {
            messagesRef.limitToLast(100).on('child_added', function (snapshot) {
                var newMessage = snapshot.val();
                $rootScope.$emit('onMessageReceived', newMessage);
            });
        };
    });

