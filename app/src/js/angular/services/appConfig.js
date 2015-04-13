app.factory('appConfig', function () {
    var path;
    path = 'http://localhost:3000/api';
    return {
        url: function (url) {
            return path + "/" + url;
        },
        domain: function () {
            return "http://localhost:3000";
        }
    };
});