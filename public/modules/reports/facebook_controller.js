/**
  Angular Controller to Manage Network Budget, Placement and Audience
  Created : 2016-05-17
  Created By: Regal Singh
  Module : Get Network Budget
*/


angular.module('alisthub', ['ui.bootstrap','angularjs-datetime-picker','angular-loading-bar','ngTagsInput','angularjs-dropdown-multiselect','ngTouch','chart.js','angularUtils.directives.dirPagination']).controller('facebookReportController', function($scope,$localStorage,$stateParams,$injector,$http,$state,$location,$rootScope,$window,$parse,$filter,$anchorScroll,cfpLoadingBar) {
   
  $anchorScroll();

  $scope.facebookdaterange = 'last_7_days';
   //For Step 1
  $scope.searchcampiagn = '1,2';
  $scope.findcampaign = '';
  $scope.datetype = 'Last 7 days';
  $scope.datastatus = '';
  $scope.graphtype = 'Spend';
  var data = {};
  data.userid = $localStorage.userId;
  data.reporttype = 'campaign';
  var $serviceTest = $injector.get("report");
  if($stateParams.campaignname!="" && $stateParams.campaignname!=undefined){
    $scope.findcampaign = $stateParams.campaignname;
  }
  
  $anchorScroll();
  
  //////////////////////////////////////////////////
  
  Highcharts.chart('container',{
        chart: {
            type: 'column'
        },
        title: {
            text: 'Facebook Report'
        },
        subtitle: {
            text: 'Facebook ads report'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: 'Age',
            colorByPoint: true,
            data: [{
                name: 'Clicks',
                y: 56.33,
                drilldown: 'Clicks1'
            }, {
                name: 'Impression',
                y: 24.03,
                drilldown: 'Impression1'
            }, {
                name: 'CPM',
                y: 10.38,
                drilldown: 'CPM1'
            }, {
                name: 'CPP',
                y: 4.77,
                drilldown: 'CPP1'
            }, {
                name: 'Spend',
                y: 0.91,
                drilldown: 'Spend1'
            }, {
                name: 'Social click',
                y: 0.2,
                drilldown: null
            }]
        }],
        drilldown: {
            series: [{
                name: 'Clicks',
                id: 'Clicks1',
                data: [
                    [
                        '11.0',
                        24.13
                    ],
                    [
                        '8.0',
                        17.2
                    ],
                    [
                        '9.0',
                        8.11
                    ],
                    [
                        '10.0',
                        5.33
                    ],
                    [
                        '6.0',
                        1.06
                    ],
                    [
                        '7.0',
                        0.5
                    ]
                ]
            }, {
                name: 'Impression',
                id: 'Impression',
                data: [
                    [
                        'v40.0',
                        5
                    ],
                    [
                        'v41.0',
                        4.32
                    ],
                    [
                        'v42.0',
                        3.68
                    ],
                    [
                        'v39.0',
                        2.96
                    ],
                    [
                        'v36.0',
                        2.53
                    ],
                    [
                        'v43.0',
                        1.45
                    ],
                    [
                        'v31.0',
                        1.24
                    ],
                    [
                        'v35.0',
                        0.85
                    ],
                    [
                        'v38.0',
                        0.6
                    ],
                    [
                        'v32.0',
                        0.55
                    ],
                    [
                        'v37.0',
                        0.38
                    ],
                    [
                        'v33.0',
                        0.19
                    ],
                    [
                        'v34.0',
                        0.14
                    ],
                    [
                        'v30.0',
                        0.14
                    ]
                ]
            }, {
                name: 'CPM',
                id: 'CPM',
                data: [
                    [
                        'v35',
                        2.76
                    ],
                    [
                        'v36',
                        2.32
                    ],
                    [
                        'v37',
                        2.31
                    ],
                    [
                        'v34',
                        1.27
                    ],
                    [
                        'v38',
                        1.02
                    ],
                    [
                        'v31',
                        0.33
                    ],
                    [
                        'v33',
                        0.22
                    ],
                    [
                        'v32',
                        0.15
                    ]
                ]
            }, {
                name: 'CPP',
                id: 'CPP1',
                data: [
                    [
                        'v8.0',
                        2.56
                    ],
                    [
                        'v7.1',
                        0.77
                    ],
                    [
                        'v5.1',
                        0.42
                    ],
                    [
                        'v5.0',
                        0.3
                    ],
                    [
                        'v6.1',
                        0.29
                    ],
                    [
                        'v7.0',
                        0.26
                    ],
                    [
                        'v6.2',
                        0.17
                    ]
                ]
            }, {
                name: 'Spend',
                id: 'Spend',
                data: [
                    [
                        'v12.x',
                        0.34
                    ],
                    [
                        'v28',
                        0.24
                    ],
                    [
                        'v27',
                        0.17
                    ],
                    [
                        'v29',
                        0.16
                    ]
                ]
            }]
        }
    });
  
  
  ////////////////////////////////////////////////////
  
  
  //var $servicecfpLoadingBar = $injector.get("cfpLoadingBar");
  $scope.spendgraph = true;
  $scope.impressiongraph=false;
  $scope.clicksgraph = false; 
  $scope.pagesize = '10';
  $scope.$watch('searchcampiagn',function(){ 
      //cfpLoadingBar.start();
      //managefacebookcampaigndata();
  });

  $scope.searchdata = function(){
    managegraph();
    managefacebookcampaigndata();
  }
  
 
  $scope.customsearchdata = function(){
        $scope.labelvalues = []; 
        $scope.startdate = formatonlyDate($scope.startdatereports);
        $scope.enddate = formatonlyDate($scope.enddatereports);
        $scope.facebookstartdate = formatsearchDate($scope.startdatereports);
        $scope.facebookenddate = formatsearchDate($scope.enddatereports);       
        //$scope.graph_date = [{"start_date":$scope.startdatereports,"end_date":$scope.enddatereports}];        
        //$scope.labelvalues.push("","",graphDate($scope.startdatereports)+' - '+graphDate($scope.enddatereports),"","","");
        //managefacebookcampaigndata();
        // managegraph();
        calculatedaterange();
  }

  function remove_duplicates_safe(arr) {
    var seen = {};
    var arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            arr2.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return arr2;
  }

  function graphDate(convertdate) {
    var today = new Date(convertdate);     
    var dd = today.getDate();
    if(dd<10){ dd='0'+dd; }
    var month = parseInt(today.getMonth());   
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return  dd + " " + monthNames[month];
  }

  $scope.$watch('graphtype',function(){
    if($scope.graphtype=='Spend'){ 
      $scope.spendgraph = true;$scope.impressiongraph=false;$scope.clicksgraph = false;
    }
    if($scope.graphtype=='Impressions'){ 
      $scope.spendgraph = false;$scope.impressiongraph=true;$scope.clicksgraph = false;
    }
    if($scope.graphtype=='Clicks'){ 
      $scope.spendgraph = false;$scope.impressiongraph=false;$scope.clicksgraph = true;
    }
   
  });
  
  $scope.$watch('datetype',function(){
      $scope.showdatereports =false;
      var gettype = $scope.datetype;
      $scope.enddate = formatonlyDate();
      $scope.facebookenddate = formatsearchDate();
      var d = new Date();
      if(gettype=='LifeTime'){
        $scope.labelvalues = [];          
        var end = d.setDate(d.getDate() - 365);
        $scope.startdate = formatonlyDate(end);
        $scope.facebookstartdate = formatsearchDate(end);
        $scope.facebookdaterange = 'lifetime';
        $scope.graph_date = [{"start_date":$scope.facebookstartdate,"end_date":$scope.facebookenddate}]; 

        $scope.labelvalues.push('Life Time');
        managefacebookcampaigndata();
        managegraph();
      }
      if(gettype=='Today'){  
        $scope.labelvalues = [];      
        $scope.startdate = formatonlyDate();
        $scope.facebookstartdate = formatsearchDate();
        $scope.googledateRangeType = 'TODAY';
        $scope.facebookdaterange = 'today';
        $scope.graph_date = [{"start_date":$scope.facebookstartdate,"end_date":$scope.facebookenddate}];
        
        $scope.labelvalues.push("","","Today","","","");
        managefacebookcampaigndata();
        managegraph();
      }
      if(gettype=='Yesterday'){
        $scope.labelvalues = [];          
        var end = d.setDate(d.getDate() - 1);
        $scope.startdate = formatonlyDate(end);
        $scope.facebookstartdate = formatsearchDate(end);
        $scope.googledateRangeType = 'YESTERDAY';
        $scope.facebookdaterange = 'yesterday';
        $scope.graph_date = [{"start_date":$scope.facebookstartdate,"end_date":$scope.facebookenddate}];
        
        $scope.labelvalues.push("","","Yesterday","","","");
        managefacebookcampaigndata();
        managegraph();
      }
      if(gettype=='Last 7 days'){  
        $scope.labelvalues = []; 
        $scope.graph_date = [];       
        var end = d.setDate(d.getDate() - 7);
        $scope.startdate = formatonlyDate(end);
        $scope.facebookstartdate = formatsearchDate(end);
        $scope.googledateRangeType = 'LAST_7_DAYS';
        $scope.facebookdaterange = 'last_7_days';

        for(var i=1;i<8;i=i+1){
          var setdate = i; 
          var setdate = formatsearchDate(new Date().setDate(new Date().getDate() - i));
          $scope.graph_date.push({"start_date":setdate,"end_date":setdate});
          $scope.labelvalues.push(graphDate(setdate));
        }
        managefacebookcampaigndata();
        managegraph();
      }
      if(gettype=='Last 14 days'){ 
        $scope.labelvalues = [];
        $scope.graph_date = [];         
        var end = d.setDate(d.getDate() - 14);
        $scope.startdate = formatonlyDate(end);
        $scope.facebookstartdate = formatsearchDate(end);
        $scope.googledateRangeType = 'LAST_14_DAYS';
        $scope.facebookdaterange = 'last_14_days';
                
        for(var i=1;i<15;i=i+1){
          var setdate = i; 
          var setdate = formatsearchDate(new Date().setDate(new Date().getDate() - i));
          $scope.graph_date.push({"start_date":setdate,"end_date":setdate});
          $scope.labelvalues.push(graphDate(setdate));
        }
       
        managefacebookcampaigndata();
        managegraph();
      }
      if(gettype=='Last 30 days'){ 
        $scope.labelvalues = []; 
        $scope.graph_date = [];              
        var end = d.setDate(d.getDate() - 30);
        $scope.startdate = formatonlyDate(end);
        $scope.facebookstartdate = formatsearchDate(end);
        $scope.googledateRangeType = 'LAST_30_DAYS';
        $scope.facebookdaterange = 'last_30_days';

        for(var i=1;i<31;i=i+1){
          var setdate = i; 
          var setdate = formatsearchDate(new Date().setDate(new Date().getDate() - i));
          $scope.graph_date.push({"start_date":setdate,"end_date":setdate});
          $scope.labelvalues.push(graphDate(setdate));
        }
        managefacebookcampaigndata();
        managegraph();
      }
      if(gettype=='Last month'){
        $scope.labelvalues = [];
        $scope.graph_date = [];              
        $scope.startdate = formatonlyDate(new Date(d.getFullYear(), d.getMonth()-1, 1));
        $scope.enddate = formatonlyDate(new Date(d.getFullYear(), d.getMonth(), 0));
        $scope.facebookstartdate = formatsearchDate(new Date(d.getFullYear(), d.getMonth()-1, 1));
        $scope.facebookenddate = formatsearchDate(new Date(d.getFullYear(), d.getMonth(), 0));
        $scope.googledateRangeType = 'LAST_MONTH';
        $scope.facebookdaterange = 'last_month';
        var totaldays = 32;
        var month =  d.getMonth()-1;
        if(month==3 || month==5 || month==8 || month==11){ totaldays = 31; }
        if(month==1){ totaldays = 29; }
        for(var i=1;i<totaldays;i=i+1){
          var setdate = i; 
          var setdate = formatsearchDate(new Date(d.getFullYear(), d.getMonth()-1, i));
          $scope.graph_date.push({"start_date":setdate,"end_date":setdate});
          $scope.labelvalues.push(graphDate(setdate));
        }
        managefacebookcampaigndata();
        managegraph();
      }

      if(gettype=='This month'){ 
        $scope.labelvalues = [];  
        $scope.graph_date = [];           
        $scope.startdate = formatonlyDate(new Date(d.getFullYear(), d.getMonth(), 1));
        $scope.enddate = formatonlyDate(new Date(d.getFullYear(), d.getMonth()+1, 0));
        $scope.facebookstartdate = formatsearchDate(new Date(d.getFullYear(), d.getMonth(), 1));
        $scope.facebookenddate = formatsearchDate(new Date(d.getFullYear(), d.getMonth()+1, 0));
        $scope.googledateRangeType = 'THIS_MONTH';
        $scope.facebookdaterange = 'this_month';
        var totaldays = 32;
        if(d.getMonth()==3 || d.getMonth()==5 || d.getMonth()==8 || d.getMonth()==11){  totaldays = 31; }
        if(d.getMonth()==1){ totaldays = 29; }
        for(var i=1;i<totaldays;i=i+1){
          var setdate = i; 
          var setdate = formatsearchDate(new Date(d.getFullYear(), d.getMonth(), i));
          $scope.graph_date.push({"start_date":setdate,"end_date":setdate});
          $scope.labelvalues.push(graphDate(setdate));
        }
        managefacebookcampaigndata();
        managegraph();
      }
      if(gettype=='This year'){ 
        $scope.labelvalues = []; 
        $scope.graph_date = [];     
        $scope.startdate = formatonlyDate(new Date(new Date().getFullYear(), 0, 1));         
        $scope.enddate = formatonlyDate(new Date(new Date().getFullYear(), 11, 31)); 
        $scope.facebookstartdate = formatsearchDate(new Date(new Date().getFullYear(), 0, 1));
        $scope.facebookenddate = formatsearchDate(new Date(new Date().getFullYear(), 11, 31)); 
        $scope.googledateRangeType = 'ALL_TIME';
        $scope.facebookdaterange = 'lifetime';
        var startdate1 = formatsearchDate(new Date(new Date().getFullYear(), 0, 1));
        var enddate1 = formatsearchDate(new Date(new Date().getFullYear(), 0, 31));
        var startdate2 = formatsearchDate(new Date(new Date().getFullYear(), 1, 1));
        var enddate2 = formatsearchDate(new Date(new Date().getFullYear(), 1, 29));
        var startdate3 = formatsearchDate(new Date(new Date().getFullYear(), 2, 1));
        var enddate3 = formatsearchDate(new Date(new Date().getFullYear(), 2, 31));
        var startdate4 = formatsearchDate(new Date(new Date().getFullYear(), 3, 1));
        var enddate4 = formatsearchDate(new Date(new Date().getFullYear(), 3, 30));
        var startdate5 = formatsearchDate(new Date(new Date().getFullYear(), 4, 1));
        var enddate5 = formatsearchDate(new Date(new Date().getFullYear(), 4, 31));
        var startdate6 = formatsearchDate(new Date(new Date().getFullYear(), 5, 1));
        var enddate6 = formatsearchDate(new Date(new Date().getFullYear(), 5, 30));
        var startdate7 = formatsearchDate(new Date(new Date().getFullYear(), 6, 1));
        var enddate7 = formatsearchDate(new Date(new Date().getFullYear(), 6, 31));
        var startdate8 = formatsearchDate(new Date(new Date().getFullYear(), 7, 1));
        var enddate8 = formatsearchDate(new Date(new Date().getFullYear(), 7, 31));
        var startdate9 = formatsearchDate(new Date(new Date().getFullYear(), 8, 1));
        var enddate9 = formatsearchDate(new Date(new Date().getFullYear(), 8, 30));
        var startdate10 = formatsearchDate(new Date(new Date().getFullYear(), 9, 1));
        var enddate10 = formatsearchDate(new Date(new Date().getFullYear(), 9, 31));
        var startdate11 = formatsearchDate(new Date(new Date().getFullYear(), 10, 1));
        var enddate11 = formatsearchDate(new Date(new Date().getFullYear(), 10, 30));
        var startdate12 = formatsearchDate(new Date(new Date().getFullYear(), 11, 1));
        var enddate12 = formatsearchDate(new Date(new Date().getFullYear(), 11, 31));
        $scope.graph_date = [{"start_date":startdate1,"end_date":enddate1},{"start_date":startdate2,"end_date":enddate2},{"start_date":startdate3,"end_date":enddate3},{"start_date":startdate4,"end_date":enddate4},{"start_date":startdate5,"end_date":enddate5},{"start_date":startdate6,"end_date":enddate6},{"start_date":startdate7,"end_date":enddate7},{"start_date":startdate8,"end_date":enddate8},{"start_date":startdate9,"end_date":enddate9},{"start_date":startdate10,"end_date":enddate10},{"start_date":startdate11,"end_date":enddate11},{"start_date":startdate12,"end_date":enddate12}];

        $scope.labelvalues.push("Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        managefacebookcampaigndata();
        managegraph();
      }
      if(gettype=='Custom'){  
        $scope.labelvalues = [];         
        var end = d.setDate(d.getDate() - 7);
        $scope.startdate = formatonlyDate($scope.startdatereports);
        $scope.enddate = formatonlyDate($scope.enddatereports);
        $scope.facebookstartdate = formatsearchDate($scope.startdatereports);
        $scope.facebookenddate = formatsearchDate($scope.enddatereports);
        $scope.showdatereports = true;
        $scope.googledateRangeType = 'ALL_TIME';
        $scope.facebookdaterange = 'custom';
        calculatedaterange();
       
      }

  });

 function calculatedaterange(){
        var date1 = new Date($scope.startdatereports);
        var date2 = new Date($scope.enddatereports);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));         
        $scope.labelvalues = []; 
        $scope.graph_date = []; 
        if(diffDays>7){
          var daysdate = parseInt(diffDays/8);
          for(var i=1;i<9;i=i+1){
            if(i==1){
              var enddif = diffDays-daysdate;
              var setstartdate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - diffDays));
              var setenddate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - enddif));
              $scope.graph_date.push({"start_date":setstartdate,"end_date":setenddate});
              $scope.labelvalues.push(graphDate(setstartdate)+'-'+graphDate(setenddate));
            }else if(i==8){              
              var setstartdate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - enddif1));
              var setenddate = formatsearchDate(new Date($scope.enddatereports));
              $scope.graph_date.push({"start_date":setstartdate,"end_date":setenddate});
              $scope.labelvalues.push(graphDate(setstartdate)+'-'+graphDate(setenddate));
            }else {              
              var addt = i-1;
              var enddif = diffDays-(daysdate*(addt)+addt);
              var enddif1 = enddif-daysdate;
              var setstartdate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - enddif));
              var setenddate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - enddif1));
              $scope.graph_date.push({"start_date":setstartdate,"end_date":setenddate});
              $scope.labelvalues.push(graphDate(setstartdate)+'-'+graphDate(setenddate));
            }            
          }
        }else {
         for(var i=0;i<diffDays+1;i=i+1){              
              var setdate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - i));
              $scope.graph_date.push({"start_date":setdate,"end_date":setdate});
              $scope.labelvalues.push(graphDate(setdate));
          }
        }       


        managefacebookcampaigndata();
        managegraph();
 }


