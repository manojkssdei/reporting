var facebook_ads = require('./../../../models/facebook_ads.js');
var db           = require('../../../db.js');
// Creation of object for services
var fbConfig     = require('./FacebookAdsConfig.js');
var component    = require('./../../../component/common.js');
var fb           = fbConfig.getInstance();
var fb_component = require('./cron_component/fb_cron_component.js');
/**
Express Controller to Add Facebook Campaign
Created : 2016-09-12
Created By: Manoj Singh
Module : Get Report of campaign
Frequency : date_preset must be one of the following values: today, yesterday, last_3_days, this_week, last_week, last_7_days, last_14_days, last_28_days, last_30_days, last_90_days, this_month, last_month, this_quarter, last_3_months, lifetime
**/
exports.saveFacebookReport = function(){

    function save_data(data)
    {
      facebook_ads.collection.insert(data,function(err2,res)
              {
                if (err2) {  console.log("fail");}
                  else
                  {
                  console.log("success");
                  var formatDate = new component();
                  facebook_ads.update({_id:{$in:res.insertedIds}},{$set:{created_date:formatDate.formatDate(new Date(),'DATE')}},{multi:true},function(err5,res2)                  {
                        if (err5) { console.log("fail2"); }
                        else{  console.log("success2");   }
                      });
                      
                  }
                  });
    }
    
    function truncate_data(repeat_date,data,useraccountid)
    {
        facebook_ads.collection.remove({created_date:repeat_date,account_id:useraccountid},function(err1,rest)
        {
          if (err1) {console.log("4");} else {  console.log("5");  save_data(data); }
        });
    }
      
    function run_facebook(setaccesstoken,useraccountid)
    {
        var reqdata = {date_preset:'last_7_days',level:'ad',setaccesstoken:setaccesstoken,useraccountid:useraccountid};
        var fb_component1 = new fb_component();
        var formatDate    = new component();
        fb_component1.getFacebookreport(reqdata,function(resultdata){
          if (resultdata.status == 1) {
            
            facebook_ads.collection.count({created_date:formatDate.formatDate(new Date(),'DATE'),account_id:useraccountid},function(err5,rcount)
            {
                console.log("rcount : "+ rcount);
                  if (rcount > 0) {
                  console.log("1");  
                  truncate_data(formatDate(new Date(),'DATE'),resultdata.response,useraccountid);
                  }else{
                  console.log("2");   
                  save_data(resultdata.response);  
                  }
            });              

          }
          else{
            console.log("Error");
          }
          
        });
          
    }
 
    // To fetch all accounts
    var connection = db.connection();
    var query      = "SELECT user_id,useraccountid,accesstoken,profile_id FROM marketing_configureaccounts WHERE status=1 AND useraccountid != '' AND accesstoken != ''";
    connection.query(query, function(err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                      //var 
                      results.forEach(function(value){
                        if (value.accesstoken !== undefined && value.useraccountid !== undefined) {
                          console.log("step-1");
                          run_facebook(value.accesstoken,value.useraccountid);
                        }
                      }) 
                     
                    }
                    connection.end();
    });
    
}

