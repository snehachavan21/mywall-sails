/**
 * Created by kaustubh on 11/5/16.
 */
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
