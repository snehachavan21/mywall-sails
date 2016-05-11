/**
 * Created by kaustubh on 11/5/16.
 */
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
