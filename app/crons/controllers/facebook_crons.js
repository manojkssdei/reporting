var request      = require("request");
var http         = require("http");
var googleapiurl = "/googleadwordsapi/adword/examples/AdWords/v201603/";
var db           = require('../../../db.js');
// Creation of object for services
var fbConfig     = require('./FacebookAdsConfig.js');  
var fb           = fbConfig.getInstance();


function formatDate(convertdate) {
    if(convertdate != '' && convertdate != undefined)
        var today = new Date(convertdate);
    else 
        var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var strTime = hours + ':' + minutes + ':' + seconds;
    var month = +today.getMonth() + +1;
    if(convertdate != '' && convertdate != undefined)
      return today.getFullYear() + "-" + month + "-" + today.getDate();
    else 
      return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
}

/**
Express Controller to Add Facebook Campaign
Created : 2016-09-12
Created By: Manoj Singh
Module : Get Report of campaign
*/
exports.saveFacebookReport = function(){   
    var fields = ["campaign_id","campaign_name","account_id","objective","cpm","cpc","impressions","spend","ctr","adset_name","ad_id","ad_name","clicks","cost_per_total_action","inline_post_engagement"];
    var setaccesstoken   = "EAAPuVVbNTTMBAL9AAkbkKazTgw66NCYaYVTwbKrqRtSzYJJXVteKsBX4zxkx3W4CvnEwDMxQJWZCZA2PWWLoOrM0wiXazoawrSn1wzAyO1I0TalmyGDjOXKOqxRNZASZAFaYPASzIYn15lX3gK5XvhN9LwgD3F9NIo7RKIXwUuf9hMXfGV1qyoHAJpZCSOixKUhhYjgY2Mnv6UUowWDfZA";
    var useraccountid    = 114882752278348;
    //{ message: '(#100) date_preset must be one of the following values: today, yesterday, last_3_days, this_week, last_week, last_7_days, last_14_days, last_28_days, last_30_days, last_90_days, this_month, last_month, this_quarter, last_3_months, lifetime',
     //type: 'OAuthException',
     //code: 100,
     //fbtrace_id: 'C/GDVfKZWqD' } }

        
    fb.getreportCampaign({     
        fields:JSON.stringify(fields),     
        date_preset:'last_3_months',
        level:'ad',    
        access_token:setaccesstoken,
        account_id:useraccountid
    },function(error, response){
      
       if(response.data.length>0){
          console.log("++++++++++++++++++++++++++++");
          console.log(response);
          console.log("++++++++++++++++++++++++++++");
            /*var connection = db.connection();  
            for(var i=0;i<response.data.length;i=i+1){
              var savedata = response.data[i];        
              var query = "INSERT INTO `marketing_facebook_campaignreport` SET ";
              query = query + "  `id` = NULL";
              query = query + ", `campaign_id` = '"+savedata.campaign_id+"'";
              query = query + ", `network_id` = 1";
              query = query + ", `campaign_name` = '"+savedata.campaign_name+"'";
              query = query + ", `account_id` = '"+savedata.account_id+"'";
              query = query + ", `objective` = '"+savedata.objective+"'";
              query = query + ", `cpm` = '"+savedata.cpm+"'";
              query = query + ", `cpc` = '"+savedata.cpc+"'";
              query = query + ", `impressions` = '"+savedata.impressions+"'";
              query = query + ", `spend` = '"+savedata.spend+"'";
              query = query + ", `ctr` = '"+savedata.ctr+"'";
              query = query + ", `group_name` = '"+savedata.adset_name+"'";
              query = query + ", `ad_id` = '"+savedata.ad_id+"'";
              query = query + ", `ad_name` = '"+savedata.ad_name+"'";
              query = query + ", `clicks` = '"+savedata.clicks+"'";
              query = query + ", `cost_per_total_action` = '"+savedata.cost_per_total_action+"'";
              query = query + ", `inline_post_engagement` = '"+savedata.inline_post_engagement+"'";
              query = query + ", `date_start` = '"+savedata.date_start+"'";
              query = query + ", `date_stop` = '"+savedata.date_stop+"'"; 
              query = query + ", `createddate` = '"+savedata.date_start+"'";             
              connection.query(query, function(err7, results) {
                if (err7) { console.log('error'); }else{ console.log('success'); }
                connection.end();
              }); 
            }
        */
        }else {
          //res.json({result:response,code:200});
          console.log("===================");
          console.log(response);
          console.log(error);
          console.log("===================");
          //connection.end();
        }     
        
    });    
}

