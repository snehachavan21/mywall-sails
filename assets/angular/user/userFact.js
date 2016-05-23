app.factory('UserFactory', ['$rootScope', '$http', function ($rootScope, $http) {
    var userFact = {};

    userFact.getUsers = function () {
        return $http.get('api/get-all-users');
    };

    userFact.saveUser = function (userObj) {
        $http.defaults.headers.post['X-CSRF-Token'] = document.getElementsByName('_csrf')[0].value;
        return $http({
            headers: {
                'Content-Type': 'application/json'
            },
            url: '/api/save-new-user',
            method: "POST",
            data: userObj
        });
    };

    userFact.saveChangePassword = function (userObj) {
        $http.defaults.headers.post['X-CSRF-Token'] = document.getElementsByName('_csrf')[0].value;
        return $http({
            headers: {
                'Content-Type': 'application/json'
            },
            url: '/api/save-change-password',
            method: "POST",
            data: userObj
        });
    };

    return userFact;
}]);
