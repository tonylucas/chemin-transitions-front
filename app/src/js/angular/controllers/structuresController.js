app.controller('StructuresController', function ($scope, $stateParams, appConfig, mapService, Organisations, $timeout) {

    $scope.searchResults = [];
    $scope.placeholder = "Find Structures";

    $timeout(function () {
        mapService.resetFilter();
    });

    Organisations.getOrganizations().then(function (organizations) {
        var org, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = organizations.length; _i < _len; _i++) {
            org = organizations[_i];
            _results.push($scope.searchResults.push(org.properties.name));
        }
        return _results;
    });

    $scope.filter = function (data) {
        mapService.myLayer.setFilter(function (t) {
            if (data === "") {
                return true;
            }
            return t.properties.name === data;
        });

    };
});