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
        data: function(ProjectFactory) {
          ProjectFactory.getProjects();
        }
      }
    });

    $routeProvider.otherwise('/project');

  }
]);

app.factory('ProjectFactory', ['$rootScope', '$http',
  function($rootScope, $http) {
    var projectFact = {};
    var projects = {};

    projectFact.getProjects = function() {
      return $http.get('api/get-all-projects');
    };

    projectFact.saveProject = function(projectObj) {
      console.log('Inside fact');
      $http.defaults.headers.post['X-CSRF-Token'] = document.getElementsByName('_csrf')[0].value;
      return $http({
        headers: {
          'Content-Type': 'application/json'
        },
        url: '/api/save-new-project',
        method: "POST",
        data: projectObj
      });
    };

    return projectFact;
  }
]);

app.controller('ProjectController', ['$scope', 'data', 'ProjectFactory', '$location', '$log',
  function($scope, data, ProjectFactory, $location, $log) {
    /**
     * Getting the list of projects through resolve.
     */
    if (data && data.projectList != undefined) {
      data.projectList.success(function(data) {
        $log.debug('project list', data);
        $scope.projects = data;
      });
    }

    io.socket.on('project-added', function gotHelloMessage(data) {
      $scope.$broadcast('projectAdded', data);
    });

    $scope.$on('projectAdded', function(event, data) {
      $scope.projects.push(data.project);
      $scope.$apply(); /*Need to check why apply is required*/
    });

    angular.extend($scope, {
      newProject: {},
      projects: []
    });

    angular.extend($scope, {
      saveProject: function() {
        ProjectFactory.saveProject($scope.newProject).success(function(response) {
          $scope.newProject = {};
          $location.path('/');
        }).error(function(message, code, data) {
          alert(message);
        });
      }
    });
  }
]);
