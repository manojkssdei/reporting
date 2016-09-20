var request      = require('request');
var http         = require('http');
var ticket_sales = require('./../models/ticket_sales.js');
var facebook_ads = require('./../models/facebook_ads.js');
var email_market = require('./../models/email_market.js');
module.exports = function()
{
  this.global_dashboard_count = function(req,res,next)
  {
    if (req.body.from && req.body.from != "" && req.body.from !== undefined && req.body.to && req.body.to != "" && req.body.to !== undefined) {
        var input = {date:{$gte:req.body.from,$lte:req.body.to}};
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
              
              
               return next({sales_count:sales_count,facebook_count:0,email_count:0});
              
              
            }
    });
    
    
    //ticket_sales.find(input,function(err,sales_count)
    //{   var facebook_count = email_count = '';
    //    return next({sales_count:sales_count,facebook_count:facebook_count,email_count:email_count});
    //});
    
  }
}