function managefacebookcampaigndata(){
    cfpLoadingBar.start();
    $scope.loadingclass = 'loadingclass'; 
    var data = {};
    data.account_id = '114882752278348';
    data.start_date = $scope.facebookstartdate;
    data.end_date = $scope.facebookenddate;
    data.campaignname = $scope.findcampaign;
    data.groupname = $scope.findcampaigngroup;
    data.objectivename = $scope.findcampaignobjective;
    data.network_id = $scope.searchcampiagn;
    var j = 0;
    $scope.campaignnamelist = [];
    $scope.groupnamelistnew = [];
    $scope.objectivenamelistnew = [];
    $scope.campaignlist = [];    
    $serviceTest.getcampaignreportlist(data,function(response){
        if(response.code==200) {               
          $scope.campaignlist = response.result;                
          angular.forEach($scope.campaignlist, function(value, key){
              $scope.campaignnamelist[j] = value.campaign_name;
              $scope.groupnamelistnew[j] = value.group_name;                   
              $scope.objectivenamelistnew[j] = value.objective; 
              j = j+1;                  
          });
          $scope.groupnamelist= remove_duplicates_safe($scope.groupnamelistnew);
          $scope.objectivenamelist = remove_duplicates_safe($scope.objectivenamelistnew);
          cfpLoadingBar.complete();
        }else{
          $scope.campaignlist = '';
          cfpLoadingBar.complete();
          $scope.loadingclass = '';
        }        
    });
}




