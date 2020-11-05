const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const projectSchema= new Schema({
    name: String,
    email: String,
    contact:Number,
    cart:{
        product:[String],
        total:Number
    }
});
const orders = mongoose.model('orders',projectSchema);
module.exports = orders