const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const projectSchema= new Schema({
    cart:{
        type:Object,
        
    },
    name:{
        type:String,
        
    },
     productName:{
        type:Array
    },
    productQty:{
        type:Array
    },
    email:{
        type:String,
       
    },
    contact:{
        type:Number,
   
    },
    address:{
        type:String,
     
    },
    receive:{
        type:String,
       
    },
    status:{
        type:String
    }
    
    
});
const orders = mongoose.model('orders',projectSchema);
module.exports = orders