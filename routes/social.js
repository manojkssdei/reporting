/**
Express Router
Created : 2016-05-12 
Created By: Regal Singh
Module : Social
*/
    
module.exports = function(app, express, passport) {
    /*Import Router*/
    var router = express.Router();  

    /*Import Network controller*/
    Networks  = require('./../app/networks/controllers/networks.js');  
	
	function getsessionvalue(req,res,next){	    
            if(req.params.id!="callback"){
               req.session.param_userid=req.params.id;
            }
            next();
    }
	
    // =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// facebook -------------------------------
       
        // send to facebook to do the authentication
        router.get('/auth/getfacebooktoken', passport.authenticate('facebook', { authType: 'rerequest',scope : ['email','ads_management','ads_read']}));

        // handle the callback after facebook has authenticated the user
        router.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/#/configureaccount',
                failureRedirect : '/#/configureaccount'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        router.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        router.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        router.get('/auth/getgoogletoken',passport.authenticate('google', { scope : ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/adwords'],accessType: 'offline', approvalPrompt: 'force' }));

        // the callback after google has authenticated the user
        router.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/#/configureaccount',
                failureRedirect : '/#/configureaccount'
            }));

      // eventbrite ---------------------------------

        // send to eventbrite to do the authentication
        router.get('/auth/eventbrite',  passport.authenticate('eventbrite'));
        // the callback after eventbrite has authenticated the user
        router.get('/auth/eventbrite/callback',
          passport.authenticate('eventbrite', {
                successRedirect : '/#/configureaccount',
                failureRedirect : '/#/configureaccount'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

// facebook -------------------------------

        // send to facebook to do the authentication
        router.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        router.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        router.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        router.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        router.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        router.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

// facebook -------------------------------
    router.get('/unlink/facebook',  function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    router.get('/unlink/twitter',  function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    router.get('/unlink/google',  function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

      /*Express routing for import or use Network router*/
	    app.use('/', router);
}
