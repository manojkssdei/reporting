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
    var m_categories = []; var f_categories = []; var m_series_data = []; var f_series_data = [];
    var m_series_percent_data = []; var f_series_percent_data = []; var a_categories = [];
    var a_series_percent_data=[]; var a_series_data = [];
    break_result.forEach(function(value,key){
        switch (jsondata.type) {
        case 'age-gender':
            if(value.gender == "male")  {
                m_categories.push(value.age);
                console.log(Object.keys(value) +"=="+ jsondata.variable);
                if (jsondata.variable == 'impressions') {
                    m_series_data.push(parseInt("-"+(parseInt(value.impressions))));
                    m_series_percent_data.push(parseInt((parseInt(value.impressions)/parseInt(jsondata.total))*100).toFixed(2));
                }
                if (jsondata.variable == 'clicks') {
                    m_series_data.push(parseInt("-"+(parseInt(value.clicks))));
                    m_series_percent_data.push(parseInt((parseInt(value.clicks)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'ctr') {
                    m_series_data.push(parseInt("-"+(parseInt(value.ctr))));
                    m_series_percent_data.push(parseInt((parseInt(value.ctr)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'spend') {
                    m_series_data.push(parseInt("-"+(parseInt(value.spend))));
                    m_series_percent_data.push(parseInt((parseInt(value.spend)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'cpc') {
                    m_series_data.push(parseInt("-"+(parseInt(value.cpc))));
                    m_series_percent_data.push(parseInt((parseInt(value.cpc)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'cpp') {
                    m_series_data.push(parseInt("-"+(parseInt(value.cpp))));
                    m_series_percent_data.push(parseInt((value.cpp/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'social_spend') {
                    m_series_data.push(parseInt("-"+(parseInt(value.social_spend))));
                    m_series_percent_data.push(parseInt((parseInt(value.social_spend)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'social_impressions') {
                    m_series_data.push(parseInt("-"+(parseInt(value.social_impressions))));
                    m_series_percent_data.push(parseInt((parseInt(value.social_impressions)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'reach') {
                    m_series_data.push(parseInt("-"+(parseInt(value.reach))));
                    m_series_percent_data.push(parseInt((parseInt(value.reach)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'cpm') {
                    console.log(value.cpm +"mm")
                    m_series_data.push(parseInt("-"+value.cpm));
                    m_series_percent_data.push(parseInt((parseInt(value.cpm)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                
            }
            if(value.gender == "female"){
                f_categories.push(value.age);
                
                if (jsondata.variable == 'impressions') {
                f_series_data.push(parseInt(value.impressions));    
                f_series_percent_data.push(parseInt(((parseInt(value.impressions)/parseInt(jsondata.total))*100).toFixed(2)));}
                if (jsondata.variable == 'clicks') {
                    f_series_data.push(parseInt(value.clicks));
                    f_series_percent_data.push(parseInt((parseInt(value.clicks)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'ctr') {
                    f_series_data.push(parseInt(value.ctr));
                    f_series_percent_data.push(parseInt((parseInt(value.ctr)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'spend') {
                    f_series_data.push(parseInt(value.spend));
                    f_series_percent_data.push(parseInt((parseInt(value.spend)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'cpc') {
                    f_series_data.push(parseInt(value.cpc));
                    f_series_percent_data.push(parseInt((parseInt(value.cpc)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'cpp') {
                    f_series_data.push(parseInt(value.cpp));
                    f_series_percent_data.push(parseInt((value.cpp/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'social_spend') {
                    f_series_data.push(parseInt(value.social_spend));
                    f_series_percent_data.push(parseInt((parseInt(value.social_spend)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'social_impressions') {
                    f_series_data.push(parseInt(value.social_impressions));
                    f_series_percent_data.push(parseInt((parseInt(value.social_impressions)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'reach') {
                    f_series_data.push(parseInt(value.reach));
                    f_series_percent_data.push(parseInt((parseInt(value.reach)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'cpm') {
                    f_series_data.push(value.cpm);
                    f_series_percent_data.push(parseInt((parseInt(value.cpm)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                
            }
            break;
        case 'age':
            a_categories.push(value.age); 
            if (jsondata.variable == 'impressions') {
                a_series_data.push(parseInt(value.impressions));    
                a_series_percent_data.push(parseInt(((parseInt(value.impressions)/parseInt(jsondata.total))*100).toFixed(2)));}
                if (jsondata.variable == 'clicks') {
                    a_series_data.push(parseInt(value.clicks));
                    a_series_percent_data.push(parseInt((parseInt(value.clicks)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'ctr') {
                    a_series_data.push(parseInt(value.ctr));
                    a_series_percent_data.push(parseInt((parseInt(value.ctr)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'spend') {
                    a_series_data.push(parseInt(value.spend));
                    a_series_percent_data.push(parseInt((parseInt(value.spend)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'cpc') {
                    a_series_data.push(parseInt(value.cpc));
                    a_series_percent_data.push(parseInt((parseInt(value.cpc)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'cpp') {
                    a_series_data.push(parseInt(value.cpp));
                    a_series_percent_data.push(parseInt((value.cpp/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'social_spend') {
                    a_series_data.push(parseInt(value.social_spend));
                    a_series_percent_data.push(parseInt((parseInt(value.social_spend)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'social_impressions') {
                    a_series_data.push(parseInt(value.social_impressions));
                    a_series_percent_data.push(parseInt((parseInt(value.social_impressions)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'reach') {
                    a_series_data.push(parseInt(value.reach));
                    a_series_percent_data.push(parseInt((parseInt(value.reach)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
                if (jsondata.variable == 'cpm') {
                    a_series_data.push(value.cpm);
                    a_series_percent_data.push(parseInt((parseInt(value.cpm)/parseInt(jsondata.total))*100).toFixed(2)); 
                }
            
            break;
          
        default: return 1;
      }
       
    });
    
    console.log(m_categories);
    console.log(f_categories);
    console.log(m_series_data);
    console.log(f_series_data);
    
    var options = {};
    if (jsondata.type == 'age-gender') {
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
    }
    if (jsondata.type == 'age') {
        options.xAxis           = [{
                categories: a_categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }];
        options.series       = [{
                name: 'Age',
                data: a_series_data,
                color:'#4B6DAA'
            }];
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
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Values: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            };
    options.f_series_percent_data = f_series_percent_data;
    options.m_series_percent_data = m_series_percent_data;
    options.m_categories          = m_categories;
    callback(options);
  };
  
  
  
  
  url.draw_2d_line = function(jsondata,callback){
    var options = {};  
    options.xAxis        = {categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']};
    options.series       = [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color: '#FF0000',
        name: 'Clicks'
      },
      {
        data: [39.9, 51.5, 106.4, 149.2, 144.0, 106.0, 105.6, 148.5, 206.4, 194.1, 90.6, 44.4],
        color: '#004080',
        name: 'Impression'
      }];
    callback(options);
  };
  
  return url;

}]);