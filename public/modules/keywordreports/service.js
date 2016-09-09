/**
  Anguler Service to Manage Network, Budget and Placement
  Created : 2016-05-18
  Created By: Regal Singh
  Module : Manage Network, Budget and Placement
*/

'use strict'; 

angular.module('alisthub').factory('keywordreports', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
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
  url.getfacebookcampaignreports = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getfacebookcampaignreports,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  url.getgooglecampaignreportsdetails = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getgooglecampaignreportsdetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

return url;
}]);
