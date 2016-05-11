app.factory('ProjectFactory', ['$rootScope', '$http',
  function($rootScope, $http) {
    var projectFact = {};
    var projects = {};

    projectFact.getProjects = function() {
      return $http.get('api/get-all-projects');
    };

    projectFact.saveProject = function(projectObj) {
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