/**
Express Controller to getfacebookcampaignreports
Created : 2016-09-12
Created By: Manoj Singh
Module : getfacebookcampaignreports
*/


exports.getfacebookcampaignreports = function(req,res){   
    
    var fields = ["campaign_id","campaign_name","account_id","objective","cpm","cpc","impressions","spend","ctr","adset_name","ad_id","ad_name","clicks","cost_per_total_action","inline_post_engagement"];  

   // act_114882752278348/campaigns?fields=id,name,objective,status,ads{adset,adset_id,bid_amount,bid_type,created_time,account_id,name},adsets{name,lifetime_budget,daily_budget,billing_event,budget_remaining,adset_schedule,start_time,end_time,targeting}
   
    if(req.body.breakdown=='0'){
      var breakdown = ['age','gender'];
    }else {
      var breakdown = [req.body.breakdown]; 
    }
     
    if(req.configuredetails.accesstoken!=""){ var setaccesstoken = req.configuredetails.accesstoken; }
    if(req.configuredetails.useraccountid!=""){var useraccountid = req.configuredetails.useraccountid; }

    if(req.body.facebookdateRangeType=='custom'){       
       var time_range = { "since":req.body.startdatereports,"until":req.body.enddatereports};
        fb.getreportCampaignlevel({ 
              campaignid:req.body.campaignid,  
              fields:JSON.stringify(fields),
              breakdowns:JSON.stringify(breakdown),    
              time_range:JSON.stringify(time_range),               
              access_token:setaccesstoken,
              account_id:useraccountid
            },function(error, response){      
              res.json({result:response,code:200}); 
            }); 
    }else {      
      fb.getreportCampaignlevel({
        campaignid:req.body.campaignid,       
        fields:JSON.stringify(fields),
        breakdowns:JSON.stringify(breakdown),     
        date_preset:req.body.facebookdateRangeType,    
        access_token:setaccesstoken,
        account_id:useraccountid
      },function(error, response){      
        res.json({result:response,code:200}); 
      }); 
    }
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
    var fields = ['id','name','objective','status','ads{adset,adset_id,bid_amount,bid_type,created_time,account_id,name}','adsets{name,lifetime_budget,daily_budget,billing_event,budget_remaining,adset_schedule,start_time,end_time,targeting}'];

    var t = 0;
    var accessedcampaignsdata = [];
    var accountlength = req.facebookusersconfiguredetails.length;

    for(k in req.facebookusersconfiguredetails){
          var useraccountid = req.facebookusersconfiguredetails[k].useraccountid;
          var setaccesstoken = req.facebookusersconfiguredetails[k].accesstoken;
          var user_id = req.facebookusersconfiguredetails[k].user_id;

        fb.getCampaign({ 
          fields:JSON.stringify(fields),     
          access_token:setaccesstoken,
          account_id:useraccountid
        },function(error, response){ 
                var facebookcampaign = {};
                facebookcampaign.campaigns = response;
                facebookcampaign.userid = user_id;
                facebookcampaign.networkid = 1;
                accessedcampaignsdata.push(facebookcampaign);
                t = t+1;
                if(t==accountlength) {
                  req.accessedcampaignsdata = accessedcampaignsdata;
                  next();
                }
        });
    }
  }