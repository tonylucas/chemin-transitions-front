app.controller('StructuresShowController', function ($scope, $stateParams, Organisations, appConfig, authService) {
    $scope.domain = appConfig.domain();
    
    Organisations.getOrganization($stateParams.id).then(function (data) {
        console.log(data);

    Organisations.getTechonmapDatas().then(function (techonmapdata) {

        authService.getGeocode(data).then(function (response){
            $scope.address = response[0].formatted_address;
        });
        var allData = _.union(data,techonmapdata);
        $scope.org = allData;
    });        
    });
});