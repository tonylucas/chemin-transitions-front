app.controller('SkillsController', function ($scope, skillData, mapService, $timeout) {
    
    $scope.movies = [];
    $scope.placeholder = "Find Skills";
    
    $timeout(function () {
        return mapService.resetFilter();
    });
    skillData.getSkills().then(function (skills) {
        var i, len, results, skill;
        results = [];
        for (i = 0, len = skills.length; i < len; i++) {
            skill = skills[i];
            results.push($scope.movies.push(skill.name));
        }
        return results;
    });
    return $scope.filter = function (data) {
        mapService.hasSkill(data);

    };
});