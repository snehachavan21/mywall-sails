app.config(['$routeProvider', '$locationProvider',

  function ($routeProvider, $locationProvider) {

    $routeProvider.when('/users', {
      templateUrl: 'htmls/user/user-list.html',
      controller: 'UserController',
      resolve: {
        data: function (UserFactory) {
          return {
            userList: UserFactory.getUsers()
          }
        }
      }
    });

    $routeProvider.when('/user-add', {
      templateUrl: 'htmls/user/user-add.html',
      controller: 'UserController',
      resolve: {
        data: function (UserFactory) {
          UserFactory.getUsers();
        }
      }
    });

    $routeProvider.otherwise('/users');

  }]);

app.factory('UserFactory', ['$rootScope', '$http', function ($rootScope, $http) {
  var userFact = {};

  userFact.getUsers = function () {
    // return io.socket.get('/user', function gotResponse(body, response) {
    //   return response.body;
    // });
    return $http.get('api/get-all-users');
  };

  userFact.saveUser = function (userObj) {
    $http.defaults.headers.post['X-CSRF-Token'] = document.getElementsByName('_csrf')[0].value;
    return $http({
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/api/save-new-user',
      method: "POST",
      data: userObj
    });
  };

  return userFact;
}]);

app.controller('UserController', ['$scope', '$timeout', 'data', 'UserFactory',
  function ($scope, $timeout, data, UserFactory) {

    /**
     * Getting the list of users through resolve.
     */
    if (data && data.userList != undefined) {
      data.userList.success(function (data) {
        $scope.users = data;
      });
    }

    angular.extend($scope, {
      newUser: {}
    });

    angular.extend($scope, {
      saveUser: function (newUserForm) {
        console.log($scope.newUser);
        UserFactory.saveUser($scope.newUser).success(function (response) {
          console.log(response);
          $scope.newUser = {};
        }).error(function (message, code, data) {
          alert(message);
        });
      }
    });
  }]);
