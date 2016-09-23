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
    var options = {};  
    options.xAxis           = [{
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
    options.series       = [{
                name: 'Male',
                data: [-12.5, -22.3, -11.2, -20.6, -10.2, -30.0],
                color:'#4B6DAA'
            }, {
                name: 'Female',
                data: [2.5, 12.3, 31.2, 30.6, 15.2, 25.0],
                color:'#A8B6D1'
            }];
    options.plotOptions  = {
                series: {
                    stacking: 'normal'
                }
            };
    
    options.tooltip = {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                        'Age: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            };
    
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