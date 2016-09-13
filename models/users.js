var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    first_name:{type:String,required:true},
    last_name: {type:String,required:true},
    phone: {type:Number,required:true},
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{type:String,required:true},
    gender:{type:String,required:true},
    zipcode:{type:Number,required:true},
    dob:{type:String,required:true},
    agree:{type:String,required:true},
    latitude:{type:Number},
    longitude:{type:Number},
    location:[LocationSchema],
    device_id:{type:String},
    device_type:{type:String},
    photo:{type:String},
    role:{type:String,required:true},
    status:{type:Number},
    created:{type:Date,default:Date.now},
    verify:{type:Number},
    country:{type:String},
    continent:{type:String},
    user_location:{type:String},
    token:{type:String},
    trash:{type:Number},
    last_login:{type:Date},
    deal_range :{type:Number},
    deal_publish_count: {type:Number},
    deal_rating_count: {type:Number},
    deal_review_count: {type:Number},
    deal_share_count: {type:Number},
    deal_flag_count: {type:Number},
    deal_rating_countscore: {type:Number},
    deal_review_countscore: {type:Number},
    deal_share_countscore: {type:Number},
    deal_flag_countscore: {type:Number},
    share_message: {type:String},
    invite_message: {type:String},
    enable_share_message: {type:Boolean},
    enable_invite_message: {type:Boolean},
    assign_role:[],
    actual_role:{type:String}
});

// Mongoose Model definition
var User = mongoose.model('users', UserSchema);
module.exports = User;
