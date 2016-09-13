var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EmailSchema = new Schema({
    user_detal           : {},
    user_id              : {type:String},
    showclix_seller_id   : {type:String},
    campaign_email       : {type:String},
    campaign_msg_id      : {type:String},
    event_type           : {type:String},
    stat_email           : {type:String},
    url                  : {type:String}, // email address of subscriber
    ip_address           : {type:String},
    timestamp            : {type:String},
    event_date           : {type:String},
    created              : {type:Date,default:Date.now}
});
// Mongoose Model definition
var Email      = mongoose.model('email_market', EmailSchema);
module.exports = Email;
