module.exports = function()
{
  /***
    To get sum email
    Created : 2016-09-22
    Created By : Manoj Kumar Singh
  ***/
  this.getSumEmail = function(req)
  { 
    var db           = require('./../db.js');
    var common       = require('./common.js');
    var connection   = db.connection_central();
    
    var query1       = "SELECT id FROM campaigns WHERE mail_status=2 AND user_id=1";
   
    
   
    connection.query(query1, function(err, result1) {
    var campigns = "";
    result1.forEach(function(value){
    campigns += value.id+",";
    })
    camp_ids = campigns.substr(0, campigns.length-1);
    console.log(camp_ids);
    var query2       = "SELECT count(*) FROM campaign_emails AS CE WHERE CE.campaign_id";
    connection.query(query2, function(err, result2) {
        
        console.log(result2);
      //var exp_cnt    = count_exp.getKeySum(fb_count);
    });
    
    });
    //return {sold_ticket:0, revenue:0}; 
  }
  
  
  
}
