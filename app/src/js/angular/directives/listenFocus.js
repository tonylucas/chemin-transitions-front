app.directive('listenFocus', function ($timeout) {
    return {
        restrict: "A",
        controler: "HomeController",
        link: function (scope, element, attrs, ctrl, e) {

            $(element).on('focusin keypress', function () {
                $('.searchTextResults').show();
            });

            $(element).on('focusout', function () {
                $timeout(function () {
                    $('.searchTextResults').hide();
                }, 500);
            });

            $(document).keyup(function (e) {
                if (e.keyCode == 27) {
                    $('.searchTextResults').hide();
                }
            });

        }
    };
});