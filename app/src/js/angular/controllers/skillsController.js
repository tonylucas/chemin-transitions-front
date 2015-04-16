app.controller('SkillsController', function ($scope, skillData, mapService, $timeout) {
    $scope.movies = [];
    $scope.placeholder = "Find Skills";
    $timeout(function () {
        return mapService.resetFilter();
    });
    skillData.getSkills().then(function (skills) {
        var skill, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = skills.length; _i < _len; _i++) {
            skill = skills[_i];
            _results.push($scope.movies.push(skill.name));
        }
        return _results;
    });
//    return $scope.filter = function (data) {
//        mapService.hasSkill(data);
//    };
});