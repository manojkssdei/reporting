// config/auth.js
// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1106475226058035', // your App ID
        'clientSecret'    : 'fc9ce1ac15a34a6d0c06d6c4fbd9f491', // your App Secret
        'callbackURL'     : 'http://alist.marketing:5000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '1055491182438-4n8793mfqnu3fnsi27bcb7iaigfdgnm7.apps.googleusercontent.com',
        'clientSecret'     : 'ChaGJ22Q_R6LUxqFyGvM_oMV',
        'callbackURL'      : 'http://alist.marketing:5000/auth/google/callback'
    },

     'eventbrite' : {
        'clientID'         : '5RLGSPSPPPM237QT4Q',
        'clientSecret'     : 'Q5ERHNU3YCQL5CGXFTSQAZREIKOYZEX3CHWNRLZRGB4YUEQ5PQ',
       // 'callbackURL'      : 'http://127.0.0.1:4009/auth/eventbrite/callback',
        'callbackURL'      : 'http://localhost:5504/networks/geteventbritetokenstep2/',
        'oauthURL'         : 'https://www.eventbrite.com/oauth/authorize',
        'authorizationURL' : 'https://www.eventbrite.com/oauth/token',
        'apiURL'           : 'https://www.eventbriteapi.com/v3/',
        'defaultPageCount' : 50,
    }
};