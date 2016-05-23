app.controller('UserController', ['$scope', '$timeout', 'data', 'UserFactory',
    function ($scope, $timeout, data, UserFactory) {

        /**
         * Getting the list of users through resolve.
         */
        if (data && data.userList != undefined) {
            data.userList.success(function (data) {
                $scope.users = data;
            });
        }

        io.socket.on('user-updated', function gotHelloMessage(data) {
            $scope.$broadcast('userUpdated', data);
        });

        $scope.$on('userUpdated', function (event, data) {
            angular.forEach($scope.users, function (value, key) {
                if (value.id == data.userId) {
                    $scope.users[key] = data.user;
                }
                $scope.$apply();
            });
        });

        angular.extend($scope, {
            newUser: {},
            currentUser: {}
        });

        angular.extend($scope, {
            saveUser: function (newUserForm) {
                console.log($scope.newUser);
                UserFactory.saveUser($scope.newUser).success(function (response) {
                    console.log(response);
                    $scope.newUser = {};
                }).error(function (message, code, data) {
                    alert(message);
                });
            },
            saveChangePassword: function (changePasswordForm) {
                if (changePasswordForm) {
                    UserFactory.saveChangePassword($scope.currentUser).success(function (response) {

                        if (response.hasOwnProperty('error')) {
                            $scope.errors = response['error'];
                        } else {
                            $scope.errors = ''
                        }

                        if (!response.hasOwnProperty('error')) {
                            $scope.success = 'Password changes successfully.';
                            $scope.currentUser = {};
                            $scope.changePasswordForm.submitted = false;
                        } else {
                            $scope.success = '';
                            $scope.changePasswordForm.submitted = true;
                        }
                    }).error(function (message, code, data) {
                        alert(message);
                    });
                } else {
                    $scope.success = '';
                    $scope.errors = '';
                }
            }
        });
    }
]);
