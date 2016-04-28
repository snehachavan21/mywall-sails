var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'htmls/user/user-list.html',
      controller: 'UserController'
    });
  }]);

app.factory('UserFactory', ['$rootScope', function ($rootScope) {
  var userFact = {};

  userFact.getUsers = function () {
    return io.socket.get('/user', function gotResponse(body, response) {
      return response.body;
    });
  };

  return userFact;
}]);

app.controller('UserController', ['$scope', '$timeout',
  function ($scope, $timeout) {
    io.socket.on('user', function gotHelloMessage(data) {
      console.log('User alert!', data);
      $scope.$broadcast('userAdded', data.data);
    });

    io.socket.get('/user', function gotResponse(body, response) {
      console.log('Got user list');
      $scope.$broadcast('userChange', response.body);
    });

    $scope.$on('userChange', function (event, data) {
      $timeout(function () {
        $scope.users = data;
      }, 10)
    });

    $scope.$on('userAdded', function (event, data) {
      $timeout(function () {
        console.log('User added ', data);
        $scope.users.push(data);
      }, 10);
    });
  }]);
