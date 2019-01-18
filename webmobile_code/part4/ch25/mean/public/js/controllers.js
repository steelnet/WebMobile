'use strict';
/* Controllers */
var helloControllers = angular.module('helloControllers', []);
helloControllers.controller('userCtrl', ['$scope', '$location', '$http',
    function userCtrl($scope, $location, $http){
        var url = 'http://localhost:8000/user/';
        var user={};
        $scope.login=function(){
            user={'username':$scope.username,
                 'password':$scope.password};
            $http.get(url+$scope.username).then(function(res){
                $scope.message=JSON.stringify(res.data.message);
                },function(err){console.log('err:'+err)});}
        $scope.register=function(){
            user={'username':$scope.username,
                 'password':$scope.password};
            $http.post(url,JSON.stringify(user)).then(function(res){ 
                $scope.message=JSON.stringify(res.data.message);
                },function(err){console.log(err)});};
        $scope.update=function(){
            user={'username':$scope.username,
                 'password':$scope.password};
            $http.put(url,JSON.stringify(user)).then(function(res){
                $scope.message=JSON.stringify(res.data.message);
                },function(err){console.log(err)});}; 
        $scope.remove=function(){
            user={'username':$scope.username,
                 'password':$scope.password};
            $http.delete(url+$scope.username)
                .then(function(res){
                $scope.message=JSON.stringify(res.data.message);
                },function(err){console.log(err)});};
    }]);
helloControllers.controller('WelcomeCtrl', ['$scope', '$location', '$http',
    function WelcomeCtrl($scope, $location, $http) {
       $http({method:'GET',url:'/welcome'}).then(function success(res){
          $scope.user=res.username;
        $scope.password=res.password; 
       });    
    }]);