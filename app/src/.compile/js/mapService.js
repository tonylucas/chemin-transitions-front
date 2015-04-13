app.service('mapService', function($timeout) {
  return {
    init: function() {},
    hasSkill: function(filter) {
      return this.myLayer.setFilter(function(t) {
        var i, len, ref, result, skill;
        ref = t.properties.skills;
        for (i = 0, len = ref.length; i < len; i++) {
          skill = ref[i];
          if (skill.name === filter) {
            result = true;
            return true;
          }
        }
        return result;
      });
    },
    resetFilter: function() {
      this.myLayer.setFilter(function(t) {
        return true;
      });
      return this.myLayer.eachLayer(function(layer) {
        var popupContent;
        popupContent = "<div class='text-center popup'><strong>" + layer.feature.properties.name + "</strong>" + "<br><img src='" + layer.feature.avatar + "'><br>";
        angular.forEach(layer.feature.properties.skills, function(value) {
          return popupContent = popupContent + "<span class='tag'>" + value.name + "</span>";
        });
        popupContent = popupContent + "</div>";
        layer.bindPopup(popupContent);
        layer.on('mouseover', function(e) {
          return layer.openPopup();
        });
        layer.on('mouseout', function(e) {
          return layer.closePopup();
        });
        return layer.on('click', function(e) {
          return $scope.showModal(e);
        });
      });
    }
  };
});
