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
    var count_exp       = new common();
    var find_dates      = count_exp.getDateFilter(req.body.date_range);
    console.log(find_dates);
    var input = {};
    if (find_dates.from && find_dates.from != "" && find_dates.from !== undefined && find_dates.to && find_dates.to != "" && find_dates.to !== undefined) {
        var input = {date:{$gte:find_dates.from,$lte:find_dates.to}};
    }else{
        var input = {};       
    }
    
    // Sales data
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ticket_sales.aggregate({$match:input},{$group:{_id:"$created",count:{$sum:1},total_ticket:{$sum:"$tickets"},revenue:{$sum:"$total_cost"}}},function(err, sales_count) {
            if (err) {
                res.json({code:101,errmsg:"Data Fetch Err",err:err});
            }
            else
            {
                facebook_manager.getFacebookDashboardCounts(req,res,function(fb_count){
                  var count_email     = new email_comp();
                  var exp_cnt         = count_exp.getKeySum(fb_count.result);
                  var exp_cnticket    = count_exp.getKeySumTicket(sales_count);
                  count_email.getSumEmail(req,function(tdata){
                  return next({sales_count:exp_cnticket,facebook_count:exp_cnt,cnemail:tdata});  
                  });
                });
            }
    });
  }
  /**
  Express Controller to getShowclixTicketReport
  Created : 2016-09-29
  Created By: Manoj Singh
  Module : getShowclixTicketReport
 */
  this.getShowclixTicketReport = function(req,res,next){
    var count_exp       = new common();
    var find_dates      = count_exp.getDateFilter(req.body.date_range);
    var input = {};
    if (find_dates.from && find_dates.from != "" && find_dates.from !== undefined && find_dates.to && find_dates.to != "" && find_dates.to !== undefined) {
        var input = {date:{$gte:find_dates.from,$lte:find_dates.to}};
    }else{
        var input = {};       
    }    
    ticket_sales.find(input,function(err, sales_data) {
            if (err) {
            res.json({code:101,errmsg:"Data Fetch Err",err:err});
            }
            else{
            res.json({code:200,result:sales_data});  
            }
    });
  }
}