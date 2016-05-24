/**
 * Created by kaustubh on 11/5/16.
 */
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
