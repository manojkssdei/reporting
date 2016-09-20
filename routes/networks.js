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
    //Networks  = require('./../app/networks/controllers/networks.js');
    service_con       = require('./../app/networks/controllers/dashboard_manager.js');
    auth              = require('./../component/check_permission.js');
    
    /********************************  SERVICES FOR DASHBOARD *******************************************************/
    /*Express routing for get summary report on dashboard */
    
    router.get('/getSummaryReport/', auth.check_permission, service_con.getSummaryReport);
    
    
    
    
     /********************************  SERVICES FOR DASHBOARD *******************************************************/
       
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /*Express routing for import or use Network router*/
    app.use('/networks', router);
}