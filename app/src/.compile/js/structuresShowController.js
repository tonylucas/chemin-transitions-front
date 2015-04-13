app.controller('StructuresShowController', function($scope, $stateParams, Organisations) {
  return Organisations.getOrganization($stateParams.id).then(function(data) {
    return $scope.org = data;
  });
});
