app.controller('StructuresShowController', function ($scope, $stateParams, Organisations, appConfig, authService) {
    $scope.domain = appConfig.domain();
    Organisations.getOrganisation($stateParams.id).then(function (data) {
        console.log(data);
        $scope.org = data; 
    }, function(err) {
        Organisations.getTechonmapDatas().then(function (techonmapdata) {
        var currentStructure = _.findWhere(techonmapdata, {id: $stateParams.id});
        $scope.org = currentStructure;
    });
    });
});