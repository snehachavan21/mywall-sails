var app = angular.module('app', ['ngRoute','oi.select']);

/*Code taken from https://gist.github.com/angelix/11355094*/
app.factory('csrfReqInterceptor', function($q, $injector) {
  var _csrfToken = false;
  return {
    request: function(config) {
      var csrfTokenUrl = '/csrfToken';
      if (config.url == csrfTokenUrl || config.method == "GET") {
        return config;
      }
      // sailsjs hasn't time limit for csrf token, so it is safe to cache this
      // remove this to request a new token
      if (_csrfToken) {
        config.data._csrf = _csrfToken;
        return config;
      }

      var deferred = $q.defer();
      var $http = $injector.get('$http');
      $http.get(csrfTokenUrl).success(function(response, status, headers) {
        if (response._csrf) {
          _csrfToken = response._csrf;
          config.data._csrf = _csrfToken;
        }
        deferred.resolve(config);
      }).error(function(response, status, headers) {
        deferred.reject(response);
      });

      return deferred.promise;
    }
  }
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('csrfReqInterceptor');
});
