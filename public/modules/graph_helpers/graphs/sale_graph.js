/**
  Anguler 
  Created : 2016-09-20
  Created By: Manoj Singh
  Module : Manage Services
*/

'use strict'; 

angular.module('alisthub').factory('SALEGRAPH', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  /*Webservice call for url*/
  url.formatDate    = function(convertdate,type) {
    var today = convertdate;
    var month = today.getMonth() + +1;
    var month_name = MONTH_NAMES_SHORT[month];
    if (month < 10) { month = "0" + month; } else { month = month; }
    switch (type) {
      case 'DATE':
          return today.getFullYear() + "-" + month + "-" + today.getDate();
          break;
      case 'USDATE':
          return month_name+ " " + today.getDate()+ ", " +today.getFullYear();
          break;
      case 'USDATEFORMAT':
          return month+ "-" + today.getDate()+ "-" +today.getFullYear();
          break;  
      case 'DATETIME':
          var hours = today.getHours();
          var minutes = today.getMinutes();
          var seconds = today.getSeconds();
          var strTime = hours + ':' + minutes + ':' + seconds;
          var month = +today.getMonth() + +1;
          return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
          break;
        
      default: return today.getFullYear() + "-" + month + "-" + today.getDate();
    }
  }
  
   /* Webservice draw_2d_column */
  url.draw_2d_column = function(jsondata,callback){
    
    var categories      = []; var ticket_count1   = [];  var ticket_revenue1 = [];  var ticket_count    = [];
    var ticket_revenue  = []; var ticket_test  = []; 
    var break_result    = jsondata.sales_input.sales_graph;
    var lables          = jsondata.date_lables;
    var total_ticket_sold = 0; var total_revenue = 0;
    
    break_result.forEach(function(value,key){
        switch (jsondata.xbase) {
        case 'date':
            var exp       = value.date.split("-");
            var newforamt = url.formatDate(new Date(value.date),'USDATE');
            var new_form  = exp[2]+"-"+exp[1]+"-"+exp[0];
            categories.push(newforamt);
            ticket_count1[newforamt]   = value.tickets;
            ticket_revenue1[newforamt] = value.total_cost;
            ticket_test[newforamt]     = value.total_cost;
            total_ticket_sold        += value.tickets;
            total_revenue            += value.total_cost;
            break;
        
        default: return 1;
        }
    });
    
    lables.forEach(function(value){
        if(ticket_count1[value]){
           ticket_count.push(ticket_count1[value]);
        }
        else{ ticket_count.push(0); }
        /////////////////////////////////////////
        if(ticket_revenue1[value]){
           ticket_revenue.push(ticket_revenue1[value]);
        }
        else{ ticket_revenue.push(0); }
    });
    var keys_date = Object.keys(ticket_revenue1); 
    
    var maxdate   = '';
    var max       = 0;
    if (keys_date !== undefined && keys_date != null && keys_date != '') {
        var max = Math.max.apply(null,
        Object.keys(ticket_revenue1).map(function(e) {
            return ticket_revenue1[e];
        }));
        
       keys_date.forEach(function(value){
       if(ticket_revenue1[value] == max){
        maxdate = value;
       } 
      });
    }
        
    var options = {};  
    options.xAxis           = {
            categories: lables,
            crosshair: true
        }
    options.series       = [{
            name: 'Ticket Sold',
            data: ticket_count,
            color:'#FF0000' 
        }, {
            name: 'Total Revenue',
            data: ticket_revenue,
            color:'#004080'
        }];
    options.plotOptions  = {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        };
    options.yAxis = {
            min: 0,
            title: {
                text: 'Values'
            }
        };
    options.tooltip = {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        };
    
    options.total_ticket_sold = total_ticket_sold;
    options.total_revenue     = total_revenue.toFixed(2);
    options.max_revenue_day   = max.toFixed(2);
    options.maxdate           = maxdate;
    callback(options);
  };
  
  return url;

}]);