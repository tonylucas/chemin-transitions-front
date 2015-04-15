app.directive('map', function ($timeout, Organisations, $modal, appConfig, mapService) {
    return {
        restrict: "E",
        controler: "HomeController",
        link: function (scope, element, attrs, ctrl, e) {
            var locate, map, mapboxTiles, org, _i, _len, _ref;
            $('#map').parents().height('100%');
            L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw';
            mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
                attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
            });

            locate = true;

            map = L.mapbox.map('map', 'tonylucas.l5j344b8', {
                minZoom: 3
            });

            map.addLayer(mapboxTiles);

            if (locate) {
                map.locate({
                    setView: true,
                    maxZoom: 15
                });
            } else {
                map.setView([48.8, 2.3], 12);
            }

            mapService.myLayer = L.mapbox.featureLayer().addTo(map);
            _ref = scope.organizations;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                org = _ref[_i];
                org.avatar = appConfig.domain() + org.image;
                org.properties['marker-color'] = '#f86767';
            }
            mapService.myLayer.setGeoJSON(scope.organizations);
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
                layer.on('click', function (e) {
                    return scope.showModal(e);
                });
                return mapService.myLayer.addLayer(layer);
            });
        }
    };
});