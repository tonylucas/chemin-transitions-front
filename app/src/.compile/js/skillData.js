app.factory('skillData', function($http, $q, appConfig, ipCookie) {
  return {
    getSkills: function() {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'GET',
        url: appConfig.url('skills')
      }).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    }
  };
});
