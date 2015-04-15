app.controller('UsersController', function ($scope, authService, userData, skillData, Organisations, appConfig, $timeout) {
    $scope.autocomplete = {};
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        return $scope.alerts.splice(index, 1);
    };
    userData.getCurrentUser().then(function (data) {
        $scope.user = data;
        authService.user = data;
        $scope.setUpload();
        if (angular.isDefined(data.image)) {
            $scope.avatar = appConfig.domain() + data.image;
        }
        if (data.type === "Organization") {
            return userData.getOrganizationProfile().then(function (data) {
                authService.getGeocode(data).then(function (result) {
                    return $scope.autocomplete.coordinates = result[0]["formatted_address"];
                });
                return $scope.user = data;
            });
        }
    });
    skillData.getSkills().then(function (data) {
        return $scope.skills = data;
    });

    userData.getPersons().then(function (data) {

        return $scope.persons = data;
    });
    $scope.update = function (form, user) {
        if (form.$invalid) {
            $scope.alerts.push({
                type: 'alert-box warning radius',
                msg: 'Invalid informations.'
            });
        } else {
            $scope.alerts.push({
                type: 'alert-box success radius',
                msg: 'Profile updated !'
            });
            user = authService.setUserCoordinates(user, $scope.autocomplete);
            Organisations.update(user).then(function (data) {});
        }
        return $timeout((function () {
            return $scope.closeAlert();
        }), 4000);
    };

    $scope.loadSkills = function($query) {
        return $scope.skills.filter(function(skill){
            return skill.name.toLowerCase().match($query.toLowerCase());
        })
    }

    $scope.loadPersons = function($query) {
        return $scope.persons.filter(function(person){
            return person.fullName.toLowerCase().match($query.toLowerCase());
        })
    }
    $scope.addActor = function (actor) {
        return Organisations.addActor(actor, authService.user).then(function (data) {});
    };
    $scope.removeActor = function (actor) {
        console.log(actor)
        return Organisations.removeActor(actor, authService.user).then(function (data) {});
    };
    return $scope.setUpload = function () {
        $scope.dropzoneConfig = {
            url: appConfig.url('users/upload/image/' + authService.user.id),
            maxFiles: 1,
            dictDefaultMessage: "Drag your avatar profile here",
            init: function () {
                var mockFile;
                mockFile = {
                    name: 'test'
                };
                mockFile = {
                    name: "avatar",
                    size: 12345
                };
                return this.on("maxfilesexceeded", function (file) {
                    this.removeAllFiles();
                    return this.addFile(file);
                });
            }
        };
        return $scope.eventHandlers = {
            success: function (file, response) {
                return $scope.avatar = response;
            }
        };
    };
});