/*function managefacebookcampaigndata(){
    var data = {};
    data.datetype = 'custom';//$scope.facebookdaterange;
    data.start_date = '2016-07-08';
    data.end_date = '2016-07-09';
    var j = 0;
    $scope.campaignnamelist = [];
    $scope.groupnamelistnew = [];
    $scope.objectivenamelistnew = [];
    $scope.campaignlist = [];    
    $serviceTest.getcampaignreportlist(data,function(response){
        if(response.code==200) {               
          $scope.campaignlistnew = response.result.data[0]['campaigns']['data'];                
          angular.forEach($scope.campaignlistnew, function(value, key){
              $scope.campaignnamelist[j] = value.name;
              $scope.groupnamelistnew[j] = value.adsets.data[0].name;                   
              $scope.objectivenamelistnew[j] = value.objective;                     
                    
              if(value.insights!=undefined){
                $scope.campaignlist.push({'name':value.name,"objective":value.objective,"status":value.status,"spend":value.insights.data[0].spend,"impressions":value.insights.data[0].impressions,"cpm":value.insights.data[0].cpm.toFixed(2),"cpc":value.insights.data[0].cpc,"ctr":value.insights.data[0].ctr.toFixed(2),"clicks":value.insights.data[0].clicks,"date_start":formatonlyDate(value.insights.data[0].date_start)+" - ","date_stop":formatonlyDate(value.insights.data[0].date_stop),"group_name":value.adsets.data[0].name});                        
              }else {
                $scope.campaignlist.push({'name':value.name,"objective":value.objective,"status":value.status,"spend":0,"impressions":0,"cpm":0,"cpc":0,"ctr":0,"clicks":0,"date_start":'ongoing',"date_stop":'',"group_name":value.adsets.data[0].name});    
              }
             j = j+1;                  
          });
          $scope.groupnamelist= remove_duplicates_safe($scope.groupnamelistnew);
          $scope.objectivenamelist = remove_duplicates_safe($scope.objectivenamelistnew);
          cfpLoadingBar.complete();
        }else{
          $scope.campaignlist = '';
          cfpLoadingBar.complete();
        }
        
    });
}*/
//cropdatasetup();

