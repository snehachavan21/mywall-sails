app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/project', {
      templateUrl: 'htmls/project/project-list.html',
      controller: 'ProjectController',
      resolve: {
        data: function (ProjectFactory) {
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
        data: function (ProjectFactory) {
          ProjectFactory.getProjects();
        }
      }
    });

    $routeProvider.otherwise('/project');

  }]);

app.factory('ProjectFactory', ['$rootScope', '$http',
  function ($rootScope, $http) {
    var projectFact = {};

    projectFact.getProjects = function () {
      return $http.get('api/get-all-projects');
    };

    projectFact.saveProject = function (projectObj) {
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
  }]);

app.controller('ProjectController', ['$scope', 'data', 'ProjectFactory',
  function ($scope, data, ProjectFactory) {
    /**
     * Getting the list of projects through resolve.
     */
    if (data && data.projectList != undefined) {
      data.projectList.success(function (data) {
        $scope.projects = data;
      });
    }

    angular.extend($scope, {
      newProject: {}
    });

    angular.extend($scope, {
      saveProject: function () {
        console.log($scope.newProject);
        ProjectFactory.saveProject($scope.newProject).success(function (response) {
          console.log('saved project', response);
          $scope.newProject = {};
        }).error(function (message, code, data) {
          alert(message);
        });
      }
    });
  }]);
