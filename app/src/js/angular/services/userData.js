app.factory('userData', function ($http, $q, appConfig, ipCookie) {
    return {
        login: function (user) {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'POST',
                url: appConfig.url('sessions/login'),
                data: user
            }).success(function (data, status, headers, config) {
                return deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                return deferred.reject(data);
            });
            return deferred.promise;
        },
        getPersons: function () {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConfig.url('users/persons'),
                headers: {
                    'X-token': ipCookie('token'),
                    'X-email': ipCookie('email')
                }
            }).success(function (data, status, headers, config) {
                return deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                return deferred.reject(data);
            });
            return deferred.promise;
        },
        getOrganizationProfile: function () {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConfig.url('organizations/profile'),
                headers: {
                    'X-token': ipCookie('token'),
                    'X-email': ipCookie('email')
                }
            }).success(function (data, status, headers, config) {
                return deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                return deferred.reject(data);
            });
            return deferred.promise;
        },
        getCurrentUser: function () {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConfig.url('sessions'),
                headers: {
                    'X-token': ipCookie('token'),
                    'X-email': ipCookie('email')
                }
            }).success(function (data, status, headers, config) {
                return deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                return deferred.reject(data);
            });
            return deferred.promise;
        },
        checkUser: function () {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConfig.url('sessions'),
                headers: {
                    'X-token': ipCookie('token'),
                    'X-email': ipCookie('email')
                }
            }).success(function (data, status, headers, config) {
                return deferred.resolve(status);
            }).error(function (data, status, headers, config) {
                return deferred.reject(status);
            });
            return deferred.promise;
        },
        create: function (user) {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'POST',
                url: appConfig.url('users'),
                data: user
            }).success(function (data, status, headers, config) {
                return deferred.resolve(status);
            }).error(function (data, status, headers, config) {
                return deferred.reject(status);
            });
            return deferred.promise;
        },
        update: function (user) {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'PUT',
                url: appConfig.url('users'),
                params: {
                    id: user._id
                },
                data: user,
                headers: {
                    'token': ipCookie('token'),
                    'email': ipCookie('email')
                }
            }).success(function (data, status, headers, config) {
                return deferred.resolve(status);
            }).error(function (data, status, headers, config) {
                return deferred.reject(status);
            });
            return deferred.promise;
        },
        "delete": function (id) {
            var deferred;
            deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: appConfig.url('users'),
                params: {
                    id: user._id
                },
                data: user
            }).success(function (data, status, headers, config) {
                return deferred.resolve(status);
            }).error(function (data, status, headers, config) {
                return deferred.reject(status);
            });
            return deferred.promise;
        }
    };
});