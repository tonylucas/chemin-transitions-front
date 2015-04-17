app.controller('HomeController', function ($scope, authService, Organisations, userData, skillData, $modal, appConfig, mapService, $timeout, $stateParams, $filter) {

    Organisations.getOrganisations().then(function(orgs){
        $scope.organisations = orgs;    
    });

    $timeout(function () {
        mapService.resetFilter();
    });

    $scope.open = function (size) {
        authService.showLogin();
    };

    $scope.mapView = {
        active: true,
        template: 'partials/map.html'
    };

    $scope.listView = {
        active: false,
        template: 'partials/list.html'
    };

    $scope.closeModal = function () {
        this.modalInstance.dismiss('cancel');
    };

    $scope.showModal = function (e) {
        var modalInstance;
        $scope.selected = e.target.feature.properties;
        modalInstance = $modal.open({
            templateUrl: 'partials/modal.html',
            windowClass: 'large',
            scope: $scope
        });
    };

    $scope.$on('toggleViewMode', function (event) {
        $scope.listView.active = !$scope.listView.active;
        $scope.mapView.active = !$scope.mapView.active;
    });

    $scope.filterSkills = function (skill) {
        mapService.filterMarkers(skill.name);
        //        $scope.orgs = ;
        mapService.fitMap();
    }


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