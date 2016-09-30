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
      return month+"-"+dd+"-"+today.getFullYear();
    };
       
   url.getDateLables = function(date1,date2,decrement){
        var date5      = new Date(date1);
        var day        = 60 * 60 * 24 * 1000;
        var oneDay     = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate  = new Date(date1);
        var secondDate = new Date(date2);

        var diffDays   = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(day)));
        
        var labelvalues = []
        for(var i=0;i<diffDays+1;i=i+decrement){              
              var setdate = new Date(date2).setDate(new Date(date2).getDate() + i);
              var ddd     = url.formatsearchDate(setdate);
              labelvalues.push(ddd);
        }
        return labelvalues;
        
    }; 
  
  return url;

}]);