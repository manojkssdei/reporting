var request      = require('request');
var http         = require('http');
var ticket_sales = require('./../models/ticket_sales.js');
var facebook_ads = require('./../models/facebook_ads.js');
var email_market = require('./../models/email_market.js');
var common       = require('./common.js');
var email_comp   = require('./email_component.js');
var facebook_manager    = require('./../app/crons/controllers/facebook_crons.js');
module.exports = function()
{
  this.global_dashboard_count = function(req,res,next)
  {
    if (req.body.from && req.body.from != "" && req.body.from !== undefined && req.body.to && req.body.to != "" && req.body.to !== undefined) {
        var input = {date:{$gte:req.body.from,$lte:req.body.to}};
    }else{
        var input = {};       
    }
    var input_fb = {};
    // Sales data
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ticket_sales.aggregate({$match:input},{$group:{_id:"$created",count:{$sum:1},total_ticket:{$sum:"$tickets"},revenue:{$sum:"$total_cost"}}},function(err, sales_count) {
            if (err) {
                res.json({code:101,errmsg:"Data Fetch Err",err:err});
            }
            else
            {
              //facebook_ads.aggregate({$match:input_fb},{$group:{_id:"$created_date",count:{$sum:1},cpm:{$sum:"$cpm"},cpp:{$sum:"$cpp"},ctr:{$sum:"$ctr"},impressions:{$sum:"$impressions"},spend:{$sum:"$spend"},social_spend:{$sum:"$social_spend"},social_impressions:{$sum:"$social_impressions"},reach:{$sum:"$reach"},cpc:{$sum:"$cpc"},unique_clicks:{$sum:"$unique_clicks"},clicks:{$sum:"$clicks"}}},function(err, fb_count) {
                //console.log(fb_count);
                facebook_manager.getFacebookDashboardCounts(req,res,function(fb_count){
                  var count_exp       = new common();
                  var count_email     = new email_comp();
                  var exp_cnt         = count_exp.getKeySum(fb_count.result);
                  var exp_cnticket    = count_exp.getKeySumTicket(sales_count);
                  count_email.getSumEmail(req,function(tdata){
                  return next({sales_count:exp_cnticket,facebook_count:exp_cnt,cnemail:tdata});  
                  });
                });
            }
    });
    
    
    //ticket_sales.find(input,function(err,sales_count)
    //{   var facebook_count = email_count = '';
    //    return next({sales_count:sales_count,facebook_count:facebook_count,email_count:email_count});
    //});
    
  }
}