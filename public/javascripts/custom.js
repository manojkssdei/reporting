var app = angular.module('alistApp', [ 'ui.bootstrap']);
app.controller('alistController', function($scope, $log, $window) {
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
  
  angular.element($window).bind("scroll", function() {
            if(window.innerWidth>767){
				if (this.pageYOffset >= 230) {
					angular.element(document.querySelector('.d-title')).addClass("fixed-row");
					angular.element(document.querySelector('#fixed')).addClass("fixed-wrapper");
				 } else {
					angular.element(document.querySelector('.d-title')).removeClass("fixed-row");
					angular.element(document.querySelector('#fixed')).removeClass("fixed-wrapper");
				 }
				$scope.$apply();
			}
        });
 
 });
 app.controller('heightfunction', function($scope) {
 	$scope.getHeight = function(){
		if(window.innerWidth>767){
			$scope.setfHeight = angular.element(document.querySelector('#getfheight')).prop('offsetHeight');
			$scope.setsHeight = angular.element(document.querySelector('#getsheight')).prop('offsetHeight');
			if($scope.setfHeight > $scope.setsHeight){
				$scope.setHeight = $scope.setfHeight+'px';
			}else{
				$scope.setHeight = $scope.setsHeight+'px';
			}
		}
	}
  
 });
 
 
 