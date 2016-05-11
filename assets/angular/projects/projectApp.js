app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/project', {
      templateUrl: 'htmls/project/project-list.html',
      controller: 'ProjectController',
      resolve: {
        data: function(ProjectFactory) {
          return {
            projectList: ProjectFactory.getProjects()
          }
        }
      }
    });

    $routeProvider.when('/project-add', {
      templateUrl: 'htmls/project/project-add.html',
      controller: 'ProjectController',
      resolve: {
        data: function(ProjectFactory, ClientFactory) {
          return {
            clientList: ClientFactory.getAllClients()
          }
        }
      }
    });

    $routeProvider.otherwise('/project');

  }
]);
