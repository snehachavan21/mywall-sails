app.controller('UserController', ['$scope', '$timeout', 'data', 'UserFactory',
  function($scope, $timeout, data, UserFactory) {

    /**
     * Getting the list of users through resolve.
     */
    if (data && data.userList != undefined) {
      data.userList.success(function(data) {
        $scope.users = data;
      });
    }

    io.socket.on('user-updated', function gotHelloMessage(data) {
      $scope.$broadcast('userUpdated', data);
    });

    $scope.$on('userUpdated', function(event, data) {
      angular.forEach($scope.users, function(value, key) {
        if (value.id == data.userId) {
          $scope.users[key] = data.user;
        }
        $scope.$apply();
      });
    });

    angular.extend($scope, {
      newUser: {}
    });

    angular.extend($scope, {
      saveUser: function(newUserForm) {
        console.log($scope.newUser);
        UserFactory.saveUser($scope.newUser).success(function(response) {
          console.log(response);
          $scope.newUser = {};
        }).error(function(message, code, data) {
          alert(message);
        });
      }
    });
  }
]);
