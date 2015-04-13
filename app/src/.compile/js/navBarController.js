app.controller('NavBarController', function($scope, $modal, authService, $state) {
  $(document).foundation();
  $scope.openLogin = function() {
    return authService.showLogin();
  };
  $scope.openRegister = function() {
    return authService.showRegister();
  };
  return $scope.logout = function() {
    console.log("go");
    authService.destroySession();
    return $state.go('index').then(function() {
      return $state.reload();
    });
  };
});
