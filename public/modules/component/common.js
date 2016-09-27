/**
  Anguler 
  Created : 2016-09-20
  Created By: Manoj Singh
  Module : Manage Services
*/

'use strict'; 

angular.module('alisthub').factory('COMMON', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};
    
  /*Webservice call for url*/
  
  url.formatsearchDate = function(convertdate){
    
    if(convertdate != '' && convertdate != undefined)
          var today = new Date(convertdate);
      else 
          var today = new Date();

      var dd = today.getDate();
      if(dd<10){ dd='0'+dd; }
      var month = parseInt(today.getMonth())+1;        
      if(month<10){  month='0'+month; }
      return month + "-" + dd + "-" + today.getFullYear();
    };
  
  return url;

}]);