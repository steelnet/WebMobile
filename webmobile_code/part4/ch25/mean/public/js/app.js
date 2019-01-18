'use strict';

/* App Module */

var helloApp = angular.module('helloApp', [
    'ngRoute',     
    'helloControllers'   
]);
helloApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
                when('/user', {
                    templateUrl: 'partials/login.html',
                    controller: 'userCtrl'
                }).when('/welcome', {
                    templateUrl: 'partials/welcome.html',
                    controller: 'WelcomeCtrl'
                });

        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);

