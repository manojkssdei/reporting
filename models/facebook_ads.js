var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FacebookSchema = new Schema({
       account_id                   : {type:String},
       account_name                 : {type:String},
       actions                      : [],
       ad_id                        : {type:String},
       ad_name                      : {type:String},
       adset_id                     : {type:Number},
       adset_name                   : {type:String},
       app_store_clicks             : {type:Number},
       campaign_id                  : {type:Number},
       cost_per_unique_action_type  : [],
       cost_per_unique_click        : {type:Number},
       cpm                          : {type:Number},
       cpp                          : {type:Number},
       ctr                          : {type:Number},
       cost_per_unique_inline_link_click: {type:Number},
       call_to_action_clicks        : {type:Number},
       campaign_name                : {type:String},
       canvas_avg_view_percent      : {type:Number},
       canvas_avg_view_time         : {type:Number},
       cost_per_action_type         : [],
       cost_per_inline_link_click   : {type:Number},
       cost_per_inline_post_engagement: {type:Number},
       cost_per_total_action        : {type:Number},
       clicks                       : {type:Number},
       cpc                          : {type:Number},
       date_start                   : {type:Date},
       date_stop                    : {type:Date},
       deeplink_clicks              : {type:Number},
       frequency                    : {type:Number},
       impressions                  : {type:Number},
       inline_link_clicks           : {type:Number},
       inline_link_click_ctr        : {type:Number},
       inline_post_engagement       : {type:Number},
       newsfeed_avg_position        : {type:Number},
       newsfeed_clicks              : {type:Number},
       newsfeed_impressions         : {type:Number},
       objective                    : {type:String},
       reach                        : {type:Number},
       relevance_score              : [],
       social_clicks                : {type:Number},
       social_impressions           : {type:Number},
       social_reach                 : {type:Number},
       social_spend                 : {type:Number},
       spend                        : {type:Number},
       total_action_value           : {type:Number},
       total_actions                : {type:Number},
       total_unique_actions         : {type:Number},
       unique_ctr                   : {type:Number},
       unique_actions               : [],
       unique_clicks                : {type:Number},
       unique_impressions           : {type:Number},
       unique_inline_link_click_ctr : {type:Number},
       unique_inline_link_clicks    : {type:Number},
       unique_link_clicks_ctr       : {type:Number},
       unique_social_clicks         : {type:Number},
       unique_social_impressions    : {type:Number},
       website_clicks               : {type:Number},
       created_date                      : {type:String,default:Date.now()}
    });

// Mongoose Model definition
var FacebookAds       = mongoose.model('facebook_ads_report', FacebookSchema);
module.exports = FacebookAds;
