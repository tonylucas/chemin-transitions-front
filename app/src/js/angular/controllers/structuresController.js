app.controller('StructuresController', function ($scope, $stateParams, appConfig, mapService, Organisations, userData, skillData, $timeout, $filter) {


    $scope.filteredStructures = [];
    $scope.filteredActors = [];
    $scope.filteredSkills = [];

    $scope.orgs = Organisations.getOrganisations().then(function (orgs) {
        angular.forEach(orgs, function (org, key) {

            var coo = org.geometry.coordinates;
            var city;

            $.ajax({
                url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + coo['1'] + ',' + coo['0'] + '&sensor=true',
                success: function (data) {
                    angular.forEach(data.results[0].address_components, function (comp) {
                        if (comp.types[0] == 'locality') {
                            city = comp.long_name;
                        }
                    });

                    $scope.filteredStructures.push({
                        name: org.properties.name,
                        city: city,
                        skills: org.properties.skills,
                        id: org.id
                    });
                }
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
        angular.forEach(skills, function (skill, key) {
            $scope.filteredSkills.push({
                name: skill.name
            });
        });
    });


    $scope.filterSkills = function (skill) {
        mapService.filterMarkers(skill.name);
        mapService.fitMap();
        $scope.searchText = skill.name;
    }

    
});