app.controller('InvitationController', function ($scope, authService, userData, $state, $stateParams) {
    $scope.mail = {};
    userData.getCurrentUser().then(function (user) {
        $scope.user         = user;
        $scope.mail.from    = user.email;
        $scope.mail.subject = "Invitation"
        $scope.mail.type = "Organization"
    });
    $scope.cancel = function() {
         return authService.hideInvitation();
    }

    $scope.sendMail = function(form, mail) {
        if (form.$invalid) {
            $scope.error = 'Form invalide';
            return false;
        }
        userData.sendInvitation(mail).then(function(result){
            $scope.cancel();
        }, function(err){
            console.log(err)
        });
    }
});