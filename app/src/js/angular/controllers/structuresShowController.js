app.controller('StructuresShowController', function ($scope, $stateParams, Organisations) {
    Organisations.getOrganization($stateParams.id).then(function (data) {
        $scope.org = data;
    });

    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});