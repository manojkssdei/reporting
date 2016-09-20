var app = angular.module('alistApp', [ 'ui.bootstrap']);
app.controller('alistController', function($scope, $log) {
 if(window.innerWidth>767){ 
 $scope.navCollapsed = false;	  
 }else{
$scope.navCollapsed = true;
 $scope.toggleMenu = function() {
	$scope.navCollapsed = $scope.navCollapsed === false ? true: false;
};	  
 }
 
 $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
});