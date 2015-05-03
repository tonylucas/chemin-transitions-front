app.controller('StructuresController', function ($scope, $stateParams, appConfig, mapService, Organisations, userData, skillData, $timeout, $filter, $rootScope) {
    $scope.filteredStructures = [];
    $scope.filteredActors = [];
    $scope.filteredSkills = [];
    $scope.currentFilter = [];

    $scope.orgs = Organisations.getOrganisations().then(function (orgs) {
        angular.forEach(orgs, function (org, key) {

            var coo = org.geometry.coordinates;
            var city;

            $.ajax({
                url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + coo['1'] + ',' + coo['0'] + '&sensor=true',
                success: function (data) {
                    if (data.results[0]) {
                        angular.forEach(data.results[0].address_components, function (comp) {
                            if (comp.types[0] == 'locality') {
                                city = comp.long_name;
                            }
                        });
                    }


                    $scope.filteredStructures.push({
                        name: org.properties.name,
                        city: city,
                        skills: org.properties.skills,
                        id: org.id
                    });
                }
            });

        });

        Organisations.getTechonmapDatas().then(function (techonmapOrgs) {
            angular.forEach(techonmapOrgs, function (techonmapOrg) {
                //                console.log(techonmapOrg);
                $scope.filteredStructures.push({
                    name: techonmapOrg.properties.name,
                    city: techonmapOrg.properties.city,
                    skills: techonmapOrg.properties.tags,
                    id: techonmapOrg.id
                });
            });
        });



    });

    $scope.actors = userData.getPersons().then(function (persons) {
        //        console.log(persons);
        angular.forEach(persons, function (actor, key) {
            $scope.filteredActors.push({
                name: actor.fullName,

            });
        });

    });

    $scope.skills = skillData.getSkills().then(function (skills) {
        //                console.log(skills);
        angular.forEach(skills, function (skill) {
            $scope.filteredSkills.push({
                name: skill.name
            });
        });

        var tags = [];
        var formatedTags = [];


        Organisations.getTechonmapDatas().then(function (techonmapOrgs) {
            angular.forEach(techonmapOrgs, function (techonmapOrg) {
                tags = _.union(tags, techonmapOrg.properties.tags);
            });

            tags = _.uniq(tags);

            formatedTags = _.map(tags,
                function (tagName) {
                    return {
                        name: tagName
                    };
                });

            $scope.filteredSkills = _.union($scope.filteredSkills, formatedTags)
        });



    });

    $scope.filterSkills = function (skill) {
        $scope.currentFilter.push(skill.name);

        var filteredOrgs = [];
        filteredOrgs = mapService.filterMarkers($scope.currentFilter);

        $rootScope.$broadcast('updateStructuresList', filteredOrgs);
        mapService.fitMap();
        $scope.searchText = skill.name;
    }

    $scope.removeFilter = function (skillName) {
        $scope.currentFilter = _.without($scope.currentFilter, skillName)

        var filteredOrgs = [];
        filteredOrgs = mapService.filterMarkers($scope.currentFilter);

        $rootScope.$broadcast('updateStructuresList', filteredOrgs);
        mapService.fitMap();
    }



});
