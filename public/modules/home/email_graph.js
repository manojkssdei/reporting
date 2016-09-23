/**
  Anguler 
  Created : 2016-09-20
  Created By: Manoj Singh
  Module : Manage Services
*/

'use strict'; 

angular.module('alisthub').service('EMAILGRAPH', ['$q', '$timeout','communicationService', function ($q, $timeout,communicationService) {
    var url = {};
    
  /*Webservice call for url*/
  
  url.draw_3d_pie = function(jsondata,callback){
   console.log("rrrrrrrrrrrrrrrrrrrrrrr");   
   callback(jsondata);
  //return 0; 
  };
  
  url.test = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getSummaryReport,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };
  return url;
}]);