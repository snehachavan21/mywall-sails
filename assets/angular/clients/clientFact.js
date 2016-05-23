/**
 * Created by kaustubh on 11/5/16.
 */
app.factory('ClientFactory', ['$rootScope', '$http', function ($rootScope, $http) {
  var clientFact = {};

  clientFact.getAllClients = function () {
    return $http.get('api/get-all-clients');
  };

  clientFact.getClient = function (clientId) {
    $http.defaults.headers.post['X-CSRF-Token'] = document.getElementsByName('_csrf')[0].value;
    return $http({
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/api/get-client',
      method: "POST",
      data:clientId
    })
  };

  clientFact.saveNewClient = function (clientObj) {
    $http.defaults.headers.post['X-CSRF-Token'] = document.getElementsByName('_csrf')[0].value;
    return $http({
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/api/save-new-client',
      method: "POST",
      data: clientObj
    })
  };

  return clientFact;
}]);
