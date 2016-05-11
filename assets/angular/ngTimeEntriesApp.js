/**
 * Created by kaustubh on 10/5/16.
 */
app.config(['$routeProvider', '$locationProvider',
function ($routeProvider, $locationProvider) {

  $routeProvider.when('/time-entries', {
    templateUrl: 'htmls/time_entries/time-entries-list.html',
    controller: 'TimeEntriesController',
    resolve: {
      data: function (TimeEntriesFactory) {
        return {
          timeEntriesList: TimeEntriesFactory.getAllTimeEntries()
        }
      }
    }
  });

  $routeProvider.when('/time-entry-add', {
    templateUrl: 'htmls/time_entries/time-entry-add.html',
    controller: 'TimeEntriesController',
    resolve: {
      data: function (TagFactory) {
        return {
          tagList: TagFactory.getAllTags()
        }
      }
    }
  });

  $routeProvider.otherwise('/time-entries');

}]);

app.controller('TimeEntriesController',['$log','$scope','$location','data', 'TimeEntriesFactory',function($log,$scope,$location,data,TimeEntriesFactory){
  if (data) {
    if(data.timeEntriesList != undefined){
      data.timeEntriesList.success(function (data) {
        $scope.timeEntries = data;
      });
    }
    if(data.tagsList != undefined){
      data.tagsList.success(function (data) {
        $scope.tags = data;
      });
    }
  }

  io.socket.on('time-entry-created',function(obj){
    if(obj){
      $scope.$broadcast('timeEntryCreated', obj);
    }
  });

  $scope.$on('timeEntryCreated',function(event,obj){
    console.log(obj)
    $scope.timeEntries.push(obj.time_entry);
    $scope.$apply();
  });

  $scope.$on('tagCreated',function(event,obj){
    console.log(obj)
    $scope.tags.push(obj.tag);
    $scope.$apply();
  });

  angular.extend($scope, {
    newTimeEntry: {},
    timeEntries:[],
    tags:[]
  });

  angular.extend($scope, {
    saveTimeEntry: function (newTimeEntryForm) {
      TimeEntriesFactory.saveNewTimeEntry($scope.newTimeEntry).success(function (response) {
        $scope.newTimeEntry= {};
        $location.path("/time-entries");
      }).error(function (message, code, data) {
        alert(message);
      });
    }
  });
}]);


app.factory('TimeEntriesFactory', ['$rootScope', '$http', function ($rootScope, $http) {
  var timeEntryFact = {};

  timeEntryFact.getAllTimeEntries = function () {
    return $http.get('api/get-all-time-entries');
  };

  timeEntryFact.getAllTags = function () {
    return $http.get('api/get-all-tags');
  };

  timeEntryFact.saveNewTimeEntry = function (timeEntryObj) {
    $http.defaults.headers.post['X-CSRF-Token'] = document.getElementsByName('_csrf')[0].value;
    return $http({
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/api/save-new-time-entry',
      method: "POST",
      data: timeEntryObj
    })
  };

  return timeEntryFact;
}]);