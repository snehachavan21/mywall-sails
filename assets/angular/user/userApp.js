app.config(['$routeProvider', '$locationProvider',

  function($routeProvider, $locationProvider) {

    $routeProvider.when('/users', {
      templateUrl: 'htmls/user/user-list.html',
      controller: 'UserController',
      resolve: {
        data: function(UserFactory) {
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
        data: function(UserFactory) {
          UserFactory.getUsers();
        }
      }
    });

    $routeProvider.otherwise('/users');

  }
]);
