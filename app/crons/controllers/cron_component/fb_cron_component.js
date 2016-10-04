module.exports = function()
{
  /***
    To get facebook getFacebookDashboardCounts  
    Created : 2016-09-26
    Created By : Manoj Kumar Singh
  ***/
  var fbConfig     = require('./../FacebookAdsConfig.js');
  var fb           = fbConfig.getInstance();
  var fields       = ["account_id","account_name","action_values","actions","ad_id","ad_name","adset_id","adset_name","app_store_clicks","buying_type","campaign_id","cost_per_unique_action_type","cost_per_unique_click","cpm","cpp","ctr","cost_per_unique_inline_link_click","call_to_action_clicks","campaign_name","canvas_avg_view_percent","canvas_avg_view_time","cost_per_10_sec_video_view","cost_per_action_type","cost_per_inline_link_click","cost_per_inline_post_engagement","cost_per_total_action","clicks","cpc","date_start","date_stop","deeplink_clicks","frequency","impressions","inline_link_clicks","inline_link_click_ctr","inline_post_engagement","newsfeed_avg_position","newsfeed_clicks","newsfeed_impressions","objective","place_page_name","reach","relevance_score","social_clicks","social_impressions","social_reach","social_spend","spend","total_action_value","total_actions","total_unique_actions","unique_ctr","unique_actions","unique_clicks","unique_impressions","unique_inline_link_click_ctr","unique_inline_link_clicks","unique_link_clicks_ctr","unique_social_clicks","unique_social_impressions","video_10_sec_watched_actions","video_15_sec_watched_actions","video_30_sec_watched_actions","video_avg_pct_watched_actions","video_avg_sec_watched_actions","video_complete_watched_actions","video_p100_watched_actions","video_p25_watched_actions","video_p50_watched_actions","video_p75_watched_actions","video_p95_watched_actions","website_clicks","website_ctr"];
  
  this.getFacebookreport = function(req,next)
  {
      
    fb.getreportCampaign({     
            fields:JSON.stringify(fields),     
            date_preset:req.date_preset,
            level:req.level,    
            access_token:req.setaccesstoken,
            account_id:req.useraccountid,
            time_increment:1
        },function(error, response){
            
            if(!response.error && response.data !== undefined && response.data != null && response.data != "" && response.data.length>0){
            return next({status:1,response:response.data});  
            }
            else
            {
            return next({status:0,response:""});
            }     
            
    }); 
  }
  
  
/**
Express Component to for breakdown for bar graphs and  comparisons Facebook Campaign
Created : 2016-09-12
Created By: Manoj Singh
Module : Get Report of Breakdowns **/
  
  this.getFacebookBreakdownReports = function(req,filter,next)
  {
    var query = {fields:JSON.stringify(fields),access_token:filter.setaccesstoken,account_id:filter.useraccountid};
    if(req.body.date_range == 'custom'){       
       var time_range   = { "since":req.body.from,"until":req.body.to};
       query.time_range = JSON.stringify(time_range);
    }else{
       query.date_preset = filter.date_preset; 
    }
    if (filter.breakdown) {
        query.breakdowns    = JSON.stringify(filter.breakdown);
    }
    if (filter.action_breakdowns) {
        query.action_breakdowns    = JSON.stringify(filter.action_breakdowns);
    }
    if (filter.level) {
        query.level         = filter.level;
    }
    if (req.body && req.body.time_increment) {
        query.time_increment= req.body.time_increment;
        //delete query.date_preset;
    }
    fb.getreportCampaign(query,function(error, response){
                if (response.error) {
                  return next({status:0,response:response.error});   
                }
                else{
                  return next({status:1,response:response});   
                }
    }); 
  }
  
  
  this.getFacebookDashboardCounts = function(req,filter,next)
  {
    if(req.body.date_range == 'custom'){       
       var time_range = { "since":req.body.from,"until":req.body.to};
        fb.getreportCampaign({     
            fields:JSON.stringify(fields),     
            time_range:JSON.stringify(time_range),
            level:'account',    
            access_token:filter.setaccesstoken,
            account_id:filter.useraccountid,
            //time_increment:1
        },function(error, response){ 
            if (response.error) { 
            return next({result:response.error,status:0});
            }else{ 
            return next({result:response,status:1});
            }
            }); 
    } else {      
      fb.getreportCampaign({
        fields:JSON.stringify(fields),
        date_preset:filter.date_preset,
        level:'account',
        access_token:filter.setaccesstoken,
        account_id:filter.useraccountid
      },function(error, response){
        if (response.error) {
        return next({result:response.error,status:0});
        }else{
        return next({result:response,status:1});  
        }
         
      }); 
    }
 }
 
 this.getFacebookCampaignDetails = function(req,filter,next)
 {
     var fields = ['id','name','objective','status','ads{adset,adset_id,bid_amount,bid_type,created_time,account_id,name}','adsets{name,lifetime_budget,daily_budget,billing_event,budget_remaining,adset_schedule,start_time,end_time,targeting}'];
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