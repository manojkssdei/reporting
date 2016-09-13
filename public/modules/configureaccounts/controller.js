/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : Get Network Budget
*/
 

angular.module('alisthub', ['ui.bootstrap','angucomplete','angularjs-datetime-picker','ngTagsInput']).controller('accountsController', function($scope,$localStorage,$injector,$http,$state,$location,$anchorScroll,$rootScope,$window,$timeout,cfpLoadingBar) {
   //For Step 1
  $anchorScroll();
  var $serviceTest = $injector.get("accounts");

  //var $servicecfpLoadingBar = $injector.get("cfpLoadingBar");
  /*Define Time and Age dropdown values*/
  $scope.marketingpage = 'current-menu-item';

  $scope.current =        0;
  $scope.max =            100;
  $scope.duration =       800;
  $scope.stroke =         8;
  $scope.radius =         70;
  $scope.isSemi =         false;
  $scope.currentColor =   '#801517';
  $scope.bgColor =        '#eaeaea';
  $scope.currentAnimation = 'easeOutCubic';
  $scope.animationDelay = 0;

  $scope.userid = $localStorage.userId;
  $scope.getStyle = function(){
    var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';
    return {
        'top': $scope.isSemi ? 'auto' : '93%',
        'bottom': $scope.isSemi ? '5%' : 'auto',
        'left': '49%',
        'transform': transform,
        '-moz-transform': transform,
        '-webkit-transform': transform,
        'font-size': $scope.radius/3.5 + 'px'
    };
};

  if(window.innerWidth>767){ 
    $scope.navCollapsed = false;    
  }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
      $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
  }

$scope.selectnetwork = function(id,value){
    $scope.objectid = id;
    $scope.objectval = value;
    $scope.facebookpagelist = false;
};


/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-18
  Created By: Lavlesh Mishra
  Module : Validate Ads Date
*/

function validateDates() {
    var endDate = $scope.enddate;
    var startDate = $scope.startdate;  
    var stdate = Date.parse(startDate);
    var currentdate = new Date().getTime();
    if(currentdate>stdate){
      $scope.startBeforeCurrent = true;
    }else {
      $scope.startBeforeCurrent = false;      
    } 
    if(endDate < startDate) {
        $scope.endBeforeStart = true;
    }else {
      $scope.endBeforeStart = false;
    }          
}
 
/* 
$serviceTest.getallnetworks  (function(response) {
      if(response.data.code==200) $scope.networklisting = response.data.result;
  });
*/

  $serviceTest.configureaccounts($localStorage.userId,function(response) {
      if(response.code==200) $scope.configureaccounts = response.result;
  });

 $scope.geteventbritetoken = function(){
      cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      var data = {};
      data.user_id  = $localStorage.userId;
      data.network_id = 3;
       $serviceTest.geteventbritetoken( data , function(response){
              if(response.code==200) {
                //$scope.facebookcampaignlist = response.result.data;
              }else{
                //$scope.facebookcampaignlist = '';
              }
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
      });
}; 


$scope.geteventbritemyprofile = function() {
      cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      var data = {};
      data.user_id  = $localStorage.userId;
      data.network_id = 3;
      $serviceTest.geteventbritemyprofile( data , function(response){
              if(response.code==200) {
                //$scope.facebookcampaignlist = response.result.data;
              }else{
                //$scope.facebookcampaignlist = '';
              }
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
      });  
};

$scope.geteventbriteownedevents = function() {
      cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      var data = {};
      data.user_id  = $localStorage.userId;
      data.network_id = 3;
      $serviceTest.geteventbriteownedevents( data , function(response){
              if(response.code==200) {
                //$scope.facebookcampaignlist = response.result.data;
              }else{
                //$scope.facebookcampaignlist = '';
              }
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
      });  
};


$scope.geteventbriteorganizers = function() {
      cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      var data = {};
      data.user_id  = $localStorage.userId;
      data.network_id = 3;
      $serviceTest.geteventbriteorganizers( data , function(response){
              if(response.code==200) {
                //$scope.facebookcampaignlist = response.result.data;
              }else{
                //$scope.facebookcampaignlist = '';
              }
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
      });  
};


$scope.geteventbritevenues = function() {
      cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      var data = {};
      data.user_id  = $localStorage.userId;
      data.network_id = 3;
      $serviceTest.geteventbritevenues( data , function(response){
              if(response.code==200) {
                //$scope.facebookcampaignlist = response.result.data;
              }else{
                //$scope.facebookcampaignlist = '';
              }
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
      });  
};


$scope.geteventbritecategories = function() {
      cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      var data = {};
      data.user_id  = $localStorage.userId;
      data.network_id = 3;
      $serviceTest.geteventbritecategories( data , function(response){
              if(response.code==200) {
                //$scope.facebookcampaignlist = response.result.data;
              }else{
                //$scope.facebookcampaignlist = '';
              }
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
      });  
};


$scope.geteventbritesubcategories = function() {
      cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      var data = {};
      data.user_id  = $localStorage.userId;
      data.network_id = 3;
      $serviceTest.geteventbritesubcategories( data , function(response){
              if(response.code==200) {
                //$scope.facebookcampaignlist = response.result.data;
              }else{
                //$scope.facebookcampaignlist = '';
              }
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
      });  
};




 /**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : Format Date
*/

function formatDate(convertdate) {
        if(convertdate != '' && convertdate != undefined)
            var today = new Date(convertdate);
        else 
            var today = new Date();

        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        var strTime = hours + ':' + minutes + ':' + seconds;
        var month = +today.getMonth() + +1;
        if(convertdate != '' && convertdate != undefined)
          return today.getFullYear() + "-" + month + "-" + today.getDate();
        else 
          return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
  }

  $scope.success_message = false;
  $scope.error_message = false;


}).directive('ngEnter', function () {
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
});
