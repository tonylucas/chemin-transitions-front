app.controller('NavBarController', function ($scope, $modal, authService, $state, $rootScope) {
    $(document).foundation();
    $scope.openLogin = function () {
        authService.showLogin();
    };
    $scope.openRegister = function () {
        authService.showRegister();
    };
    $scope.logout = function () {
        authService.destroySession();
        $state.go('index').then(function () {
            $state.reload();
        });
    };

    $scope.toggleViewMode = function ($event) {
        if (!$($event.currentTarget).hasClass('active')) {
            $('.top-bar-section button').removeClass('active');
            $($event.currentTarget).addClass('active');
            $rootScope.$broadcast('toggleViewMode');
        }
    }
});