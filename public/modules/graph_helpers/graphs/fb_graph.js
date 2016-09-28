/**
  Anguler 
  Created : 2016-09-20
  Created By: Manoj Singh
  Module : Manage Services
*/

'use strict'; 

angular.module('alisthub').factory('FACEBOOKGRAPH', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  /*Webservice call for url*/
  
  url.draw_2d_bar = function(jsondata,callback){
    
    console.log(jsondata.total+"::::"+jsondata.type+"::::"+jsondata.variable);
    var break_result = jsondata.e_graph.data;
    console.log(break_result);
    var m_categories = []; var f_categories = []; var m_series_data = []; var f_series_data = []; 
    var m_series_percent_data = []; var f_series_percent_data = []; var a_categories = [];
    var a_series_percent_data=[]; var a_series_data = [];
    break_result.forEach(function(value,key){
        switch (jsondata.type) {
        case 'age-gender':
            if(value.gender == "male")  {
                m_categories.push(value.age);
                if (jsondata.variable) {
                    m_series_data.push(parseInt("-"+(parseInt(value[jsondata.variable]))));
                    m_series_percent_data.push(parseInt((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2));
                }
            }
            if(value.gender == "female"){
                f_categories.push(value.age);
                
                if (jsondata.variable) {
                f_series_data.push(parseInt(value[jsondata.variable]));    
                f_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}
            }
            break;
        case 'age':
            a_categories.push(value.age);
            //a_categories.push(value.gender);
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2))); console.log(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));
                }
            break;
        case 'gender':
            console.log("gender:",value.gender);
            if(value.gender == "male")  {
            m_categories.push(value.gender);    
            if (jsondata.variable) {
                m_series_data.push(parseInt("-"+(parseInt(value[jsondata.variable]))));    
                m_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}
            }
            if(value.gender == "female")  {
            f_categories.push(value.gender);    
            if (jsondata.variable) {
                f_series_data.push(parseInt(value[jsondata.variable]));    
                f_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}
            }
            break;
        case 'country':
            a_categories.push(value.country);
            
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}
            break;    
        case 'region':
            a_categories.push(value.region);
            
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}
            break;    
        case 'impression_device':
            a_categories.push(value.impression_device);
            
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}         
            break;
        case 'device_platform':
            a_categories.push(value.device_platform);
            
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}         
            break;
        case 'product_id':
            a_categories.push(value.product_id);
            
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}
        case 'hourly_stats_aggregated_by_advertiser_time_zone':
            a_categories.push(value.hourly_stats_aggregated_by_advertiser_time_zone);
            
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}
            break;
        case 'hourly_stats_aggregated_by_audience_time_zone':
        a_categories.push(value.product_id);
            
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));}
        break;
        case 'action_reaction':
            a_categories.push(value.action_reaction);
            console.log(value.actions);
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));
                }
        break;
        case 'action_type':
            a_categories.push(value.action_type);
            if (jsondata.variable) {
                a_series_data.push(parseInt(value[jsondata.variable]));    
                a_series_percent_data.push(parseInt(((parseInt(value[jsondata.variable])/parseInt(jsondata.total))*100).toFixed(2)));
            }
        break; 
        default: return 1;
      }
       
    });
    
    var options = {};
    if (jsondata.type == 'age-gender' || jsondata.type == 'gender') {
        options.xAxis           = [{
                categories: m_categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: f_categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }];
        options.series       = [{
                name: 'Male',
                data: m_series_data,
                color:'#4B6DAA'
            }, {
                name: 'Female',
                data: f_series_data,
                color:'#A8B6D1'
            }];
    options.f_series_percent_data = f_series_percent_data;
    options.m_series_percent_data = m_series_percent_data;
    options.m_categories          = m_categories;
    console.log(m_categories);
    console.log(f_categories);
    }else{
        options.xAxis           = [{
                categories: a_categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }];
        options.series       = [{
                name: jsondata.type,
                data: a_series_data,
                color:'#4B6DAA'
            }];
        
    //options.f_series_percent_data = f_series_percent_data;
    options.m_series_percent_data = a_series_percent_data;
    options.m_categories          = a_categories;   
    
    }
    options.yAxis = {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    }
                }
            };
            
        
    options.plotOptions  = {
                series: {
                    stacking: 'normal'
                }
            };
    
    options.tooltip = {
                formatter: function () {
                    return '<b>' + this.series.name + ', '+ jsondata.type + this.point.category + '</b><br/>' +
                        'Values: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            };
    
    callback(options);
  };
  
  
  /// This graph for facebook comparisons 
  
  url.draw_2d_line = function(jsondata,callback){
    var options = {}; 
    
    var break_result = jsondata.comparison_breakdown.data;
    var lables       = jsondata.date_lables;
    var categories = []; var f_categories = []; var series_data_1 = []; var series_data_2 = [];
    var series_data_3 = {}; var series_data_4 = {}; 
    console.log(jsondata.compare1+":::"+jsondata.compare2);
    break_result.forEach(function(value,key){
      categories.push(value.date_start);
      series_data_3[value.date_start] = parseInt(value[jsondata.compare1]);
      series_data_4[value.date_start] = parseInt(value[jsondata.compare2]);
    })
    lables.forEach(function(value){
        var exp = value.split("-");
        var new_form = exp[2]+'-'+exp[0]+'-'+exp[1];
        if(series_data_3[new_form]){
           series_data_1.push(series_data_3[new_form]);
        }
        else{ series_data_1.push(0); }
        /////////////////////////////////////////
        if(series_data_4[new_form]){
           series_data_2.push(series_data_4[new_form]);
        }
        else{ series_data_2.push(0); }
    });
    //$scope.date_lables 
    options.xAxis        = {categories:lables};
    
    options.series       = [{
        data: series_data_1,
        color: '#FF0000',
        name: jsondata.compare1
      },
      {
        data: series_data_2,
        color: '#004080',
        name: jsondata.compare2
      }];
    callback(options);
  };
  
  return url;

}]);