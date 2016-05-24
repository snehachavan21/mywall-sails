/**
 * Created by kaustubh on 11/5/16.
 */
app.controller('TagController',['$log','$scope','$location','data', 'TagFactory',function($log,$scope,$location,data,TagFactory){
  if (data && data.tagList != undefined) {
    data.tagList.success(function (data) {
      $scope.tags = data;
    });
  }

  io.socket.on('tag-created',function(obj){
    if(obj){
      $scope.$broadcast('tagCreated', obj);
    }
  });

  $scope.$on('tagCreated',function(event,obj){
    console.log(obj)
    $scope.tags.push(obj.tag);
    $scope.$apply();
  });

  angular.extend($scope, {
    newTag: {},
    tags:[]
  });

  angular.extend($scope, {
    saveTag: function (newTagForm) {
      TagFactory.saveNewTag($scope.newTag).success(function (response) {
        $scope.newTag= {};
        $location.path("/tags");
      }).error(function (message, code, data) {
          console.log(message);
      });
    }
  });
}]);
