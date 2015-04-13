app.controller('ModalController', function ($scope, $modal) {
    $scope.items = ['item1', 'item2', 'item3'];
    return $scope.open = function () {
        var modalInstance;
        modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            scope: $scope,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        return modalInstance.result.then((function (selectedItem) {
            $scope.selected = selectedItem;
        }), function () {
            return $log.info('Modal dismissed at: ' + new Date);
        });
    };
});