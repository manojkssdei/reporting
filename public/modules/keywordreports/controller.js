/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : Get Network Budget
*/


angular.module('alisthub', ['ui.bootstrap','angularjs-datetime-picker','ngTagsInput','angularjs-dropdown-multiselect','ngTouch','chart.js']).controller('keywordreportsController', function($scope,$localStorage,$injector,$http,$state,$location,$rootScope,$window,$parse,$filter,$stateParams,cfpLoadingBar,$anchorScroll) {

  $anchorScroll();
   //For Step 1
  $scope.searchcampiagn = 'All';
  $scope.findcampaign = '';
  $scope.datetype = 'Last 7 days';
  $scope.datastatus = '';
  $scope.googledateRangeType = 'LAST_7_DAYS';
  var data = {};
  data.userid = $localStorage.userId;
  data.campaignid = $stateParams.campaignid;
  data.networkid = $stateParams.networkid;
  $scope.networkid = $stateParams.networkid;
  $scope.breakdown = "0";
  data.reporttype = 'criteria';
  var $serviceTest = $injector.get("keywordreports");
  //var $servicecfpLoadingBar= $injector.get("cfpLoadingBar");
  $scope.googledata = true;

  $anchorScroll();
  var breakdownselect = function (){
   $scope.breakdowndata = [];
if(data.networkid == 1){
  $scope.networkid2 = true;
  $scope.networkid1 = false;;
  $scope.breakdowndata = [{"brdown" : "Age"},{"brdown" : "Gender"},{"brdown" : "Country"},{"brdown" : "Hourly Advertiser"},{"brdown" : "Hourly Audience"},{"brdown" : "Device"},{"brdown" : "Placement"},{"brdown" : "Region"}];
}
else if(data.networkid == 2){
  $scope.networkid2 = false;
  $scope.networkid1 = true;;
  $scope.breakdowndata = [{"brdown" : "Gender"},{"brdown" : "Keyword"},{"brdown" : "User Interest"},{"brdown" : "Vertical"}];
}
}
breakdownselect();
 //;  $scope.breakdowndata = [{"brdown" : "Gender"},{"brdown" : "Keyword"},{"brdown" : "User Interest"},{"brdown" : "Vertical"}];


  $scope.breakdownchange = function(){
    data.breakdown = $scope.breakdown;
    if(data.networkid==1){
        getfacebookreports(data);
      }
      else if(data.networkid == 2){
        if($scope.breakdown !== null){
        $scope.filtertext = $scope.breakdown.brdown;
      } else $scope.filtertext = {};
      }
  }

  $scope.$watch('datetype',function(){
      $scope.showdatereports =false;
      var gettype = $scope.datetype;
      $scope.enddate = formatonlyDate();
      var d = new Date();
      if(gettype=='LifeTime'){          
        var end = d.setDate(d.getDate() - 365);
        $scope.startdate = formatonlyDate(end);
        $scope.googledateRangeType = 'ALL_TIME';
        $scope.facebookdaterange = 'lifetime';
      }
      if(gettype=='Today'){       
        $scope.startdate = formatonlyDate();
        $scope.googledateRangeType = 'TODAY';
        $scope.facebookdaterange = 'today';
      }
      if(gettype=='Yesterday'){         
        var end = d.setDate(d.getDate() - 1);
        $scope.startdate = formatonlyDate(end);
        $scope.googledateRangeType = 'YESTERDAY';
        $scope.facebookdaterange = 'yesterday';
      }
      if(gettype=='Last 7 days'){          
        var end = d.setDate(d.getDate() - 7);
        $scope.startdate = formatonlyDate(end);
        $scope.googledateRangeType = 'LAST_7_DAYS';
        $scope.facebookdaterange = 'last_7_days';
      }
      if(gettype=='Last 14 days'){         
        var end = d.setDate(d.getDate() - 14);
        $scope.startdate = formatonlyDate(end);
        $scope.googledateRangeType = 'LAST_14_DAYS';
        $scope.facebookdaterange = 'last_14_days';
      }
      if(gettype=='Last 30 days'){          
        var end = d.setDate(d.getDate() - 30);
        $scope.startdate = formatonlyDate(end);
        $scope.googledateRangeType = 'LAST_30_DAYS';
        $scope.facebookdaterange = 'last_30_days';
      }
      if(gettype=='Last month'){        
        $scope.startdate = formatonlyDate(new Date(d.getFullYear(), d.getMonth()-1, 1));
        $scope.enddate = formatonlyDate(new Date(d.getFullYear(), d.getMonth(), 0));
        $scope.googledateRangeType = 'LAST_MONTH';
        $scope.facebookdaterange = 'last_month';
      }
      if(gettype=='This month'){         
        $scope.startdate = formatonlyDate(new Date(d.getFullYear(), d.getMonth(), 1));
        $scope.enddate = formatonlyDate(new Date(d.getFullYear(), d.getMonth()+1, 0));
        $scope.googledateRangeType = 'THIS_MONTH';
        $scope.facebookdaterange = 'this_month';
      }
      if(gettype=='This year'){ 
        $scope.startdate = formatonlyDate(new Date(new Date().getFullYear(), 0, 1));         
        $scope.enddate = formatonlyDate(new Date(new Date().getFullYear(), 11, 31)); 
        $scope.googledateRangeType = 'ALL_TIME';
        $scope.facebookdaterange = 'lifetime';
      }
      if(gettype=='Custom'){          
        var end = d.setDate(d.getDate() - 7);
        $scope.startdate = formatonlyDate(end);
        $scope.showdatereports = true;
        $scope.googledateRangeType = 'CUSTOM_DATE';
        $scope.facebookdaterange = 'custom';
      }
      var j = 0;
      data.googledateRangeType = $scope.googledateRangeType;
      data.facebookdateRangeType = $scope.facebookdaterange;
      data.breakdown = $scope.breakdown;
      if(data.googledateRangeType=='CUSTOM_DATE'){
          data.startdatereports = formatsearchDate($scope.startdatereports);
          data.enddatereports = formatsearchDate($scope.enddatereports);
      }else{
          data.startdatereports = formatsearchDate($scope.startdate);
          data.enddatereports = formatsearchDate($scope.enddate);
      }
      if(data.networkid==2){
        getgooglereports(data);
      }
      if(data.networkid==1){
        getfacebookreports(data);
      }
  });

function formatsearchDate(convertdate) {
      if(convertdate != '' && convertdate != undefined)
          var today = new Date(convertdate);
      else 
          var today = new Date();

      var dd = today.getDate();
      if(dd<10){ dd='0'+dd; }
      var month = parseInt(today.getMonth())+1;        
      if(month<10){  month='0'+month; } 
      return today.getFullYear()+ "-" + month + "-" + dd;
  }

   function getgooglereports(data){
    $scope.googlecampid = {};
    cfpLoadingBar.start();
    $scope.loadingclass = 'loadingclass';
      $serviceTest.getgooglecampaignreports(data,function(response){
              if(response.code==200) {
                $scope.googlecampaignlist = response.result.data[0];
                $scope.googlecampid.campid = response.result.data[0].campaign;
                console.log($scope.googlecampid);
                if($scope.googlecampid!==undefined && $scope.googlecampid.campid!==undefined && $scope.googlecampid.campid!==null && $scope.googlecampid.campid!==' --'){
                      $serviceTest.getgooglecampaignreportsdetails($scope.googlecampid, function(responses){
                      if(response.code==200) {
                        $scope.googlecampaigndatalist = responses.result[0];
                      }
                      cfpLoadingBar.complete();
                      $scope.loadingclass = '';
                      });
                    }else{
                      cfpLoadingBar.complete();
                      $scope.loadingclass = '';
                    }
              }else{
                $scope.googlecampaignlist = '';
                cfpLoadingBar.complete();
                $scope.loadingclass = '';
              }
      });
  }

  function getfacebookreports(data){
      cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      data.user_id  = $localStorage.userId;
      data.network_id = 1;
      data.configureaccountid = $localStorage.configureaccountid;
      $serviceTest.getfacebookcampaignreports(data,function(response){
           console.log(response);
              if(response.code==200) {
                $scope.facebookcampaignlist = response.result.data;
                cfpLoadingBar.complete();
                $scope.loadingclass = '';
              }else{
                $scope.facebookcampaignlist = '';
                cfpLoadingBar.complete();
                $scope.loadingclass = '';
              }
      });
  }

  $scope.$watch('startdatereports',function(){
    if($scope.googledateRangeType == 'CUSTOM_DATE'){
      var data = {};
      data.userid = $localStorage.userId;
      data.campaignid = $stateParams.campaignid;
      data.reporttype = 'criteria';
      data.facebookdateRangeType = 'custom';
      data.googledateRangeType = $scope.googledateRangeType;
      data.startdatereports = formatsearchDate($scope.startdatereports);
      data.enddatereports = formatsearchDate($scope.enddatereports);
      if($stateParams.networkid != undefined && $stateParams.networkid ==2)
          getgooglereports(data);

      if($stateParams.networkid != undefined && $stateParams.networkid ==1)
          getfacebookreports(data);
      }
  });

  $scope.$watch('enddatereports',function(){
    if($scope.googledateRangeType == 'CUSTOM_DATE'){
      var data = {};
      data.userid = $localStorage.userId;
      data.campaignid = $stateParams.campaignid;
      data.reporttype = 'criteria';
      data.facebookdateRangeType = 'custom';
      data.googledateRangeType = $scope.googledateRangeType;
      data.startdatereports = formatsearchDate($scope.startdatereports);
      data.enddatereports = formatsearchDate($scope.enddatereports);
      if($stateParams.networkid != undefined && $stateParams.networkid ==2)
          getgooglereports(data);

      if($stateParams.networkid != undefined && $stateParams.networkid ==1)
          getfacebookreports(data);
    }
  });

  function formatonlyDate(convertdate) {
        if(convertdate != '' && convertdate != undefined)
            var today = new Date(convertdate);
        else 
            var today = new Date();

        var dd = today.getDate();
        if(dd<10){ dd='0'+dd; }

        var month = today.getMonth();
        
        //if(month<10){  month='0'+month; } 

        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if(convertdate != '' && convertdate != undefined)
          return monthNames[month] + " " + dd + ", " +  today.getFullYear();
        else 
          return monthNames[month] + " " + dd + ", " +  today.getFullYear();
  }



  /****************Graph display in reports ******************************/
 /*======================================================================*/ 
 $scope.typeoptions = [{"title":"LifeTime"},{"title":"Today"},{"title":"Yesterday"},{"title":"Last 7 days"},{"title":"Last 14 days"},{"title":"Last 30 days"},{"title":"Last month"},{"title":"This month"},{"title":"This year"},{"title":"Custom"},]
   $scope.openrep = function() {
    $scope.popuprepo.opened = true;
  };
  $scope.openrepo = function() {
    $scope.popuprepor.opened = true;
  };


  $scope.popuprepo = {
    opened: false
  };
  $scope.popuprepor = {
    opened: false
  };

    $scope.dateoptions = {
    formatYear: 'mm-dd-yy',
    showWeeks: false,
    //minDate: new Date(),
    startingDay: 1
  };

function validateDates() {
    var endDate = $scope.enddatereports;
    var startDate = $scope.startdatereports;  
    var stdate = Date.parse(startdatereports);
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

    $scope.enddatereports = new Date(formatonlyDate());
    var d = new Date();
    var end = d.setDate(d.getDate() - 30);
    $scope.startdatereports = new Date(formatonlyDate(end));



  /****************=====||== Chart Data ==||=====*******************/ 

  $scope.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  $scope.data = [[65, 59, 80, 81, 56, 55, 40]];
  $scope.series = [["Sale"]];
  $scope.colors = ["#2E7D32","#0288D1","#5E35B1","#9E9D24","#FF6F00","#DD2C00","#263238"];
                     // ['#2E7D32','#0288D1','#5E35B1','#9E9D24',"#FF6F00","#DD2C00","#263238"]];   
 /*----------------------------------------------------------------------*/ 

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
}]).filter('cmdatenew', [
    '$filter', function($filter) {
        return function(input, format) {
            if(format=='hh'){
              if(input!=undefined){
                  var timelist = input.split(' - ');
                  var time1 = timelist[0].split(':');
                  var time2 = timelist[1].split(':');
                  var min1 = time1[1];
                  var hour1 = time1[0];
                  var ampm1 = 'AM';                  
                  if (hour1 >= 12) { ampm1 = 'PM'; } 
                  if (hour1 > 12) { hour1 = hour1 - 12; }
                  var newtime1 = hour1 + ":" + min1 + " " +  ampm1;

                  var min2 = time2[1];
                  var hour2 = time2[0];
                  var ampm2 = 'AM';                  
                  if (hour2 >= 12) { ampm2 = 'PM'; } 
                  if (hour2 > 12) { hour2 = hour2 - 12; }
                  var newtime2 = hour2 + ":" + min2 + " " +  ampm2;

                  return newtime1 + " - " + newtime2;
              }
              
            }else {
              var today = new Date(input);
              var dd = today.getDate();
              if(dd<10){ dd='0'+dd; }
              var month = today.getMonth(); 
              var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              return monthNames[month] + " " + dd + ", " +  today.getFullYear();
              //return $filter('date')(new Date(input), format);
            }
              
        };
    }
]);
