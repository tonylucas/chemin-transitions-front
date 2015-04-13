app.controller('StructuresController', function ($scope, $stateParams, appConfig, mapService, Organisations, $timeout) {
    $scope.movies = [];
    $scope.placeholder = "Find Structures";
    $timeout(function () {
        return mapService.resetFilter();
    });
    Organisations.getOrganizations().then(function (organizations) {
        var org, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = organizations.length; _i < _len; _i++) {
            org = organizations[_i];
            _results.push($scope.movies.push(org.properties.name));
        }
        return _results;
    });
    return $scope.filter = function (data) {
        mapService.myLayer.setFilter(function (t) {
            if (data === "") {
                return true;
            }
            return t.properties.name === data;
        });
        return mapService.myLayer.eachLayer(function (layer) {
            var popupContent;
            popupContent = "<div class='text-center popup'><strong>" + layer.feature.properties.name + "</strong>" + "<br><img src='" + layer.feature.avatar + "'><br>";
            angular.forEach(layer.feature.properties.skills, function (value) {
                return popupContent = popupContent + "<span class='tag'>" + value.name + "</span>";
            });
            popupContent = popupContent + "</div>";
            layer.bindPopup(popupContent);
            layer.on('mouseover', function (e) {
                return layer.openPopup();
            });
            layer.on('mouseout', function (e) {
                return layer.closePopup();
            });
            return layer.on('click', function (e) {
                return $scope.showModal(e);
            });
        });
    };
});