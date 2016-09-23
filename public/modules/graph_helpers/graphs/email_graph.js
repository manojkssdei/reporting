/**
  Anguler 
  Created : 2016-09-20
  Created By: Manoj Singh
  Module : Manage Services
*/

'use strict'; 

angular.module('alisthub').factory('EMAILGRAPH', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  /*Webservice call for url*/
  //0=opened, 1=clicked, 2=unsubscribed,3= rejected and failed
  url.draw_3d_pie = function(jsondata,callback){
    var email = {};
    var total_sent  = 0; 
    var subtotal = 0;var unsubs = 0;var unopened = 0; var bounced = 0;var clicked = 0;var opened = 0;
    total_sent = jsondata.sent;
    var jdata  = jsondata.e_graph;
    console.log(jsondata);
    jdata.forEach(function(value){
      console.log(value);
      if (value.event_type == 0) {
        opened  = (value.CNT/total_sent)*100;
        subtotal += value.CNT;
      }
      if (value.event_type == 1) {
        clicked = (value.CNT/total_sent)*100;
        subtotal += value.CNT;
      }
      if (value.event_type == 2) {
        unsubs  = (value.CNT/total_sent)*100;
        subtotal += value.CNT;
      }
      if (value.event_type == 3) {
        bounced = (value.CNT/total_sent)*100;
        subtotal += value.CNT;
      }
      
    })
    unopened = (total_sent-subtotal/total_sent)*100;
      
    email.series    = [{
                name: 'Percent',
                colorByPoint: true,
                data: [{
                    name: 'Opened',
                    y: Number(opened.toFixed(2))
                }, {
                    name: 'Links Clicked',
                    y: Number(clicked.toFixed(2)),
                    sliced: true,
                    selected: true
                }, {
                    name: 'Bounced',
                    y: Number(bounced.toFixed(2)),
                }, {
                    name: 'Unopened',
                    y: Number(unopened.toFixed(2)),
                }, {
                    name: ' Unsubscribes',
                    y: Number(unsubs.toFixed(2))
                }]
    }];
    console.log(email.series);
    email.plotOptions  = {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
    };
    
    email.tooltip = {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            };
    
    email.total_unopened = total_sent-subtotal;
    callback(email);
  };
  
  return url;

}]);