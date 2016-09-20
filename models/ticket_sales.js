var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SaleSchema = new Schema({
    sale_id              : {type:String},
    event_id             : {type:Number},
    seller_id            : {type:Number},
    user_id              : {type:Number},
    transaction_id       : {type:String},
    tickets              : {type:Number},
    confirmation_number  : {type:String},
    total_cost           : {type:Number},
    buyer_fee            : {type:Number},
    seller_fee           : {type:Number},
    buyer_fee_covered    : {type:Number},
    custom_buyer_fee     : {type:Number},
    addl_fees_total      : {type:Number},
    service_fee_discount : {type:Number},
    donation             : {type:Number},
    venue_fee            : {type:Number},    
    delivery_fee         : {type:Number},  
    delivery_type        : {type:String},
    discount             : {type:Number},
    cardnumber           : {type:String},
    first_four           : {type:String},
    date                 : {type:String},
    address              : {type:String},
    address_2            : {type:String},
    city                 : {type:String},
    state                : {type:String},
    zip                  : {type:String},
    country              : {type:String},
    phone                : {type:String},
    email                : {type:String},
    purchase_for         : {type:String},
    is_POS               : {type:String},
    payment_method       : {type:String},    
    currency             : {type:String},
    ticket_set           : {type:String},
    cancel_set           : {type:String},
    created              : {type:Date,default:Date.now()}
});
// Mongoose Model definition
var Sale       = mongoose.model('ticket_sales_data', SaleSchema);
module.exports = Sale;
