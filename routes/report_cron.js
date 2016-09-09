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
    
      
    /********************************************* START TICKET CRON  **************************************/
    /** Saving Ticket sales data in report database
    Created : 2016-08-31
    Created By : Manoj Kumar Singh
    **/
    function saveTicketSales()
    {
       ticket_cron.saveTicketSales(); 
    }
    
    setInterval(saveTicketSales, 5000);
    /********************************************* END TICKET CRON   **************************************/
    
    
    
    
}