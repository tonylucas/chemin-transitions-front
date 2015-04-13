app.controller('HomeController', function($scope, authService, organizations, $modal, appConfig, mapService, $timeout) {
  $scope.organizations = organizations;
  $timeout(function() {
    return mapService.resetFilter();
  });
  $scope.open = function(size) {
    return authService.showLogin();
  };
  $scope.mapView = {
    active: true,
    template: 'partials/map.html'
  };
  $scope.listView = {
    active: false,
    template: 'partials/list.html'
  };
  $scope.showMapView = function() {
    $scope.mapView.active = true;
    return $scope.listView.active = false;
  };
  $scope.showListView = function() {
    $scope.listView.active = true;
    return $scope.mapView.active = false;
  };
  $scope.closeModal = function() {
    return this.modalInstance.dismiss('cancel');
  };
  return $scope.showModal = function(e) {
    var modalInstance;
    $scope.selected = e.target.feature.properties;
    return modalInstance = $modal.open({
      templateUrl: 'partials/modal.html',
      windowClass: 'large',
      scope: $scope
    });
  };
});