function cropdatasetup(){  
  var postdata = ''; 
  postdata.user_id  = $localStorage.userId;
  postdata.network_id = 1;
  postdata.configureaccountid = $localStorage.configureaccountid;   
  $serviceTest.addcampaignreportlist(postdata,function(response){
      if(response.code==200) {               
        console.log('record added for today');      
      }      

      var j = 0; 

  });
}

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
        
        return monthNames[month] + " " + dd + ", " +  today.getFullYear();
  }

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
    formatYear: 'yy',
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

  function managegraph(){
      $scope.spenddata = []; 
      $scope.impressiondata= []; 
      $scope.clicksdata= []; 
      cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      $scope.labels = $scope.labelvalues;
      var postdata = {};
      postdata.graphdate = $scope.graph_date;
      postdata.account_id = '114882752278348';
      postdata.campaignname = $scope.findcampaign;
      postdata.groupname = $scope.findcampaigngroup;
      postdata.objectivename = $scope.findcampaignobjective;
      postdata.network_id = $scope.searchcampiagn;
      $serviceTest.reportdetails(postdata,function(response){
        if(response.code==200) { 
          $scope.spendgrapgdatarec= []; 
          $scope.impressiongrapgdatarec= []; 
          $scope.clicksgrapgdatarec= [];             
          $scope.campaigndatalist = response.result;
          var stotal = 0;
          var imtotal = 0;
          var clitotal = 0;
          if($scope.datetype=='Today' || $scope.datetype=='Yesterday'){
            $scope.spendgrapgdatarec.push("","");
            $scope.impressiongrapgdatarec.push("","");
            $scope.clicksgrapgdatarec.push("",""); 
          }
            
          angular.forEach($scope.campaigndatalist, function(value, key){
                  if(value.spendtotal==null){ value.spendtotal =''; }
                  if(value.impressionstotal==null){ value.impressionstotal =''; }
                  if(value.clickstotal==null){ value.clickstotal =''; }
                  $scope.spendgrapgdatarec.push(value.spendtotal);  
                  $scope.impressiongrapgdatarec.push(value.impressionstotal); 
                  $scope.clicksgrapgdatarec.push(value.clickstotal); 
                  if(value.spendtotal!=''){
                    stotal = parseFloat(stotal)+ value.spendtotal;
                  }
                  if(value.impressionstotal!=''){
                    imtotal = parseFloat(imtotal)+ value.impressionstotal;
                  }
                  if(value.clickstotal!=''){
                    clitotal = parseFloat(clitotal)+ value.clickstotal;
                  }

          });
          console.log($scope.labelvalues);
          console.log($scope.spendgrapgdatarec);
          $scope.spendtotal = stotal;
          $scope.impressiontotal = imtotal;
          $scope.clickstotal = clitotal;
          $scope.spenddata = [$scope.spendgrapgdatarec];
          $scope.impressiondata = [$scope.impressiongrapgdatarec];
          $scope.clicksdata = [$scope.clicksgrapgdatarec];
          $scope.spendseries = [['Spend ($)']];
          $scope.options = { legend: { display: true } };
          $scope.impressionseries=[['Impressions']];
          $scope.clicksseries=[['Clicks']];
          $scope.spendcolorseries = ["#efad4d"];
          $scope.impressioncolorseries = ["#5db85b"];
          $scope.clickscolorseries = ["#d8524f"];         
          cfpLoadingBar.complete();
          $scope.loadingclass = '';
        }else{
          $scope.campaignlist = '';
          cfpLoadingBar.complete();
          $scope.loadingclass = '';
        }        
      });
     
      

      
  }
  
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