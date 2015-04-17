app.controller('StructuresShowController', function ($scope, $stateParams, Organisations, appConfig, authService) {
    $scope.domain = appConfig.domain();

    Organisations.getOrganisation($stateParams.id).then(function (data) {
        $scope.org = data;
        authService.getGeocode(data).then(function (response){
            $scope.address = response[0].formatted_address;
        });
        
    });
});