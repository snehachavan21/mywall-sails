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
          console.log(message);
      });
    }
  });
}]);