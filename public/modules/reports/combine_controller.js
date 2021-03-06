/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : Get Network Budget
*/


angular.module('alisthub', ['ui.bootstrap','angularjs-datetime-picker','angular-loading-bar','ngTagsInput','angularjs-dropdown-multiselect','ngTouch','chart.js','angularUtils.directives.dirPagination']).controller('combineReportController', function($scope,$localStorage,$stateParams,$injector,$http,$state,$location,$rootScope,$window,$parse,$filter,$anchorScroll,cfpLoadingBar) {
  
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
  $scope.compare_parameter  = CONSTANT_COMPARISON;
   
  $anchorScroll();
  
  // common module
  var $serviceCommon     = $injector.get("COMMON");
  // Get filter
  $scope.show_custom = 0;
  $scope.getFilter   = function(str)
  {
    $scope.date_range = str;
    if (str != 'custom') {
     $scope.filter_title   = str+' Days'; 
     $scope.show_custom      = 0;
     var todayDate           = new Date();
     $scope.startdatereports = todayDate;
     $scope.enddatereports   = new Date(todayDate).setDate(new Date(todayDate).getDate() - (parseInt(str)));
     //if($scope.input_filter.id == 7){ $scope.input_filter.id=$scope.input_filter.id; }
     $scope.input_filter.id  = str;
     $scope.date_lables = $serviceCommon.getDateLables($scope.startdatereports,$scope.enddatereports,1);
     console.log($scope.date_lables);
    }else{
     $scope.show_custom = 1;
     $scope.filter_title   = 'Custom';
    }
    //$scope.run_dashboard(str);
  }
  $scope.getFilter(7);  	
    		
  /**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
    Highcharts.chart('container',{
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Combine Monthly Data for All Channels'
        },
        subtitle: {
            text: 'Source: Alisthub.com'
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '$ {value}',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            title: {
                text: 'Sales',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Facebook',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '$ {value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Email',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Facebook',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                valueSuffix: ' $'
            }

        }, {
            name: 'Email',
            type: 'spline',
            yAxis: 2,
            data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: 'Sales',
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            tooltip: {
                valueSuffix: ' $'
            }
        }]
    });
    
    
    
    ////////////////////////////////////////////////////////////////

  
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