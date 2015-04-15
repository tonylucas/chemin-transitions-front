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
        resetFilter: function () {
        }
    };
});