app.directive('map', function (Organisations, $modal, appConfig, mapService, $timeout) {
    return {
        restrict: "E",
        controler: "HomeController",
        link: function (scope, element, attrs, ctrl, e) {
            var locate, map, mapboxTiles, org, _i, _len, _ref;

            $('#map').parents().height('100%'); // Faire en CSS

            L.mapbox.accessToken = 'pk.eyJ1IjoidG9ueWx1Y2FzIiwiYSI6IlRqa09UbE0ifQ.DGFIsGazdBZSk0t2PYe6Zw';
            
            mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
                attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
            });

            locate = false;

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

            mapService.myLayer.eachLayer(function (layer) {
                var popupContent = "<div class='text-center popup'><a href='#structures/" + layer.feature.id + "'>" + layer.feature.properties.name + "</a></div>";

                layer.bindPopup(popupContent);

                layer.on('click', function (e) {
                    layer.openPopup();
                });

                mapService.myLayer.addLayer(layer);
            });
        }
    };
});