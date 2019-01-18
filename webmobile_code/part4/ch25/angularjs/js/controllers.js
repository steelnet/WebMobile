'use strict';

/* Controllers */

var helloControllers = angular.module('helloControllers', []);


helloControllers.controller('LoginCtrl', ['$scope', '$location', '$rootScope',
    function LoginCtrl($scope, $location, $rootScope) {
        $scope.user="Joe";
        $scope.password="12345";
        $scope.message = $scope.user+"请修改信息！";
        $scope.changeMsg=function () {
        //$scope.message="你修改用户名为："+$scope.user+",密码："+$scope.password;
        $rootScope.user=$scope.user;
        $rootScope.password=$scope.password;
        $location.path('/welcome')};   
    }]);

helloControllers.controller('WelcomeCtrl', ['$scope', '$location', '$rootScope',
    function WelcomeCtrl($scope, $location, $rootScope) {
        $scope.user=$rootScope.user;
        $scope.password=$rootScope.password;
       //$scope.message = $scope.user+"欢迎光临！你的密码："+$scope.password;
    }]);