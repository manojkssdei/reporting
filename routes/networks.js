/**
Express Router
Created : 2016-05-12 
Created By: Regal Singh
Module : Network
*/
    
module.exports = function(app, express) {
    /*Import Router*/
    var router = express.Router();  

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file,  cb) {
            cb(null, './public/images/campaign/');
        },
        filename: function (req, file, cb) { 
            cb(null, file.originalname);
        }
    });
    var upload = multer({
        rename: function (fieldname, filename) {
          return 19
        }, storage: storage
    });


    /*Import Network controller*/
    Networks  = require('./../app/networks/controllers/networks.js');  

    
    /*Express routing for getgooglecampaignreports*/    
    router.post('/getgooglecampaignreports/', Networks.setconfigureaccounts,Networks.getgooglecampaignreports);
    
 
    /*Express routing for getcampaignreportlist*/    

    router.post('/getcampaignreportlist/', Networks.getcampaignreportlist);

    /*Express routing for getexisttargeting*/    
    router.post('/callapiforcampaignreport/', Networks.callapiforcampaignreport,Networks.setconfigureaccounts,Networks.getgooglecampaignreports,Networks.savereportinfo);

     /*Express routing for getexisttargeting*/    
    router.post('/callapiforcriteriareport/', Networks.callapiforcriteriareport,Networks.setconfigureaccounts,Networks.getgooglecampaignreports);

    
  /*Express routing for addcampaignreportlist*/    
    router.post('/addcampaignreportlist/',Networks.setconfigureaccounts, Networks.addcampaignreportlist);
    
    /*Express routing for reportdetails*/    
    router.post('/reportdetails/', Networks.reportdetails);
      
 
    /*Express routing for copying google campaign*/    
    router.post('/getfacebookcampaignreports/',Networks.setconfigureaccounts, Networks.getfacebookcampaignreports); 

   /*Express routing for get campaign details*/    
    router.post('/getgooglecampaignreportsdetails/', Networks.getgooglecampaignreportsdetails);  

    /*Express routing for get configureaccounts details*/    
    router.get('/configureaccounts/:userid/', Networks.configureaccounts);  

    /*Express routing for get configureaccounts details*/    
    router.post('/getassociatedaccount', Networks.getassociatedaccount); 

    ////////////////////////////////////////////////////////////////////////////////////////////////
    /*get eventbrite code at step 1 */
    //router.post('/geteventbritetoken/', Networks.geteventbritetoken); 
    router.get('/geteventbritetoken/', Networks.geteventbritetoken); 

    /*generate eventbrite token at step 2 & save it into database*/
    router.get('/geteventbritetokenstep2/', Networks.geteventbritetokenstep2); 
    
    /*get eventbrite profile information*/
    router.post('/geteventbritemyprofile/', Networks.setconfigureaccounts, Networks.geteventbritemyprofile); 
 
    /*get all eventbrite own events*/
    router.post('/geteventbriteownedevents/', Networks.setconfigureaccounts, Networks.geteventbriteownedevents); 
    
     /*get all eventbrite organizers*/
    router.post('/geteventbriteorganizers/', Networks.setconfigureaccounts, Networks.geteventbriteorganizers); 
    
     /*get all eventbrite venues*/
    router.post('/geteventbritevenues/', Networks.setconfigureaccounts, Networks.geteventbritevenues);

    /*get all eventbrite venues*/
    router.post('/geteventbritecategories/', Networks.setconfigureaccounts, Networks.geteventbritecategories);

    /*get all eventbrite venues*/
    router.post('/geteventbritesubcategories/', Networks.setconfigureaccounts, Networks.geteventbritesubcategories); 

    /*get all eventbrite public events*/
    router.post('/geteventbriteevents/', Networks.setconfigureaccounts, Networks.geteventbriteevents); 
    
    /*get all eventbrite contact list*/
    router.post('/geteventbritecontactlists', Networks.setconfigureaccounts, Networks.geteventbritecontactlists); 

    ////////////////////////////////////////////////////////////////////////////////////////////////
    /*Express routing for import or use Network router*/
    app.use('/networks', router);
}