app.controller('RegisterController', function ($scope, $modalInstance, authService, userData, $state) {
    $scope.type = false;
    $scope.autocomplete = {};
    $scope.cancel = function () {
        return authService.hideRegister();
    };
    $scope.register = function (registerForm, user) {
        authService.setUserCoordinates(user, $scope.autocomplete);
        if (!registerForm.$invalid) {
            return userData.create(user).then(function (result) {
            userData.login(user).then(function (user) {
                authService.setSession(user);
                $state.go('index').then(function () {
                    authService.hideRegister();
                    return $state.reload();
                });
            }, function (data) {
                return user.error = data;
            });
            }, function (data) {
                return user.error = "email Already use";
            });
        }
    };
    return $scope.typeChange = function (user) {
        if (user.type === "Organization") {
            return $scope.type = false;
        } else {
            return $scope.type = true;
        }
    };
});