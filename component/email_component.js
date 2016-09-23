module.exports = function()
{
  /***
    To get sum email
    Created : 2016-09-22
    Created By : Manoj Kumar Singh
  ***/
  this.getSumEmail = function(req,next)
  { 
    var db           = require('./../db.js');
    var common       = require('./common.js');
    var connection   = db.connection_central();
    
    var query1       = "SELECT event_type,count(*) as CNT FROM `campaign_statistics` GROUP BY event_type";
    var query2       = "SELECT count(*) AS COUNT FROM campaigns AS CA LEFT JOIN campaign_emails AS CE ON CA.id= CE.campaign_id WHERE CA.user_id = 1";
    var query3       = "SELECT count(*) as CLICKS FROM `campaign_statistics` where event_type = 1 GROUP BY event_type";
    //camp_ids = campigns.substr(0, campigns.length-1);
    connection.query(query1, function(err, result1) {
      connection.query(query2, function(err, result2) {
        connection.query(query3, function(err, result3) {
        return next({email_count:result2, email_graph_data:result1,clicks:result3});
        });
    });
    });
    
    
    //return {sold_ticket:0, revenue:0}; 
  }
  
  
  
}
