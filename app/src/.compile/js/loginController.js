app.controller('LoginController', function($scope, $modalInstance, authService, userData, $state) {
  $scope.cancel = function() {
    return authService.hideLogin();
  };
  return $scope.login = function(loginForm, user) {
    if (!loginForm.$invalid) {
      return userData.login(user).then(function(user) {
        authService.setSession(user);
        return $state.go('index').then(function() {
          authService.hideLogin();
          return $state.reload();
        });
      }, function(data) {
        return user.error = data;
      });
    }
  };
});
