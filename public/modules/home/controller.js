/**
Angular Controller to manage dashboard setup
Created : 2016-09-16
Created By: Manoj Kumar Singh
Module : Dashboard Setup
*/

angular.module('alisthub').controller('homeController', function($scope,$localStorage,$location,$rootScope,$injector,ngDialog,$uibModal,cfpLoadingBar,$state ,SweetAlert,$anchorScroll,$timeout) {


  $rootScope.class_status=false;
  if(window.innerWidth>767){  
      $scope.navCollapsed = false;    
  }else{ 
      $scope.navCollapsed = true;
      $scope.toggleMenu = function() {
        $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
  }
  
  $scope.status1 = {
    isopen: false
  };
  $scope.status2 = {
    isopen: false
  };
  $scope.status5 = {
    isopen: false
  };
  $scope.status8 = {
    isopen: false
  };
  $scope.status9 = {
    isopen: false
  };
  $scope.status10 = {
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

    //$localStorage.configureaccountid = '114963642270259';
  $localStorage.configureaccountid = '';
  //$scope.marketingpage = 'current-menu-item';
  var $serviceTest = $injector.get("home");
  
  $anchorScroll();
  //var $servicecfpLoadingBar = $injector.get("cfpLoadingBar");
  
  $scope.facebookdata   = true;
  $scope.searchcampiagn = '1';
  $scope.googledata     = false;
  $scope.pagesize       = '10';
  $scope.input_filter   = {};
  $scope.input_filter.id= "7";
  $scope.filter_title   = '7 Days';
  //$scope.filter_options = [{id: 7,label: 'Last 7 Days'}, {id: 16,label: 'Last 15 Days'},{id: 31,label: 'Last 30 Days'},{id: 'custom',label: 'Custom'}];
  var data              = {};
  
    
  
  $scope.graphDate = function(convertdate) {
      var today = new Date(convertdate);     
      var dd = today.getDate();
      if(dd<10){ dd='0'+dd; }
      var month = parseInt(today.getMonth());   
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return  dd + " " + monthNames[month];
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
        return today.getFullYear()+ ":" + month + ":" + dd + " 00:00:00";
  }
  
  $scope.graphdaterange = function(startdatereports,enddatereports){
    var date1 = new Date($scope.startdatereports);
    var date2 = new Date($scope.enddatereports);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    $scope.labelvalues = [];
    $scope.graph_date = [];
    console.log(timeDiff +"::::"+diffDays);
  }
  
  $scope.calculatedaterange = function(startdatereports,enddatereports){
        $scope.startdatereports = startdatereports;
        $scope.enddatereports   = enddatereports;
                
        var date1 = new Date($scope.startdatereports);
        var date2 = new Date($scope.enddatereports);
        
        console.log(date1 +":::"+date2);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        $scope.labelvalues = [];
        $scope.graph_date = [];
        console.log(diffDays);
        if(diffDays>=7){
          var daysdate = parseInt(diffDays/7);
          for(var i=1;i<9;i=i+1){
            if(i==1){
              var enddif = diffDays-daysdate;
              var setstartdate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - diffDays));
              var setenddate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - enddif));
            console.log(setstartdate+" ::: "+setenddate);
            $scope.graph_date.push({"start_date":setstartdate,"end_date":setenddate});
            $scope.labelvalues.push(setstartdate+'-'+setenddate);
            console.log($scope.graph_date);
            } else if(i==7){
              var setstartdate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - enddif1));
              var setenddate = formatsearchDate(new Date($scope.enddatereports));
$scope.graph_date.push({"start_date":setstartdate,"end_date":setenddate});
$scope.labelvalues.push(setstartdate+'-'+setenddate);
            } else {
              var addt = i-1;
              var enddif = diffDays-(daysdate*(addt)+addt);
              var enddif1 = enddif-daysdate;
              var setstartdate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - enddif));
              var setenddate   = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - enddif1));
            $scope.graph_date.push({"start_date":setstartdate,"end_date":setenddate});
            $scope.labelvalues.push($scope.graphDate(setstartdate)+'-'+$scope.graphDate(setenddate));
          }
          }
        }else {
          for(var i=0;i<diffDays+1;i=i+1){
              var setdate = formatsearchDate(new Date($scope.enddatereports).setDate(new Date($scope.enddatereports).getDate() - i));
              $scope.graph_date.push({"start_date":setdate,"end_date":setdate});
              $scope.labelvalues.push($scope.graphDate(setdate));
          }
        }
      console.log($scope.graph_date);
      console.log($scope.labelvalues);  
  }
  
  // Get filter
  $scope.show_custom = 0;
  $scope.getFilter   = function(str)
  {
    console.log(str);
    if (str != 'custom') {
     $scope.filter_title   = str+' Days'; 
     $scope.show_custom      = 0;
     var todayDate           = new Date();
     $scope.startdatereports = todayDate;
     $scope.enddatereports   = new Date(todayDate).setDate(new Date(todayDate).getDate() - (parseInt($scope.input_filter.id)));
     
     //$scope.calculatedaterange($scope.startdatereports,$scope.enddatereports);
     console.log($scope.startdatereports +"::::::"+ $scope.enddatereports);
     //$scope.format      = $scope.data($scope.input_filter);
    }else{
     $scope.show_custom = 1;
     $scope.filter_title   = 'Custom';
    }
  }
  
  $scope.getFilter(7);
  
  $scope.draw_graph = function(child)
  {
    var data = {
      title: {
        text: child.chart_title
      },
      chart: child.chart,
      xAxis: child.xAxis,
      series: child.series,
    }
    if (child.yAxis) {
      data.yAxis = child.yAxis;
    }
    if (child.plotOptions) {
      data.plotOptions = child.plotOptions;
    }
    if (child.tooltip) {
      data.tooltip    = child.tooltip;
    }
        
    return data;
  }
  
  
  ////////////////////////////////////////////// Comparison Graphs ////////////////////////////////////////////////////////////
  $scope.comparison             = {};
  $scope.cgraph_type            = 'line';
  $scope.comparison.chart_title = 'Comparison Data';
  
  $scope.comparison_graph  = function(){
  $scope.comparison.chart  = {type:$scope.cgraph_type};
  $scope.comparison.xAxis  = {categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']};
  $scope.comparison.series = [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color: '#FF0000',
        name: 'Clicks'
      },
      {
        data: [39.9, 51.5, 106.4, 149.2, 144.0, 106.0, 105.6, 148.5, 206.4, 194.1, 90.6, 44.4],
        color: '#004080',
        name: 'Impression'
      }];
  Highcharts.chart('container', $scope.draw_graph($scope.comparison));
  }
  
  $scope.comparison_graph();
  /////////////////////////////////////////// Comparison  Graphs //////////////////////////////////////////////////////////////
  
  ////////////////////////////////////////////// Facebook Graphs ////////////////////////////////////////////////////////////
    
  $scope.facebook_graph = function(str){
  
  $scope.fb_chart_title = str;
  
  $scope.facebook = {};
  $scope.facebook.chart_title     = 'Age wise data';
  $scope.facebook.chart_sub_title = 'Source: Facebook ads data';
  $scope.facebook.chart           = {type:str};
  $scope.facebook.xAxis           = [{
                categories: ['13-17', '18-24', '25-34', '35-44', '45-54', '55+'],
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: ['13-17', '18-24', '25-34', '35-44', '45-54', '55+'],
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }];
  $scope.facebook.yAxis = {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    }
                }
            };
  
  
  $scope.facebook.series          = [{
                name: 'Male',
                data: [-12.5, -22.3, -11.2, -20.6, -10.2, -30.0],
                color:'#4B6DAA'
            }, {
                name: 'Female',
                data: [2.5, 12.3, 31.2, 30.6, 15.2, 25.0],
                color:'#A8B6D1'
            }];
  $scope.facebook.plotOptions = {
                series: {
                    stacking: 'normal'
                }
            },

  $scope.facebook.tooltip = {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Age: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            }
  Highcharts.chart('container_fb', $scope.draw_graph($scope.facebook));
  }
  $scope.facebook_graph('bar');
  
  ////////////////////////////////////////////// Facebook Graphs ////////////////////////////////////////////////////////////
  
  
  /////////////////////////////////////////// Sales Graphs //////////////////////////////////////////////////////////////
  $scope.sales_graph = function(str){
  $scope.sales_graph_title = str;
  $scope.sales = {};
  $scope.sales.chart_title     = 'Ticket Sales';
  $scope.sales.chart_sub_title = 'Source: sales';
  $scope.sales.chart           = {type:str};
  $scope.sales.xAxis           = {
            categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            crosshair: true
        };
  $scope.sales.yAxis = {
            min: 0,
            title: {
                text: 'Number'
            }
        };
  
  $scope.sales.series       = [{
            name: 'Ticket Sold',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            color:'#FF0000' 
        }, {
            name: 'Total Revenue',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
            color:'#004080'
        }];
  $scope.sales.plotOptions = {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
  $scope.sales.tooltip = {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        }
  Highcharts.chart('container_sales', $scope.draw_graph($scope.sales));
  }
  $scope.sales_graph('column');
  /////////////////////////////////////////// Sales Graphs //////////////////////////////////////////////////////////////
  
 
  /////////////////////////////////////////// Email Graphs //////////////////////////////////////////////////////////////
  $scope.email_graph = function(str){
  $scope.email_graph_title = str;
  $scope.email = {};
  $scope.email.chart           =  {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: str,
                options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
            };
  $scope.email.chart_title     = 'Email Marketing';
  $scope.email.chart_sub_title = 'Source: sales';
  $scope.email.chart_type      = $scope.sgraph_type;
  $scope.email.xAxis           = {
            categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            crosshair: true
        };
  $scope.email.yAxis           = {
            min: 0,
            title: {
                text: 'Number'
            }
        };
  
  
  $scope.email.series         = [{
                name: 'Percent',
                colorByPoint: true,
                data: [{
                    name: 'Opened',
                    y: 56.33
                }, {
                    name: 'Links Clicked',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Bounced',
                    y: 10.38
                }, {
                    name: 'Unopened',
                    y: 4.77
                }, {
                    name: ' Unsubscribes',
                    y: 0.91
                }]
            }];
  $scope.email.plotOptions   = {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
  $scope.email.tooltip = {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            };
  Highcharts.chart('container_email', $scope.draw_graph($scope.email));
  }
  $scope.email_graph('pie');
  
  /////////////////////////////////////////// Email Graphs ////////////////////////////////////////////////////////////// 
    
  function sortNumber(a,b) {
      return a - b;
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
      return  month + "-" + dd + "-" + today.getFullYear();
  }

})

.filter('underscoreless', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
}).filter('myFilter', function() {
   return function(input) {
     return input !== null ? input : 'NA';
   }
}).filter('mynewFilter', function() {
   return function(input) {
     return input !== null ? input : '0';
   }
});
