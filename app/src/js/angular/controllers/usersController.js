app.controller('UsersController', function ($scope, authService, userData, skillData, Organisations, appConfig, $timeout, ipCookie) {
    $scope.autocomplete = {};
    $scope.alerts = [];
    $scope.closeAlert = function (index) {
        return $scope.alerts.splice(index, 1);
    };
    userData.getCurrentUser().then(function (data) {
        $scope.user = data;
        authService.user = data;
        $scope.setUpload();
        $scope.setUploadCarousel();

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
        console.log(user);
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
    $scope.setUpload = function () {
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
        $scope.eventHandlers = {
            success: function (file, response) {
                return $scope.avatar = response;
            }
        };
    };
    $scope.setUploadCarousel = function () {
        console.log("Carousel");
        $scope.dropzoneConfigCarousel = {
            url: appConfig.url('organizations/images/'),
            headers: {
                'X-token': ipCookie('token'),
                'X-email': ipCookie('email')
            },
            maxFiles: 5,
            dictDefaultMessage: "Drag your images for carousel here",
            /*addRemoveLinks: true,*/
            init: function () {
                thisDropzone = this;

                var mockFile;
                mockFile = {
                    name: 'test2'
                };
                mockFile = {
                    name: "carousel",
                    size: 12345
                };

                this.on("addedfile", function (file) {
                    // Create the remove button
                    var removeButton = Dropzone.createElement("<button>Remove file</button>");


                    // Capture the Dropzone instance as closure.
                    var _this = this;

                    // Listen to the click event
                    removeButton.addEventListener("click", function (e) {
                        // Make sure the button click doesn't submit the form:
                        e.preventDefault();
                        e.stopPropagation();


                        // Remove the file preview.
                        _this.removeFile(file);
                        //console.log(file.id);

                        // If you want to the delete the file on the server as well,
                        // you can do the AJAX request here.
                    });

                    // Add the button to the file preview element.
                    file.previewElement.appendChild(removeButton);
                });

                this.on("removedfile", function (file) {
                    $.ajax({
                        headers: {
                            'X-token': ipCookie('token'),
                            'X-email': ipCookie('email')
                        },
                        url: appConfig.url('organizations/images/' + file.id),
                        type: "DELETE",
                        error: function (data) {
                            console.log(data.Message);
                        }
                    });
                    console.log(file);
                });
                //If the number of files exceeded
                this.on("maxfilesexceeded", function (file) {
                    this.removeFile(file);
                    console.log('limit');
                });
                //On success
                this.on("success", function (file, response) {
                    file.id = response._id;
                });

                $.each(authService.user.images, function (key, value) {
                    var mockFile = {
                        name: "carousel",
                        id: value._id,
                        size: 12345
                    };

                    thisDropzone.emit("addedfile", mockFile);

                    // And optionally show the thumbnail of the file:
                    thisDropzone.emit("thumbnail", mockFile, appConfig.domain().concat(value.url));
                });
            }
        };
        $scope.eventHandlersCarousel = {
            success: function (file, response) {
                return $scope.carousel = response;
            }
        };
    };
});
