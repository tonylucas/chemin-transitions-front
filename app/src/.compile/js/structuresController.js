app.controller('StructuresController', function($scope, $stateParams, appConfig, mapService, Organisations, $timeout) {
  $scope.movies = [];
  $scope.placeholder = "Find Structures";
  $timeout(function() {
    return mapService.resetFilter();
  });
  Organisations.getOrganizations().then(function(organizations) {
    var i, len, org, results;
    results = [];
    for (i = 0, len = organizations.length; i < len; i++) {
      org = organizations[i];
      results.push($scope.movies.push(org.properties.name));
    }
    return results;
  });
  return $scope.filter = function(data) {
    mapService.myLayer.setFilter(function(t) {
      if (data === "") {
        return true;
      }
      return t.properties.name === data;
    });
    
  };
});
