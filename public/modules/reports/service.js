/**
  Anguler Service to Manage Network, Budget and Placement
  Created : 2016-05-18
  Created By: Regal Singh
  Module : Manage Network, Budget and Placement
*/

'use strict'; 

angular.module('alisthub').factory('report', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  

  /*Webservice call for get all network*/
  url.getcampaignlist = function(jsondata,callback){
      communicationService.resultViaGet(webservices.getcampaignlist,appConstants.authorizationKey,'', function(res,req){
      callback(res.data);
    });
  };

  /*Webservice call for get all network*/
  url.getgooglecampaignlisting = function(jsondata,callback){
      communicationService.resultViaGet(webservices.getgooglecampaignlisting,appConstants.authorizationKey,'', function(res,req){
      callback(res.data);
    });
  };

  url.getgooglecampaignreports = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getgooglecampaignreports,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  /*Webservice call for get all network*/
  url.getcampaignreportlist = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getcampaignreportlist,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  /*Webservice call for get all network*/
  url.addcampaignreportlist = function(jsondata,callback){
       communicationService.resultViaPost(webservices.addcampaignreportlist,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };
    /*Webservice call for get all reports*/
  url.reportdetails = function(jsondata,callback){
       communicationService.resultViaPost(webservices.reportdetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };


  url.callapiforcampaignreport = function(jsondata,callback){
       communicationService.resultViaPost(webservices.callapiforcampaignreport,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };
return url;
}]);
