/**
  Anguler Service to Manage Network, Budget and Placement
  Created : 2016-09-20
  Created By: Manoj Singh
  Module : Manage Services
*/

'use strict'; 

angular.module('alisthub').factory('home', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  /*Webservice call for get all network*/
  
  url.getSummaryReport = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getSummaryReport,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  url.getBreakdownReport = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getBreakdownReport,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };
   
  url.getBreakdownTimeReport = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getBreakdownTimeReport,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };
  
  url.getTicketSalesReport = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getTicketSalesReport,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };
  
  /*Webservice call for add network object*/
  url.updatecampaignstatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.updatecampaignstatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  /*Webservice call for add network object*/
  url.editfacebookcampaign = function(jsondata,callback){
       communicationService.resultViaPost(webservices.editfacebookcampaign,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  
    /*Webservice call for add network object*/
  url.editgooglecampaign = function(jsondata,callback){
       communicationService.resultViaPost(webservices.editgooglecampaign,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  /*Webservice call for get all network*/
    url.getgooglecampaignlisting = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getgooglecampaignlisting,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  /*Webservice call for add network object*/
  url.updategooglecampaignstatus = function(jsondata,callback){
       communicationService.resultViaPost(webservices.updategooglecampaignstatus,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

   /*Webservice call for add network object*/
  url.removegooglecampaign = function(jsondata,callback){
       communicationService.resultViaPost(webservices.removegooglecampaign,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };


  /*Webservice call for add network object*/
  url.copyfacebookcampaign = function(jsondata,callback){
       communicationService.resultViaPost(webservices.copyfacebookcampaign,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  /*Webservice call for add network object*/

  /*Webservice call for get all network*/
    url.callapiforreportdaily = function(userid,callback){
       communicationService.resultViaGet(webservices.callapiforreportdaily,appConstants.authorizationKey,'', function(res,req){
      callback(res.data);
     });
  };
  
   /*Webservice call for add network object*/

  url.copygooglecampaign = function(jsondata,callback){
       communicationService.resultViaPost(webservices.copygooglecampaign,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  
  url.campaigndetails = function(jsondata,callback){
       communicationService.resultViaPost(webservices.campaigndetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

  /*Webservice call for getnetworkagegroups */
  url.getnetworkagegroups = function(networkid,callback){
       var getnetworkagegroups = webservices.getnetworkagegroups + '/' + networkid;
       communicationService.resultViaGet(getnetworkagegroups,appConstants.authorizationKey,'', function(res,req){
       callback(res.data);
    });
  };

   /*Webservice call for getnetworkgendergroups */
  url.getnetworkgendergroups = function(networkid,callback){
       var getnetworkgendergroups = webservices.getnetworkgendergroups + '/' + networkid;
       communicationService.resultViaGet(getnetworkgendergroups,appConstants.authorizationKey,'', function(res,req){
       callback(res.data);
    });
  };

   /*Webservice call for getnetworkparentalstatus */
  url.getnetworkparentalstatus = function(networkid,callback){
       var getnetworkparentalstatus = webservices.getnetworkparentalstatus + '/' + networkid;
       communicationService.resultViaGet(getnetworkparentalstatus,appConstants.authorizationKey,'', function(res,req){
       callback(res.data);
    });
  };

  /*Webservice call for get associated accounts */
  url.getassociatedaccount = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getassociatedaccount,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };

return url;
}]);