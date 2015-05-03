app.controller('HomeController', function ($scope, authService, organisations, Organisations, userData, skillData, $modal, appConfig, mapService, $timeout, $stateParams, $filter) {

    $scope.organisations = organisations;

    $timeout(function () {
        mapService.resetFilter();
    });

    $scope.open = function (size) {
        authService.showLogin();
    };

    $scope.mapView = {
        active: true,
        template: 'partials/map.html'
    };

    $scope.listView = {
        active: false,
        template: 'partials/list.html'
    };

    $scope.closeModal = function () {
        this.modalInstance.dismiss('cancel');
    };

    $scope.showModal = function (e) {
        var modalInstance;
        $scope.selected = e.target.feature.properties;
        modalInstance = $modal.open({
            templateUrl: 'partials/modal.html',
            windowClass: 'large',
            scope: $scope
        });
    };

    $scope.$on('toggleViewMode', function (event) {
        $scope.listView.active = !$scope.listView.active;
        $scope.mapView.active = !$scope.mapView.active;
    });

    $scope.filterSkills = function (skill) {
        mapService.filterMarkers(skill.name);
//        $scope.orgs = [];
        mapService.fitMap();
    }

    $scope.$on('updateStructuresList', function (event, filteredOrgs) {
        $scope.organisations = filteredOrgs;
    });

});