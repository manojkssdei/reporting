angular.module('alisthub').controller('helpController', function($scope,
    $state, $localStorage, $injector, ngTableParams, $uibModal, $rootScope, $filter,
    $timeout, $sce, $location) {
    //////////// Loader class start ///////////////////////
        $scope.current =        LOADER_CONS.current;
        $scope.max =            LOADER_CONS.max;
        $scope.duration =       LOADER_CONS.duration;
        $scope.stroke =         LOADER_CONS.stroke;
        $scope.radius =         LOADER_CONS.radius;
        $scope.isSemi =         LOADER_CONS.isSemi;
        $scope.currentColor =   LOADER_CONS.currentColor;
        $scope.bgColor =        LOADER_CONS.bgColor;
        $scope.currentAnimation = LOADER_CONS.currentAnimation;
        $scope.animationDelay   = LOADER_CONS.animationDelay;
        $scope.getStyle = LOADER_CONS.getStyle;
        //////////// Loader class end ////////////////////////

    $scope.oneAtATime = true;

    $scope.groups = [{
        title: 'Dynamic Group Header - 1',
        content: 'Dynamic Group Body - 1'
    }, {
        title: 'Dynamic Group Header - 2',
        content: 'Dynamic Group Body - 2'
    }];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: false,
        isFirstDisabled: false
    };

});
