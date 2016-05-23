/**
 * Created by kaustubh on 11/5/16.
 */
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