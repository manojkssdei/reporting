// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var EventbriteStrategy = require('passport-eventbrite-oauth').OAuth2Strategy;

console.log(EventbriteStrategy); 
// load the auth variables
var configAuth = require('./auth'); // use this one for testing

var fbConfig = require('../app/networks/controllers/FacebookAdsConfig.js');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
         done(null, id);
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : ['id', 'name', 'email'],
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {        
	var newUser          = {};
	newUser.id    = profile.id;
	newUser.token = token;
	newUser.refreshtoken = refreshToken;
	newUser.network_id = 1;
    newUser.user_id = req.session.param_userid;
    newUser.username = profile.name;
        fbConfig.addConfig("default", { 
	    accessToken: token
       }); 
       var fb = fbConfig.getInstance();
       fb.getaccountid({
          profileid:profile.id, 
          access_token:token
       },function(error, response){   
         console.log(response);      
        if(response.data.length>0){       
           newUser.useraccountid = response.data[0]['account_id'];
        }
        saveusertoken(newUser)
	return done(null,newUser);
     });

	
        // asynchronous
        /*process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();

                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }
        });*/

    }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, tokenSecret, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.twitter.token) {
                            user.twitter.token       = token;
                            user.twitter.username    = profile.username;
                            user.twitter.displayName = profile.displayName;

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser                 = new User();

                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user                 = req.user; // pull the user out of the session

                user.twitter.id          = profile.id;
                user.twitter.token       = token;
                user.twitter.username    = profile.username;
                user.twitter.displayName = profile.displayName;

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });
            }

        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {
	var newUser          ={};
	newUser.id    = profile.id;
	newUser.token = token;
	newUser.refreshtoken = refreshToken;
	newUser.network_id = 2;
    newUser.user_id = req.session.param_userid;
    newUser.username = profile.name;
	saveusertoken(newUser)
	return done(null,newUser);
        // asynchronous
      /*process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser          = new User();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session

                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });

            }

        });*/

    }));

passport.use(new EventbriteStrategy({
    clientID: configAuth.eventbrite.clientID,
    clientSecret: configAuth.eventbrite.clientSecret,
    callbackURL: configAuth.eventbrite.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
     console.log('Hey');
     console.log(accessToken);
    /*User.findOrCreate({ eventbriteId: profile.id }, function (err, user) {
      return done(err, user);
    });*/
  }
));
	
   function saveusertoken(newdata){
   var db = require('../db.js');
   var connection = db.connection();
   var query = 'SELECT profile_id FROM `configureaccounts` WHERE `profile_id` = '+'"'+newdata.id+'"';
  
      if (query != ""){
      connection.query(query, function(err7, result) {
        if(err7){
           console.log(err7);
        }else
        if(result.length == 0){             
            var query = "INSERT INTO `configureaccounts` SET ";
            query = query + "  `id` = NULL ,";           
          }else {
            var query = "UPDATE `configureaccounts` SET ";             
          }               
          if(newdata.token != undefined)
            query = query + " `accesstoken` = '"+newdata.token+"'";
          
          if(newdata.refreshtoken != undefined)
            query = query + ", `refreshtoken` = '"+newdata.refreshtoken+"'";
          
          if(newdata.network_id != undefined)
            query = query + ", `network_id` = '"+newdata.network_id+"'";

          if(newdata.user_id != undefined)
            query = query + ", `user_id` = '"+newdata.user_id+"'";

         if(newdata.useraccountid != undefined)
            query = query + ", `useraccountid` = '"+newdata.useraccountid+"'"; 

         if(newdata.username != undefined)
            query = query + ", `username` = '"+newdata.username+"'"; 
          
            query = query + ", `created` = '"+formatDate()+"'";
            query = query + ", `modified` = '"+formatDate()+"'";
            
            query = query + ", `status` = 1";
       if(result.length == 0){ 
            query = query + ", `profile_id` = '"+newdata.id+"'"; 
       }else {
            query = query + " WHERE `profile_id` = '"+newdata.id+"'";
       }
      
      if (query != "") {
        connection.query(query, function(err7, results) {
            connection.end(); 
        });        
      }
      });
    }
  }
  
  function formatDate(convertdate) {
    if(convertdate != '' && convertdate != undefined)
        var today = new Date(convertdate);
    else 
        var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var strTime = hours + ':' + minutes + ':' + seconds;
    var month = +today.getMonth() + +1;
    if(convertdate != '' && convertdate != undefined)
      return today.getFullYear() + "-" + month + "-" + today.getDate();
    else 
      return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
 }

};
