/**
 * Created by kaustubh on 11/5/16.
 */
app.controller('TimeEntriesController',['$log','$scope','$location','data', 'TimeEntriesFactory', 'ClientFactory',function($log,$scope,$location,data,TimeEntriesFactory,ClientFactory){
  if (data && data.timeEntriesList != undefined){
    data.timeEntriesList.success(function (data) {
      $scope.timeEntries = data;
    });
  }

  if (data && data.tagsList != undefined){
    data.tagsList.success(function (data) {
      $scope.tags = data;
    });
  }

  if (data && data.projectsList != undefined){
    data.projectsList.success(function (data) {
      $scope.projects = data;
    });
  }

  io.socket.on('time-entry-created',function(obj){
    if(obj){
      $scope.$broadcast('timeEntryCreated', obj);
    }
  });

  $scope.$on('timeEntryCreated',function(event,obj){
    console.log(obj);
    console.log(obj.time_entry);
    $scope.timeEntries.push(obj.time_entry);
    $scope.$apply();
  });

  angular.extend($scope, {
    newTimeEntry: {},
    timeEntries:[],
    tags:[]
  });

  angular.extend($scope, {
    saveTimeEntry: function (newTimeEntryForm) {
      console.log($scope.newTimeEntry.tags);
      ClientFactory.getClient($scope.newTimeEntry.project).success(function (response) {
        $scope.newTimeEntry.client_name = response[0].client_name;
          TimeEntriesFactory.saveNewTimeEntry($scope.newTimeEntry).success(function (response) {
              $scope.newTimeEntry= {};
              $location.path("/time-entries");
          }).error(function (message, code, data) {
              console.log(message);
          });
      }).error(function (message, code, data) {
          console.log(message);
      });
    }
  });
}]);