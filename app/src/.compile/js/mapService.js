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
      
    }
  };
});
