var facebook_ads = require('./../../../models/facebook_ads.js');
// Creation of object for services
var fbConfig     = require('./FacebookAdsConfig.js');  
var fb           = fbConfig.getInstance();


function formatDate(convertdate,type) {
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

/**
Express Controller to Add Facebook Campaign
Created : 2016-09-12
Created By: Manoj Singh
Module : Get Report of campaign
Frequency : date_preset must be one of the following values: today, yesterday, last_3_days, this_week, last_week, last_7_days, last_14_days, last_28_days, last_30_days, last_90_days, this_month, last_month, this_quarter, last_3_months, lifetime
**/
exports.saveFacebookReport = function(){

var setaccesstoken   = "EAAPuVVbNTTMBAL9AAkbkKazTgw66NCYaYVTwbKrqRtSzYJJXVteKsBX4zxkx3W4CvnEwDMxQJWZCZA2PWWLoOrM0wiXazoawrSn1wzAyO1I0TalmyGDjOXKOqxRNZASZAFaYPASzIYn15lX3gK5XvhN9LwgD3F9NIo7RKIXwUuf9hMXfGV1qyoHAJpZCSOixKUhhYjgY2Mnv6UUowWDfZA";
var useraccountid    = 114882752278348;
    
    function save_data(data)
    {
      facebook_ads.collection.insert(data,function(err2,res)
              {
                if (err2)
                {
                  console.log(err2);
                  console.log("fail");
                  }
                  else
                  {
                  console.log(res);
                  console.log("success");
                  //res.insertedIds.map(function(obj){
                  // obj = mongoose.Schema.ObjectId(obj) 
                  //})
                  facebook_ads.update({_id:{$in:res.insertedIds}},{$set:{created_date:formatDate(new Date(),'DATE')}},{multi:true},function(err5,res2)                  {
                        if (err5)
                        {
                          console.log(err5);
                          console.log("fail2");
                        }
                        else{
                          console.log("success2");
                        }
                      });
                      
                      }
                  });
    }
    
    function truncate_data(repeat_date,data)
    {
        facebook_ads.collection.remove({created_date:repeat_date},function(err1,rest)
        {
          if (err1) {
          //code
          console.log("4");
          }else{
          console.log("5");  
          save_data(data);  
          }
          
        });
    }
      
    function run_facebook(setaccesstoken,useraccountid)
    {
        var fields  = ["account_id","account_name","action_values","actions","ad_id","ad_name","adset_id","adset_name","app_store_clicks","buying_type","campaign_id","cost_per_unique_action_type","cost_per_unique_click","cpm","cpp","ctr","cost_per_unique_inline_link_click","call_to_action_clicks","campaign_name,canvas_avg_view_percent","canvas_avg_view_time","cost_per_10_sec_video_view","cost_per_action_type","cost_per_inline_link_click","cost_per_inline_post_engagement","cost_per_total_action","clicks","cpc","date_start","date_stop","deeplink_clicks","frequency","impressions","inline_link_clicks","inline_link_click_ctr","inline_post_engagement","newsfeed_avg_position","newsfeed_clicks","newsfeed_impressions","objective","place_page_name","reach","relevance_score","social_clicks","social_impressions","social_reach","social_spend","spend","total_action_value","total_actions","total_unique_actions","unique_ctr","unique_actions","unique_clicks","unique_impressions","unique_inline_link_click_ctr","unique_inline_link_clicks","unique_link_clicks_ctr","unique_social_clicks","unique_social_impressions","video_10_sec_watched_actions","video_15_sec_watched_actions","video_30_sec_watched_actions","video_avg_pct_watched_actions","video_avg_sec_watched_actions","video_complete_watched_actions","video_p100_watched_actions","video_p25_watched_actions","video_p50_watched_actions","video_p75_watched_actions","video_p95_watched_actions","website_clicks","website_ctr"];
        
        fb.getreportCampaign({     
            fields:JSON.stringify(fields),     
            date_preset:'last_90_days',
            level:'ad',    
            access_token:setaccesstoken,
            account_id:useraccountid,
            time_increment:1
        },function(error, response){
            if(response.data.length>0){
              console.log({created_date:formatDate(new Date(),'DATE')});
              facebook_ads.collection.count({created_date:formatDate(new Date(),'DATE')},function(err5,rcount)
              {
                console.log("rcount : "+ rcount);
                  if (rcount > 0) {
                  console.log("1");  
                  truncate_data(formatDate(new Date(),'DATE'),response.data);
                  }else{
                  console.log("2");   
                  save_data(response.data);  
                  }
              });
            }
            else
            {
              console.log("3"); 
            }     
            
        });  
    }
    
    run_facebook(setaccesstoken,useraccountid);
    
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