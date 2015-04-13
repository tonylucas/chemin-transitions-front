app.controller('RegisterController', function($scope, $modalInstance, authService, userData) {
  $scope.type = false;
  $scope.autocomplete = {};
  $scope.cancel = function() {
    return authService.hideRegister();
  };
  $scope.register = function(registerForm, user) {
    authService.setUserCoordinates(user, $scope.autocomplete);
    if (!registerForm.$invalid) {
      return userData.create(user).then(function(result) {
        return authService.hideRegister();
      }, function(data) {
        return user.error = "email Already use";
      });
    }
  };
  return $scope.typeChange = function(user) {
    if (user.type === "Organization") {
      return $scope.type = false;
    } else {
      return $scope.type = true;
    }
  };
});
