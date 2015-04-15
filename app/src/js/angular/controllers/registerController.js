app.controller('RegisterController', function ($scope, authService, userData, $state, $stateParams) {
    $scope.type = false;
    $scope.autocomplete = {};
    $scope.invitation = authService.invitation;
    $scope.user = authService.user;
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
    $scope.typeChange = function (user) {
        if (user.type === "Organization") {
            return $scope.type = false;
        } else {
            return $scope.type = true;
        }
    };
});