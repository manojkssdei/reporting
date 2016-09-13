var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var viewSchema = new Schema({
    views:{type:Number,required:true},
    deal_id: { type: Schema.Types.ObjectId, ref: 'deals' },
    deal_owner: { type: Schema.Types.ObjectId, ref: 'users' },
    created: {type:Date,default:Date.now},
    modified: {type:Date},
    viewby: { type: Schema.Types.ObjectId, ref: 'users' }        
});
// Mongoose Model definition
var Views = mongoose.model('view_manager', viewSchema);
module.exports = Views;