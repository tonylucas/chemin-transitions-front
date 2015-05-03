app.service('mapService', function ($timeout) {
    return {
        init: function () {},
        hasSkill: function (filter) {
            return this.myLayer.setFilter(function (t) {
                var result, skill, _i, _len, _ref;
                _ref = t.properties.skills;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    skill = _ref[_i];
                    if (skill.name === filter) {
                        result = true;
                        return true;
                    }
                }
                return result;
            });
        },
        resetFilter: function ()  {

        },
        initMarkers: function () {
            var that = this;
            this.myLayer.eachLayer(function (layer) {
                var popupContent = "<div class='text-center popup'><a href='#structures/" + layer.feature.id + "'>" + layer.feature.properties.name + "</a></div>";

                layer.bindPopup(popupContent);

                layer.on('click', function (e) {
                    layer.openPopup();
                });

                that.myLayer.addLayer(layer);

            });
        },
        fitMap: function () {
            this.myLayer._map.fitBounds(this.myLayer.getBounds(), {
                maxZoom: 15
            });
            this.myLayer.eachLayer(function (marker) {
                marker.bounce({
                    duration: 800,
                    height: 140
                });
            });
        },
        filterMarkers: function (data) { // To filter markers on map from skills conditions

            var filteredStructures = [];
            var that = this;

            if (data.length == 0) { // Show all markers
                this.myLayer.setFilter(function (feature) {
                    filteredStructures.push(feature);
                    that.initMarkers();
                    return true;
                });
            } else {

                this.myLayer.setFilter(function (feature) {
                    console.log(feature);
                    var matching = false;
                    angular.forEach(feature.properties.skills, function (skill) {
                        angular.forEach(data, function (skillCondition) {
                            if (skill.name === skillCondition) {

                                matching = true;
                                filteredStructures.push(feature);
                            }
                        });
                    });

                    angular.forEach(feature.properties.tags, function (tag) {
                        angular.forEach(data, function (skillCondition) {
                            if (tag === skillCondition) {

                                matching = true;
                                filteredStructures.push(feature);
                            }
                        });
                    });
                    that.initMarkers();
                    return matching;
                });

            }
            return filteredStructures;

        }
    };
});
