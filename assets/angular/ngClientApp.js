app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {

  $routeProvider.when('/clients', {
    templateUrl: 'htmls/client/client-list.html',
    controller: 'ClientController',
    resolve: {
      data: function (ClientFactory) {
        return {
          clientList: ClientFactory.getAllClients()
        }
      }
    }
  });

  $routeProvider.when('/client-add', {
    templateUrl: 'htmls/client/client-add.html',
    controller: 'ClientController',
    resolve: {
      data: function (ClientFactory) {
        ClientFactory.getAllClients();
      }
    }
  });

  $routeProvider.otherwise('/clients');

}]);


app.controller('ClientController',['$log','$scope','$location','data', 'ClientFactory',function($log,$scope,$location,data,ClientFactory){
  if (data && data.clientList != undefined) {
    data.clientList.success(function (data) {
      $scope.clients = data;
    });
  }

  io.socket.on('client-created',function(obj){
    if(obj){
      $scope.$broadcast('clientCreated', obj);
    }
  });

  $scope.$on('clientCreated',function(event,obj){
    $scope.clients.push(obj.client);
    $scope.$apply();
  });

  angular.extend($scope, {
    newClient: {},
    clients:[]
  });

  angular.extend($scope, {
    saveClient: function (newClientForm) {
      ClientFactory.saveNewClient($scope.newClient).success(function (response) {
        $scope.newClient = {};
        $location.path("/clients");
      }).error(function (message, code, data) {
        alert(message);
      });
    }
  });
}]);

app.factory('ClientFactory', ['$rootScope', '$http', function ($rootScope, $http) {
  var clientFact = {};

  clientFact.getAllClients = function () {
    return $http.get('api/get-all-clients');
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
