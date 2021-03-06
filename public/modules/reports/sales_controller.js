/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : Get Network Budget
*/


angular.module('alisthub', ['ui.bootstrap','angularjs-datetime-picker','angular-loading-bar','ngTagsInput','angularjs-dropdown-multiselect','ngTouch','chart.js','angularUtils.directives.dirPagination']).controller('salesReportController', function($scope,$localStorage,$stateParams,$injector,$http,$state,$location,$rootScope,$window,$parse,$filter,$anchorScroll,cfpLoadingBar) {
  
  $rootScope.class_status=false;
  if(window.innerWidth>767){  
      $scope.navCollapsed = false;    
  }else{ 
      $scope.navCollapsed = true;
      $scope.toggleMenu = function() {
        $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
  }
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
  //////////// Loader class end ////////////////////////
  $scope.facebookdata       = true;
  $scope.searchcampiagn     = '1';
  $scope.googledata         = false;
  $scope.pagesize           = '10';
  $scope.input_filter       = {};
  $scope.input_filter.id    = "7";
  $scope.filter_title       = '7 Days';
  $scope.fb_breakdown_title = 'Age';
  var data                  = {};
  $scope.breakdown_response = {};
    
  $anchorScroll();
  
  Highcharts.chart('container',{
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: {
            text: 'Ticket Sales Data'
        },
        subtitle: {
            text: 'Sales data report'
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        xAxis: {
            categories: Highcharts.getOptions().lang.shortMonths
        },
        yAxis: {
            title: {
                text: null
            }
        },
        series: [{
            name: 'Sales',
            data: [322, 553, null, 40, 0, 50, 1, 4, 860, 40]
        },
        {
            name: 'Ticket sold',
            data: [12, 13, null, 4, 0, 5, 11, 42, 61, 3]
        }]
    });
  
})
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})
.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
})
.directive('clickoutside', function($document){
  return {
    restrict: 'A',
    link: function(scope, elem, attr, ctrl) {
      elem.bind('click', function(e) {
        // this part keeps it from firing the click on the document.
        e.stopPropagation();
      });
      $document.bind('click', function() {
        // magic here.
        scope.$apply(attr.clickoutside);
      })
    }
  }
})
.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}])
.filter('cmdate', [
    '$filter', function($filter) {
        return function(input, format) {
              var today = new Date(input);
              var dd = today.getDate();
              if(dd<10){ dd='0'+dd; }
              var month = today.getMonth(); 
              var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              return monthNames[month] + " " +  dd + ", " + today.getFullYear();
            //return $filter('date')(new Date(input), format);
        };
    }
]).filter('underscoreless', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});