/**
Express Controller to getFacebookBreakdownReports
Created : 2016-09-12
Created By: Manoj Singh
Module : getfacebookcampaignreports
*/
exports.getFacebookBreakdownReports = function(req,res){   
  
  var setaccesstoken   = "EAAPuVVbNTTMBAL9AAkbkKazTgw66NCYaYVTwbKrqRtSzYJJXVteKsBX4zxkx3W4CvnEwDMxQJWZCZA2PWWLoOrM0wiXazoawrSn1wzAyO1I0TalmyGDjOXKOqxRNZASZAFaYPASzIYn15lX3gK5XvhN9LwgD3F9NIo7RKIXwUuf9hMXfGV1qyoHAJpZCSOixKUhhYjgY2Mnv6UUowWDfZA";
  var useraccountid    = 114882752278348;
    var date_preset = '';
    if(req.body.date_range == 7){        date_preset = 'last_7_days'; }
    if(req.body.date_range == 15){       date_preset = 'last_14_days'; }
    if(req.body.date_range == 30){       date_preset = 'last_30_days'; }
    if(req.body.date_range == "custom"){ date_preset = 'last_14_days'; }
    
    // for testing
    var setaccesstoken = setaccesstoken;
    var useraccountid  = useraccountid;
    var reqdata = {date_preset:date_preset,setaccesstoken:setaccesstoken,useraccountid:useraccountid};
    if(req.body.breakdown && req.body.breakdown !== undefined && req.body.breakdown != "")
    {
      if(req.body.breakdown=='age-gender'){
        reqdata.breakdown = ['age','gender'];
      } else {
        reqdata.breakdown = [req.body.breakdown]; 
      }
    }
    if (req.body.level && req.body.level !== undefined && req.body.level != "") {
      reqdata.level      = req.body.level;
    }else{ reqdata.level = 'ad';}
    
    var fb_component1 = new fb_component();
    fb_component1.getFacebookBreakdownReports(req,reqdata,function(resultdata){
          if (resultdata.status == 1) {
          res.json({result:resultdata.response,code:200});  
          }else{ 
          res.json({result:resultdata.response,code:101});
          }
    });
   
}


/**
Express Controller to getfacebookcampaignreports
Created : 2016-09-12
Created By: Manoj Singh
Module : getfacebookcampaignreports
*/
exports.getFacebookDashboardCounts = function(req,res,next){   
  var setaccesstoken   = "EAAPuVVbNTTMBAL9AAkbkKazTgw66NCYaYVTwbKrqRtSzYJJXVteKsBX4zxkx3W4CvnEwDMxQJWZCZA2PWWLoOrM0wiXazoawrSn1wzAyO1I0TalmyGDjOXKOqxRNZASZAFaYPASzIYn15lX3gK5XvhN9LwgD3F9NIo7RKIXwUuf9hMXfGV1qyoHAJpZCSOixKUhhYjgY2Mnv6UUowWDfZA";
  var useraccountid    = 114882752278348;
   
  var date_preset = '';
  if(req.body.date_range == 7){ date_preset = 'last_7_days'; }
  if(req.body.date_range == 15){ date_preset = 'last_14_days'; }
  if(req.body.date_range == 30){ date_preset = 'last_30_days'; }
  if(req.body.date_range == "custom"){ date_preset = 'last_14_days'; }
    
  // for testing
  var setaccesstoken = setaccesstoken;
  var useraccountid  = useraccountid;
  var reqdata = {level:'account',date_preset:date_preset,setaccesstoken:setaccesstoken,useraccountid:useraccountid};
  var fb_component1 = new fb_component();
    fb_component1.getFacebookDashboardCounts(req,reqdata,function(resultdata){
          if (resultdata.status == 1) {
            return next({result:resultdata.result,status:1});  
          }else{
            return next({result:response.error,code:101});
          }
  });  
  
}

/**
Express Controller to configureaccounts
Created : 2016-05-10
Created By: Regal Singh
Module : configureaccounts
*/

exports.configureaccounts  = function(req,res){
    var connection = db.connection();
    var userid = req.params.userid;
    if(userid != undefined){
        var query = 'SELECT * FROM marketing_configureaccounts  WHERE user_id ='+userid;
        connection.query(query, function(err, results) {
             if (err) {
                res.json({error:err,code:101});
                 connection.end();
             }else{
                req.session.param_userid = userid;
                res.json({result:results,code:200});
                connection.end();
             }
    });
  }
}


exports.getfacebookcampaigndetails = function(req,res,next){
    var fb_component1 = new fb_component();
    var t = 0;
    var accessedcampaignsdata = [];
    var accountlength = req.facebookusersconfiguredetails.length;

    for(k in req.facebookusersconfiguredetails){
          var useraccountid = req.facebookusersconfiguredetails[k].useraccountid;
          var setaccesstoken = req.facebookusersconfiguredetails[k].accesstoken;
          var user_id = req.facebookusersconfiguredetails[k].user_id;
        
        
        fb_component1.getFacebookCampaignDetails(req,reqdata,function(resultdata){
              if (resultdata.status == 1) {
                res.json({result:resultdata.response,code:200});  
              }else{
                res.json({result:response.error,code:101});
              }
        });
        
        
    }
  }