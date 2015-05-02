var app;

app = angular.module('app', ['ui.router', 'ipCookie', 'leaflet-directive', 'mm.foundation', 'ngAutocomplete', 'ngTagsInput', 'ngDropzone', 'autocomplete']);

app.run(function ($rootScope, $location, $state, authService, ipCookie) {
    return $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
        $rootScope.isLogged = true;
        if (!(ipCookie('token') || ipCookie('email'))) {
            return $rootScope.isLogged = false;
        }
    });
});

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var $state;
        $state = $injector.get("$state");
        return $state.go("index.structures");
    });
    return $stateProvider.state('index', {
            views: {
                "": {
                    templateUrl: "partials/home.html",
                    controller: "HomeController"
                },
                "navbar": {
                    templateUrl: 'partials/navbar.html',
                    controller: "NavBarController",
                }

            },
            resolve: {
                organisations: function (Organisations) {
                    return Organisations.getOrganisations().then(function(organizations){
                        return organizations
                    });
                }
            },
            onEnter: function (authService) {
                if (authService.needsLogin) {
                    return authService.showLogin();
                }
            }

        })
        .state('index.structures', {
            views: {
                "": {
                    templateUrl: "partials/structures.html",
                    controller: "StructuresController"
                },
                "filter": {
                    templateUrl: 'partials/ui/filter.html',
                    controller: "StructuresController"
                }
            }
        }).state('index.actors', {
            url: '/actors',
            templateUrl: 'partials/structures/index.html'
        }).state('users', {
            url: "/users",
            resolve: {
                check: function ($state, authService) {
                    return authService.isAuthorize().then(function (data) {
                        return authService.needsLogin = data;
                    });
                }
            },
            views: {
                "": {
                    template: "<div ui-view></div>"
                },
                "navbar": {
                    templateUrl: 'partials/navbar.html',
                    controller: "NavBarController"
                }
            }
        }).state('users.profile', {
            url: "/profile",
            controller: 'UsersController',
            templateUrl: 'partials/users/profile.html'
        }).state('index.invitation', {
            url: "/invitation/:id",
            controller: 'RegisterController',
            onEnter: function (authService, userData, $stateParams, $state, ipCookie) {
                if (ipCookie('token')) {
                    return $state.go('index');
                }
                userData.getInvitation($stateParams.id).then(function (invitation) {
                    if (!invitation || invitation.enable == false) {
                        return $state.go('index');
                    }
                    authService.setInvitation(invitation);
                    authService.showRegister();
                })
            }
        }).state('structures', {
            url: "/structures",
            views: {
                "": {
                    templateUrl: "partials/structures.html",
                    controller: "StructuresController"
                },
                "navbar": {
                    templateUrl: 'partials/navbar.html',
                    controller: "NavBarController"
                }
            }
        }).state('structures.show', {
            url: '/:id',
            templateUrl: "partials/structures/show.html",
            resolve: {
                id: function ($stateParams, Organisations) {
                    return $stateParams.id;
                }
            },
            controller: "StructuresShowController"
        }).state('skills', {
            url: "/skills",
            templateUrl: "partials/skills.html",
            controller: "SkillsController"
        }).state('assets', {
            url: "/assets",
            templateUrl: "partials/assets.html",
            controller: "AssetsController"
        });
});