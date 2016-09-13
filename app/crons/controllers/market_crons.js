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
    var query   = "SELECT CM.user_id, CM.subject_line, CE.email, CS.* FROM `campaigns` AS CM LEFT JOIN campaign_emails AS CE ON CM.id = CE.campaign_id LEFT JOIN campaign_statistics AS CS ON CE.email = CS.email WHERE CS.campaign_msg_id != ''";
    connection.query(query, function(err, results) {
                    if (err) {
                        console.log('error');
                    }
                    else {
                        console.log(results);
                    }
                   // connectioncentral.end();
    });
}