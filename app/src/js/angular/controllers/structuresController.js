app.filter('searchFilter', function () {
    return function (items, type) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.type == type) {
                filtered.push(item);
            }
        }

        return filtered;
    };
});

app.filter("andFilter", function () {
    return function (items, searchText, AND_OR) {
        if (angular.isDefined(searchText) && angular.isDefined(items)) {
            var returnArray = [],
                // Split on single or multi space
                splitext = searchText.toString().toLowerCase().split(/\s+/),
                // Build Regexp with Logical AND using "look ahead assertions"
                regexp_and = "(?=.*" + splitext.join(")(?=.*") + ")",
                // Build Regexp with logicial OR
                regexp_or = searchText.toString().toLowerCase().replace(/\s+/g, "|"),
                // Compile the regular expression
                re = new RegExp((AND_OR == "AND") ? regexp_and : regexp_or, "i");

            for (var x = 0; x < items.length; x++) {
                // Check on the name
                if (re.test(items[x].name) || re.test(items[x].skills)) {
                    returnArray.push(items[x]);
                }
                // Check on the skills
                else if (angular.isDefined(items[x].skills)) {
                    for (var y = 0; y < items[x].skills.length; y++) {
                        if (re.test(items[x].skills[y].name)) {
                            returnArray.push(items[x]);
                        }
                    }
                }

            }
            return returnArray;
        }
    }
});

app.controller('StructuresController', function ($scope, $stateParams, appConfig, mapService, Organisations, userData, skillData, $timeout, $filter) {

    $scope. myTrackingFunction = function(items) {
        console.log(items);
    }
    $scope.filteredStructures = [];
    $scope.filteredActors = [];
    $scope.filteredSkills = [];

    $scope.orgs = Organisations.getOrganizations().then(function (organizations) {
        //        console.log(organizations);
        angular.forEach(organizations, function (organization, key) {
            $scope.filteredStructures.push({
                name: organization.properties.name,
                skills: organization.properties.skills
            });
        });
    });

    $scope.actors = userData.getPersons().then(function (persons) {
        //        console.log(persons);
        angular.forEach(persons, function (actor, key) {
            $scope.filteredActors.push({
                name: actor.fullName
            });
        });

    });

    $scope.skills = skillData.getSkills().then(function (skills) {
                console.log(skills);
        angular.forEach(skills, function (skill, key) {
            $scope.filteredSkills.push({
                name: skill.name
            });
        });
    });


    $scope.filter = function (data) {
        mapService.myLayer.setFilter(function (t) {
            if (data === "") {
                return true;
            }
            return t.properties.name === data;
        });

    };
});