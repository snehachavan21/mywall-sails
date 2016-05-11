app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {

  $routeProvider.when('/tags', {
    templateUrl: 'htmls/tag/tag-list.html',
    controller: 'TagController',
    resolve: {
      data: function (TagFactory) {
        return {
          tagList: TagFactory.getAllTags()
        }
      }
    }
  });

  $routeProvider.when('/tag-add', {
    templateUrl: 'htmls/tag/tag-add.html',
    controller: 'TagController',
    resolve: {
      data: function (TagFactory) {
        TagFactory.getAllTags();
      }
    }
  });

  $routeProvider.otherwise('/tags');

}]);


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
        alert(message);
      });
    }
  });
}]);

app.factory('TagFactory', ['$rootScope', '$http', function ($rootScope, $http) {
  var tagFact = {};

  tagFact.getAllTags = function () {
    return $http.get('api/get-all-tags');
  };

  tagFact.saveNewTag = function (tagObj) {
    $http.defaults.headers.post['X-CSRF-Token'] = document.getElementsByName('_csrf')[0].value;
    return $http({
      headers: {
        'Content-Type': 'application/json'
      },
      url: '/api/save-new-tag',
      method: "POST",
      data: tagObj
    })
  };

  return tagFact;
}]);