/**
Express Router
Created : 2016-09-20 
Created By: Manoj Singh
Module : Network
*/
    
module.exports = function(app, express) {
    /*Import Router*/
    var router = express.Router();  

    /*Import Network controller*/
    service_con       = require('./../app/networks/controllers/dashboard_manager.js');
    auth              = require('./../component/check_permission.js');
    
    /********************************  SERVICES FOR DASHBOARD *********************************/
    /*Express routing for get summary report on dashboard */
    
    router.get('/getSummaryReport/', auth.check_permission, service_con.getSummaryReport);
    /************************** GRAPH SERVICE STARTED***************************************/
    /*Created : 2016-09-20 
    Created By: Manoj Singh
    Service : get Summary report for dashboard count */
    router.post('/getSummaryReport/', auth.check_permission, service_con.getSummaryReport);
    
    /*Created : 2016-09-20 
    Created By: Manoj Singh
    Service : get Facebook breakdown report */
    router.post('/getBreakdownReport/', auth.check_permission, service_con.getBreakdownReport);
    
    /*Created : 2016-09-20 
    Created By: Manoj Singh
    Service : get Facebook breakdown comparison report */
    router.post('/getBreakdownTimeReport/', auth.check_permission, service_con.getBreakdownTimeReport);
    
    /*Created : 2016-09-29 
    Created By: Manoj Singh
    Service : get Ticket Sales report */ 
    router.post('/getTicketSalesReport/', auth.check_permission, service_con.getTicketSalesReport);
    /************************** DASHBOARD SERVICE END******************************************/
    
    
    /******************************** GRAPH SERVICE END **************************************/
       
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /*Express routing for import or use Network router*/
    app.use('/networks', router);
}