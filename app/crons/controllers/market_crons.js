var email_market = require('./../../../models/email_market.js');
var component    = require('./../../../component/common.js');
var db           = require('../../../db.js');

/**
Express Controller to Ticket Crons
Created : 2016-09-12
Created By: Manoj Kumar Singh
Module : Ticket Crons
DB Tables :  campaigns ,  campaign_emails ,  campaign_statistics

SELECT CM.user_id, CM.subject_line, CE.email, CS . *
FROM `campaigns` AS CM
LEFT JOIN campaign_emails AS CE ON CM.id = CE.campaign_id
LEFT JOIN campaign_statistics AS CS ON CE.email = CS.email
WHERE CM.user_id =1
AND CS.campaign_msg_id != ''
LIMIT 200  
*/
exports.saveMarketSales = function(req, res, next) {
    
    function save_data(data)
    {
        email_market.collection.insert(data,function(err2,res)
              {
                if (err2)
                {
                  console.log(err2);
                  console.log("fail");
                  }
                  else
                  {
                  //console.log(res);
                  console.log("success");
                  //res.insertedIds.map(function(obj){
                  // obj = mongoose.Schema.ObjectId(obj) 
                  //})
                  var formatDate = new component();
                  email_market.update({_id:{$in:res.insertedIds}},{$set:{created_date:formatDate.formatDate(new Date(),'DATE')}},{multi:true},function(err5,res2)                  {
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
        email_market.collection.remove({created_date:repeat_date},function(err1,rest)
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
    
    var connection = db.connection_central();
    var query      = "SELECT CM.id, CM.user_id, CM.subject_line, CM.from_name, CE.email, CS.* FROM `campaigns` AS CM LEFT JOIN campaign_emails AS CE ON CM.id = CE.campaign_id LEFT JOIN campaign_statistics AS CS ON CE.email = CS.email WHERE CS.campaign_msg_id != ''";
    connection.query(query, function(err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        //console.log(results);
                    var formatDate = new component();    
                    email_market.collection.count({created_date:formatDate.formatDate(new Date(),'DATE')},function(err5,rcount)
                {
                       if (rcount > 0) {
                        console.log("1");  
                        truncate_data(formatDate.formatDate(new Date(),'DATE'),results);
                        }else{
                        console.log("2");   
                        save_data(results);  
                        }
                });
                    }
                   // connectioncentral.end();
    });
}