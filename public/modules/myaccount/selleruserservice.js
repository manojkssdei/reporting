'use strict';

angular.module('alisthub')
.factory('profilesub', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};

    url.accountBasic = function(jsondata,callback){
       communicationService.resultViaPost(webservices.accountBasic,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
    };

    url.updatesubSellerUser = function(jsondata,callback){
     	communicationService.resultViaPost(webservices.updatesubSellerUser,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
	      callback(res.data);
	    });
	  };

    url.updatesubsellerPassword = function(jsondata,callback){
      communicationService.resultViaPost(webservices.updatesubsellerPassword,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };


    url.getsubSellerUser = function(jsondata,callback){
      communicationService.resultViaPost(webservices.getsubSellerUser,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };
    
    url.updateEmail = function(jsondata,callback){
      communicationService.resultViaService(webservices.updateEmail,jsondata, function(res,req){
        callback(res.data);
      });
    };

    return url;
}]);
