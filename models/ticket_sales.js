var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SaleSchema = new Schema({
    sale_id              : {type:String},
    event_id             : {type:String},
    seller_id            : {type:String},
    user_id              : {type:String},
    transaction_id       : {type:String},
    tickets              : {type:String},
    confirmation_number  : {type:String},
    total_cost           : {type:String},
    buyer_fee            : {type:String},
    seller_fee           : {type:String},
    buyer_fee_covered    : {type:String},
    custom_buyer_fee     : {type:String},
    addl_fees_total      : {type:String},
    service_fee_discount : {type:String},
    donation             : {type:String},
    venue_fee            : {type:String},    
    delivery_fee         : {type:String},  
    delivery_type        : {type:String},
    discount             : {type:String},
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
    created              : {type:Date,default:Date.now}
});
// Mongoose Model definition
var Sale       = mongoose.model('ticket_sales', SaleSchema);
module.exports = Sale;
