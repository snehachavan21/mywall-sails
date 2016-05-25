/**
 * Created by kaustubh on 11/5/16.
 */
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

    $routeProvider.when('/time-entries', {
      templateUrl: 'htmls/time_entries/time-entries-list.html',
      controller: 'TimeEntriesController',
      resolve: {
        data: function(TimeEntriesFactory) {
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
        data: function(TagFactory, ProjectFactory) {
          return {
            tagsList: TagFactory.getAllTags(),
            projectsList: ProjectFactory.getProjects()
          }
        }
      }
    });

    $routeProvider.otherwise('/time-entries');

  }]);
