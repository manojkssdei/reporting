/**
Angular Controller to manage dashboard setup
Created : 2016-09-16
Created By: Manoj Kumar Singh
Module : Dashboard Setup
*/

angular.module('alisthub').controller('homeController', function($scope,$localStorage,$location,$rootScope,$injector,ngDialog,$uibModal,cfpLoadingBar,$state ,SweetAlert,$anchorScroll,$timeout,$window) {


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
    
  $scope.status1  = {isopen: false}; $scope.status2 = { isopen: false }; $scope.status5 = { isopen: false };
  $scope.status8  = { isopen: false };$scope.status9 = { isopen: false }; $scope.status10 = { isopen: false };
  $scope.status11 = { isopen: false };
  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  $localStorage.configureaccountid = '';
  //Service
  var $serviceTest       = $injector.get("home");
  //Graph component
  var $serviceEmailGraph = $injector.get("EMAILGRAPH");
  var $serviceSaleGraph  = $injector.get("SALEGRAPH");
  var $serviceFBGraph    = $injector.get("FACEBOOKGRAPH");
  // common module
  var $serviceCommon     = $injector.get("COMMON");
  
  $anchorScroll();
  
  // Constant define for dashboard
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
  
  /******************************* Services Start For Get Global Count  **************************************/
  $scope.filter = {};
  
  $scope.email_count    = {};
  $scope.email_graph    = {};
  $scope.email_3d_pie   = {};
  $scope.sale_2d_column = {};
  $scope.fb_2d_bar      = {};
  $scope.fb_2d_line     = {};
  
  $scope.loadingclass = 'loadingclass';
  $scope.progressbardiv = 'progressbardiv';
  $rootScope.noscrollclass = 'noscroll';
  $scope.current = 90;
  $scope.filter.date_range  = $scope.date_range;
  
  $scope.run_dashboard = function(str) {
  $scope.filter.date_range = str;  
  $serviceTest.getSummaryReport($scope.filter,function(response){
    
    //////// end loader class //////////
      $scope.loadingclass = ''; 
      $scope.progressbardiv = ''; 
      $rootScope.noscrollclass = '';  
      $scope.current = 0;
    //////// end loader class //////////
        
    if (response.code == 200) {
      
    /*****************************  COUNT DATA ************************************/
    $scope.facebook_count = response.sdata.facebook_count;
    $scope.f_variable = 'impressions'; $scope.f_checked = $scope.facebook_count.impressions;$scope.focus_title = 'Impressions';
    
    $scope.sales_count    = response.sdata.sales_count;
    if (response.sdata.cnemail && response.sdata.cnemail != '' && response.sdata.cnemail.clicks !== undefined) {
      $scope.email_count.email_clicks = response.sdata.cnemail.clicks[0].CLICKS;
    }else{
      $scope.email_count.email_sent   = 0;
      $scope.email_count.email_clicks = 0;
    }
    if (response.sdata.cnemail && response.sdata.cnemail != '' && response.sdata.cnemail.email_count !== undefined) {
      $scope.email_count.email_sent   = response.sdata.cnemail.email_count[0].COUNT; 
    }
    else{
      $scope.email_count.email_sent = 0;
    }
    /*****************************  COUNT DATA ************************************/
    /*****************************  GRAPH DATA ************************************/
    // CASE 1 : EMAIL GRAPH DATA
    //0=opened, 1=clicked, 2=unsubscribed,3= rejected and failed
    if(response.sdata.cnemail && response.sdata.cnemail.email_graph_data){    
    var e_graph    = response.sdata.cnemail.email_graph_data;
     $scope.e_graph = e_graph; 
     $serviceEmailGraph.draw_3d_pie({sent:$scope.email_count.email_sent,e_graph:e_graph},function(response){
     $scope.email_3d_pie.plotOptions = response.plotOptions;
     $scope.email_3d_pie.series      = response.series;
     $scope.email_3d_pie.tooltip     = response.tooltip;
     $scope.email_3d_pie.total_unopened     = response.total_unopened;
     $scope.email_graph('pie');
    });
    }
    // CASE 2 : SALES GRAPH DATA
    
     $serviceSaleGraph.draw_2d_column({sent:$scope.email_count.email_sent,e_graph:e_graph},function(response2){
     $scope.sale_2d_column.plotOptions = response2.plotOptions;
     $scope.sale_2d_column.series      = response2.series;
     $scope.sale_2d_column.tooltip     = response2.tooltip;
     $scope.sale_2d_column.xAxis       = response2.xAxis;
     $scope.sales_graph('column');
    });
    // CASE 3 : FACEBOOK GRAPH DATA
    // Breakdown base graph
     $scope.facebook_breakdown('age-gender',1,'Age and Gender');
     //$scope.breakdown_draw_2d_bar(e_graph,'age-gender');
     
    // CASE 4 : FACEBOOK  COMPARISON GRAPH DATA
    $scope.comparison_focus1 = 'Clicks';  
    $scope.comparison_focus2 = 'Impressions';
    $scope.comparison_draw_2d_line('clicks','impressions');
     
    /*****************************  GRAPH DATA ************************************/
    }else{
      $scope.error_msg = global_message.dashboard_fetch_err;
    }
  });
  }
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
    $scope.run_dashboard(str);
  }
  $scope.getFilter(7);
  
  /**************************** Services Start For Get Global Count******************************/
  
  // Breakdown base graph
  $scope.focus_active2= 'active';
  $scope.focus_active       = function(str){
    if (str == 1) {$scope.focus_active1 = 'active'; $scope.focus_active2 =$scope.focus_active3 =$scope.focus_active4=$scope.focus_active5=$scope.focus_active6=$scope.focus_active7=$scope.focus_active8=$scope.focus_active9=$scope.focus_active10 = ''; }
    if (str == 2) {$scope.focus_active2 = 'active'; $scope.focus_active1 =$scope.focus_active3 =$scope.focus_active4=$scope.focus_active5=$scope.focus_active6=$scope.focus_active7=$scope.focus_active8=$scope.focus_active9=$scope.focus_active10 = ''; }
    if (str == 3) {$scope.focus_active3 = 'active'; $scope.focus_active2 =$scope.focus_active1 =$scope.focus_active4=$scope.focus_active5=$scope.focus_active6=$scope.focus_active7=$scope.focus_active8=$scope.focus_active9=$scope.focus_active10 = ''; }
    if (str == 4) {$scope.focus_active4 = 'active'; $scope.focus_active2 =$scope.focus_active3 =$scope.focus_active1=$scope.focus_active5=$scope.focus_active6=$scope.focus_active7=$scope.focus_active8=$scope.focus_active9=$scope.focus_active10 = ''; }
    if (str == 5) {$scope.focus_active5 = 'active'; $scope.focus_active2 =$scope.focus_active3 =$scope.focus_active4=$scope.focus_active1=$scope.focus_active6=$scope.focus_active7=$scope.focus_active8=$scope.focus_active9=$scope.focus_active10 = ''; }
    if (str == 6) {$scope.focus_active6 = 'active'; $scope.focus_active2 =$scope.focus_active3 =$scope.focus_active4=$scope.focus_active5=$scope.focus_active1=$scope.focus_active7=$scope.focus_active8=$scope.focus_active9=$scope.focus_active10 = ''; }
    if (str == 7) {$scope.focus_active1 = 'active'; $scope.focus_active2 =$scope.focus_active3 =$scope.focus_active4=$scope.focus_active5=$scope.focus_active6=$scope.focus_active1=$scope.focus_active8=$scope.focus_active9=$scope.focus_active10 = ''; }
    if (str == 8) {$scope.focus_active1 = 'active'; $scope.focus_active2 =$scope.focus_active3 =$scope.focus_active4=$scope.focus_active5=$scope.focus_active6=$scope.focus_active7=$scope.focus_active8=$scope.focus_active9=$scope.focus_active10 = ''; }
    if (str == 9) {$scope.focus_active9 = 'active'; $scope.focus_active2 =$scope.focus_active3 =$scope.focus_active4=$scope.focus_active5=$scope.focus_active6=$scope.focus_active7=$scope.focus_active8=$scope.focus_active1=$scope.focus_active10 = ''; }
    if (str == 10) {$scope.focus_active10 = 'active'; $scope.focus_active2 =$scope.focus_active3 =$scope.focus_active4=$scope.focus_active5=$scope.focus_active6=$scope.focus_active7=$scope.focus_active8=$scope.focus_active9=$scope.focus_active1 = ''; }
    
  }
  $scope.focus_on_breakdown = function(focus_title,focus_name,focus_value,str){
    $scope.f_variable   = focus_name;
    $scope.f_checked    = focus_value;
    $scope.focus_title  = focus_title;
    $scope.sign_for_amount    = '';
    if (str == 4) {
      $scope.sign_for_amount = '$';
    }
    $scope.focus_active(str);
    $scope.breakdown_draw_2d_bar($scope.breakdown_response.result,$scope.fb_breakdown_filter_title);
  }
  // breakdown graph
  $scope.breakdown_draw_2d_bar = function(e_graph,type){
     $serviceFBGraph.draw_2d_bar({e_graph:e_graph,type:type,total:$scope.f_checked,variable:$scope.f_variable},function(response3){
     $scope.fb_2d_bar.plotOptions = response3.plotOptions;
     $scope.fb_2d_bar.series      = response3.series;
     $scope.fb_2d_bar.tooltip     = response3.tooltip;
     $scope.fb_2d_bar.xAxis       = response3.xAxis;
     /// Datapoint for grid
     if ($scope.fb_breakdown_filter_title == 'age-gender' || $scope.fb_breakdown_filter_title == 'gender') {
      $scope.fb_2d_bar.f_series_percent_data  = response3.f_series_percent_data;
      $scope.fb_2d_bar.m_series_percent_data  = response3.m_series_percent_data;
      $scope.fb_2d_bar.m_categories           = response3.m_categories;
     
     }else{
      $scope.fb_2d_bar.m_series_percent_data  = response3.m_series_percent_data;
      $scope.fb_2d_bar.m_categories           = response3.m_categories;
      
     }
     $scope.facebook_graph('bar');
    });
  }
  // comparison graph
  $scope.get_comparison_data  = function(params)
  { 
    var compare1 = ''; var compare2 = '';
    if (params.key1) { $scope.comparison_focus1 = params.value1; $scope.compare_parameter1 = params.key1;  }
     
    if (params.key2) { $scope.comparison_focus2 = params.value2; $scope.compare_parameter2 = params.key2; }
     
    $serviceFBGraph.draw_2d_line({compare1:$scope.compare_parameter1,compare2:$scope.compare_parameter2,comparison_breakdown:$scope.comparison_breakdown_result,date_lables:$scope.date_lables},function(response4){ console.log(5);
          $scope.fb_2d_line.series      = response4.series;
          $scope.fb_2d_line.xAxis       = response4.xAxis;
          $scope.comparison_graph('line');
    });
  }
  
  $scope.comparison_draw_2d_line = function(compare1,compare2){
     var filter2 = {};
     filter2.date_range         = $scope.date_range;
     filter2.time_increment     = 1;
     filter2.level              = 'account';
     $scope.loadingclass        = 'loadingclass';
    $scope.progressbardiv       = 'progressbardiv';
    $rootScope.noscrollclass    = 'noscroll';
    $scope.current = 90;
    $scope.compare_parameter1   =  compare1; $scope.compare_parameter2 =  compare2;
     $serviceTest.getBreakdownTimeReport(filter2,function(comparison_breakdown){
      $scope.loadingclass = '';
      $scope.progressbardiv = '';
      $rootScope.noscrollclass = '';
      $scope.current = 0;
      $scope.comparison_breakdown_result = comparison_breakdown.result;
      $serviceFBGraph.draw_2d_line({compare1:compare1,compare2:compare2,comparison_breakdown:comparison_breakdown.result,date_lables:$scope.date_lables},function(response4){
          $scope.fb_2d_line.series      = response4.series;
          $scope.fb_2d_line.xAxis       = response4.xAxis;
          $scope.comparison_graph('line');
          
        });
     });
  }
  
  /*************************** Facebook Breakdown Code Start ************************************/
   
  $scope.facebook_breakdown = function(breakdown,breakdown_type,actual_title)
  {
    var filter  = {};
    filter.date_range          = $scope.date_range;
    if (breakdown_type == 1) {
      filter.breakdown         = breakdown;
    }else{
      filter.action_breakdowns = breakdown;
    }
    
    
    $scope.fb_breakdown_title = actual_title;
    $scope.fb_breakdown_filter_title = breakdown;
    $scope.loadingclass       = 'loadingclass';
    $scope.progressbardiv     = 'progressbardiv';
    $rootScope.noscrollclass  = 'noscroll';
    $scope.current            = 90;
    $serviceTest.getBreakdownReport(filter,function(breakdown_response){
      $scope.loadingclass      = '';
      $scope.progressbardiv    = '';
      $rootScope.noscrollclass = '';
      $scope.current           = 0;
      if (breakdown_response.code == 101) {
      $scope.breakdown_error_message = breakdown_response.result.message;
      }
      else{
      $scope.breakdown_response.result = breakdown_response.result;
      $scope.breakdown_draw_2d_bar(breakdown_response.result,breakdown);
      }
    });
  }
  
  /*************************** Facebook Breakdown Code Start ************************************/
  
    
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
    
  ////////////////////////////////////////////// Comparison Graphs ////////////////////////////////////
  $scope.comparison             = {};
  $scope.comparison_graph  = function(str){
  $scope.cgraph_type            = 'line';
  $scope.comparison.chart_title = 'Comparison Data';  
  $scope.comparison.chart  = {type:$scope.cgraph_type};
  $scope.comparison.xAxis  = $scope.fb_2d_line.xAxis;
  $scope.comparison.series = $scope.fb_2d_line.series;
  Highcharts.chart('container', $scope.draw_graph($scope.comparison));
  }
  /////////////////////////////////////////// Comparison  Graphs ////////////////////////////////////////////
  
  ////////////////////////////////////////////// Facebook Graphs ///////////////////////////////////////////
  $scope.facebook_graph = function(str){
  
  $scope.fb_chart_title = str;
  
  $scope.facebook = {};
  $scope.facebook.chart_title     = $scope.fb_breakdown_title+' wise data';
  $scope.facebook.chart_sub_title = 'Source: Facebook ads data';
  $scope.facebook.chart           = {type:str};
  $scope.facebook.xAxis           = $scope.fb_2d_bar.xAxis;
  $scope.facebook.yAxis           = $scope.fb_2d_bar.yAxis;
  
  
  $scope.facebook.series          = $scope.fb_2d_bar.series;
  $scope.facebook.plotOptions     = $scope.fb_2d_bar.plotOptions;

  $scope.facebook.tooltip         = $scope.fb_2d_bar.tooltip;
  Highcharts.chart('container_fb', $scope.draw_graph($scope.facebook));
  }
  ////////////////////////////////////////////// Facebook Graphs //////////////////////////////////////////////
  
  
  /////////////////////////////////////////// Sales Graphs ///////////////////////////////////////////////////
  $scope.sales_graph = function(str){
  $scope.sales_graph_title = str;
  $scope.sales = {};
  $scope.sales.chart_title     = 'Ticket Sales';
  $scope.sales.chart_sub_title = 'Source: sales';
  $scope.sales.chart           = {type:str};
  $scope.sales.xAxis           = $scope.sale_2d_column.series;
  $scope.sales.yAxis           = { min: 0, title: { text: 'Number' } };
  $scope.sales.series          = $scope.sale_2d_column.series;
  $scope.sales.plotOptions     = $scope.sale_2d_column.plotOptions,
  $scope.sales.tooltip         = $scope.sale_2d_column.tooltip
  Highcharts.chart('container_sales', $scope.draw_graph($scope.sales));
  }
  
  /////////////////////////////////////////// Sales Graphs ///////////////////////////////////////////////
  
 
  /////////////////////////////////////////// Email Graphs ////////////////////////////////////
  $scope.email_graph = function(str){
  $scope.email_graph_title = str;
  $scope.email       = {};
  $scope.email.chart =  {
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
  $scope.email.series         = $scope.email_3d_pie.series;
  $scope.email.plotOptions    = $scope.email_3d_pie.plotOptions,
  $scope.email.tooltip        = $scope.email_3d_pie.tooltip;
  Highcharts.chart('container_email', $scope.draw_graph($scope.email));
  }
   
  
  /////////////////////////////////////////// Email Graphs   /////////////////////////////////// 
    
  function sortNumber(a,b) {
      return a - b;
  }
  
})

.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
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
