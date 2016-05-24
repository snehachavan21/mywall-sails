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
    $routeProvider.when('/change-password', {
      templateUrl: 'htmls/user/change-password.html',
      controller: 'UserController',
      resolve: {
        data: function (UserFactory) {
          UserFactory.getUsers();
        }
      }
    });

    $routeProvider.otherwise('/users');

  }
]);


app.directive('pwCheck', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val() === $(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  }
}]);
