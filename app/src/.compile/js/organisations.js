app.factory("Organisations", function($http, $q, appConfig, ipCookie, authService) {
  return {
    getOrganizations: function() {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'GET',
        url: appConfig.url('organizations')
      }).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    },
    getOrganization: function(id) {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'GET',
        url: appConfig.url('organizations/show/' + id),
        headers: {
          'X-token': ipCookie('token'),
          'X-email': ipCookie('email')
        }
      }).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    },
    addActor: function(actor, organization) {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'POST',
        url: appConfig.url('organizations/actor/' + organization.id + '/' + actor.id + ''),
        headers: {
          'X-token': ipCookie('token'),
          'X-email': ipCookie('email')
        }
      }).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    },
    removeActor: function(actor, user) {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'DELETE',
        url: appConfig.url('organizations/actor/' + user.id + '/' + actor.id),
        headers: {
          'X-token': ipCookie('token'),
          'X-email': ipCookie('email')
        }
      }).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    },
    update: function(data) {
      var deferred;
      deferred = $q.defer();
      $http({
        method: 'PUT',
        url: appConfig.url('organizations/update/' + authService.user.id),
        headers: {
          'X-token': ipCookie('token'),
          'X-email': ipCookie('email')
        },
        data: data
      }).success(function(data, status, headers, config) {
        return deferred.resolve(data);
      }).error(function(data, status, headers, config) {
        return deferred.reject(data);
      });
      return deferred.promise;
    }
  };
});
