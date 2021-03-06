/**
Express Router
Created : 2016-08-31 
Created By: Manoj Singh
Module : Report Crons
*/
   
module.exports = function(app, express) {
    /*Import Router*/
    var router       = express.Router();  
    var ticket_cron  = require('./../app/crons/controllers/ticket_crons.js');
    var market_cron  = require('./../app/crons/controllers/market_crons.js');
    var fb_cron      = require('./../app/crons/controllers/facebook_crons.js');
      
    /********************************************* START TICKET CRON  **************************************/
    /** Saving Ticket sales data in report database
    Created : 2016-08-31
    Created By : Manoj Kumar Singh
    **/
    function saveTicketSales()
    {
       ticket_cron.saveTicketSales(); 
    }
    
    //setInterval(saveTicketSales, 1500000000000);
    /********************************************* END TICKET CRON   **************************************/
    
    /********************************************* START MARKET CRON  **************************************/
    /** Saving Ticket sales data in report database
    Created : 2016-09-12
    Created By : Manoj Kumar Singh
    **/
    function saveMarketSales()
    {
       market_cron.saveMarketSales(); 
    }
    
    //setInterval(saveMarketSales, 150000000000);
    /********************************************* END MARKET CRON   **************************************/
    
    /********************************************* START FACEBOOK CRON  **************************************/
    /** Saving Ticket sales data in report database
    Created : 2016-09-12
    Created By : Manoj Kumar Singh
    **/
    function saveFacebookReport()
    {
       fb_cron.saveFacebookReport(); 
    }
    
    //setInterval(saveFacebookReport, 150000000);
    /********************************************* END FACEBOOK CRON   **************************************/
    
    
    
    
    
}