app.controller('StructuresShowController', function ($scope, $stateParams, Organisations) {
    Organisations.getOrganization($stateParams.id).then(function (data) {
        $scope.org = data;
    });
});