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

    if (data && data.clientList != undefined) {
      console.log('clientList');
      data.clientList.success(function(data) {
        $log.debug('client list', data);
        $scope.clients = data;
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
      projects: [],
      clients: []
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
