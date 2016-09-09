/**
  Anguler Service to Manage Users
  Created : 2016-08-30
  Created By: Manoj Kumar Singh
  Module : Manage User
  */

'use strict'; 

angular.module('alisthub').factory('users', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
    /*Webservice call for get all network*/
  
    url.addUser = function(jsondata,callback){
       communicationService.resultViaPost(webservices.campaigndetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
    };

    /*Webservice call for trashUser */
    url.trashUser = function(getnetworkagegroups,callback){
       //var getnetworkagegroups = webservices.getnetworkagegroups + '/' + networkid;
       communicationService.resultViaGet(getnetworkagegroups,appConstants.authorizationKey,'', function(res,req){
       callback(res.data);
    });
    };
    
    /*Webservice call for set permission */
    url.setPermission = function(jsondata,callback){
       communicationService.resultViaPost(webservices.campaigndetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
    };
    
    return url;
}]);