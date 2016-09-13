'use strict';
angular.module('alisthub')
    .factory('contact_us', ['$q', '$timeout', 'communicationService', function Customers($q, $timeout, communicationService) {
        var url = {};

        url.submitContact = function(jsondata, callback) {
            communicationService.resultViaPost(webservices.submitContact, appConstants.authorizationKey, headerConstants.json, jsondata, function(res, req) {
                callback(res.data);
            });

        };

     
        return url;
    }]);
