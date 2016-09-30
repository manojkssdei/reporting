module.exports = function()
{
  /***
    To get array diff functionality
    Created : 2016-08-31
    Created By : Manoj Kumar Singh
  ***/
  this.exclude_array_diff = function(array1,array2)
  {
    var result  = [];
    var cresult = [];
    array2.forEach(function(value,key){
      if (array1[value] && array1[value] !== undefined && array1[value] != "") {
        cresult.push(value);
        delete array1[value];
      }
      else{
        result.push(value);
      }
    });
    return {"new_keys":result,"old_keys":cresult,'new_input':array1};
  }
  
  /***
    To get start and end date
    Created : 2016-09-30
    Created By : Manoj Kumar Singh
  ***/
  this.getDateFilter  = function(str,req)
  {
    if(str == 7 || str == 14 || str == 30) { var type = 'NUMBER';       }
    if(str == 'this_month')                { var type = 'THIS_MONTH';   }
    if(str == 'last_month')                { var type = 'LAST_MONTH';   }
    if(str == "custom")                    { var type = 'custom'; }
    switch (type) {
    case 'NUMBER':
      var todayDate        = new Date();
      var startdatereports = todayDate;
      var enddatereports   = new Date(todayDate).setDate(new Date(todayDate).getDate() - (parseInt(str)));
      var enddatereports   = new Date(enddatereports);
      return {from:this.formatDate(startdatereports,'DATE'),to:this.formatDate(enddatereports,'DATE')};
    break;
    case 'LAST_MONTH':
      var date             = new Date();
      var startdatereports = new Date(date.getFullYear(), date.getMonth()-1, 1);
      var enddatereports   = new Date(date.getFullYear(), date.getMonth() , 0);
      return {from:startdatereports,to:enddatereports};
    break;
    case 'THIS_MONTH':
      var date             = new Date();
      var startdatereports = new Date(date.getFullYear(), date.getMonth(), 1);
      var enddatereports   = new Date(date.getFullYear(), date.getMonth() + 1 , 0);
      return {from:startdatereports,to:enddatereports};
    break;
    case 'CUSTOM':
      var startdatereports = new Date(req.body.from);
      var enddatereports   = new Date(req.body.to);
      return {from:startdatereports,to:enddatereports};
    break;
    default: return 1;  
    }
  }
  
  /***
    To get current date foramt (YYYY-MM-DD HH:MM)
    Created : 2016-08-31
    Created By : Manoj Kumar Singh
  ***/
  this.formatDate    = function(convertdate,type) {
  var today = convertdate;
  var month = today.getMonth() + +1;
  if (month < 10) { month = "0" + month; } else { month = month; }
  switch (type) {
    case 'DATE':
        return today.getFullYear() + "-" + month + "-" + today.getDate();
        break;
    case 'DATETIME':
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        var strTime = hours + ':' + minutes + ':' + seconds;
        var month = +today.getMonth() + +1;
        return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
        break;
      
    default: return today.getFullYear() + "-" + month + "-" + today.getDate();
  }
}

  
  /***
    To get sum of array from any key base
    Created : 2016-09-21
    Created By : Manoj Kumar Singh
  ***/
  this.getKeySum = function(array)
  { 
    var spend = cpp =  cpm =  impressions = social_spend =  social_impressions = reach = cpc = clicks = unique_clicks = conversion = 0;
    var ctr = 0;
    var act_araay = array.data;
    act_araay.forEach(function(value,key){
      /////////////////////////////////////////////
     spend += value.spend;
      cpp   += value.cpp;
      ctr   += value.ctr;
      impressions += value.impressions;
      social_spend += value.social_spend;
      social_impressions += value.social_impressions;
      reach += value.reach;
      cpc += value.cpc;
      clicks += value.clicks;
      unique_clicks += value.unique_clicks;
      
      /////////////////////////////////////////////
    });
    return {spend:spend.toFixed(2), cpp:cpp.toFixed(2), cpm:cpm, ctr:ctr.toFixed(2), impressions:impressions, social_spend:social_spend.toFixed(2), social_impressions:social_impressions, reach:reach, cpc:cpc.toFixed(2), clicks:clicks, unique_clicks:unique_clicks.toFixed(2),conversion:conversion}; 
  }
  
  /***
    To get sum of array from any key base
    Created : 2016-09-21
    Created By : Manoj Kumar Singh
  ***/
  this.getKeySumTicket = function(array)
  { 
    var total_ticket = revenue = 0;
    array.forEach(function(value,key){
      /////////////////////////////////////////////
      total_ticket += value.total_ticket;
      revenue      += value.revenue;
      /////////////////////////////////////////////
    });
    return {sold_ticket:total_ticket, revenue:revenue.toFixed(2)}; 
  }
  
  /***
    To get sum email foer dashboard
    Created : 2016-09-22
    Created By : Manoj Kumar Singh
  ***/
  this.getSumEmail = function(array)
  { 
    var total_ticket = revenue = 0;
    array.forEach(function(value,key){
      /////////////////////////////////////////////
      total_ticket += value.total_ticket;
      revenue      += value.revenue;
            
      /////////////////////////////////////////////
    });
    
    return {sold_ticket:total_ticket, revenue:revenue.toFixed(2)};
  }
}