/*Directive of carousel (cf: slick carousel jquery)*/
app.directive('carousel', function ($timeout, Organisations, $modal, appConfig) {
    return {
        restrict: "A",
        link: function (scope, element, attrs, ctrl, e) {
            $timeout(function () {
                element.slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear'
                });
            }, 100);
        }
    };
});
