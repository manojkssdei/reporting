/**
  Anguler Service to Manage Network, Budget and Placement
  Created : 2016-05-18
  Created By: Regal Singh
  Module : Manage Network, Budget and Placement
*/

'use strict'; 

angular.module('alisthub').factory('accounts', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
    /*Webservice call for get all network*/
    url.getallnetworks = function(jsondata,callback){
       communicationService.resultViaGet(webservices.getallnetworks,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  /*Webservice call for get all network*/
    url.configureaccounts = function(userid,callback){
       var configureaccounts  = webservices.configureaccounts + '/' + userid;
       communicationService.resultViaGet(configureaccounts,appConstants.authorizationKey,'', function(res,req){
      callback(res.data);
    });
  };


/*get eventbrite code at step 1 */

 url.geteventbritetoken = function(jsondata,callback) {
    communicationService.resultViaGet(webservices.geteventbritetoken , appConstants.authorizationKey , headerConstants.json , jsondata, function(res,req) {
      callback(res.data);
    });
    
  };

  /*generate eventbrite token at step 2 & save it into database*/
    url.geteventbritetokenstep2 = function(jsondata,callback){
       communicationService.resultViaGet(webservices.geteventbritetokenstep2,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };

  /*get eventbrite profile information*/
   url.geteventbritemyprofile = function(jsondata,callback){
         communicationService.resultViaPost(webservices.geteventbritemyprofile,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

  /*get all eventbrite own events*/
    url.geteventbriteownedevents = function(jsondata,callback){
         communicationService.resultViaPost(webservices.geteventbriteownedevents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

  /*get all eventbrite organizers & syncronize the details*/
    url.geteventbriteorganizers = function(jsondata,callback){
         communicationService.resultViaPost(webservices.geteventbriteorganizers,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

     /*get all eventbrite organizers & syncronize the details*/
    url.geteventbritevenues = function(jsondata,callback){
         communicationService.resultViaPost(webservices.geteventbritevenues,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

         /*get all eventbrite categories*/
    url.geteventbritecategories = function(jsondata,callback){
         communicationService.resultViaPost(webservices.geteventbritecategories,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

         /*get all eventbrite sub categories*/
    url.geteventbritesubcategories = function(jsondata,callback){
         communicationService.resultViaPost(webservices.geteventbritesubcategories,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

  /*get all eventbrite public events*/
    url.geteventbriteevents = function(jsondata,callback){
         communicationService.resultViaGet(webservices.geteventbriteevents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
        callback(res.data);
      });
    };

  /*get all eventbrite contact list*/
     url.geteventbritecontactlists = function(jsondata,callback){
       communicationService.resultViaPost(webservices.geteventbritecontactlists,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
       callback(res.data);
    });
  };
return url;
}]);