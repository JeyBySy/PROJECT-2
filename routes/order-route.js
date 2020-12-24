const express = require('express')
const router = express.Router()
const Orders = require('./../models/orders-model')
router.use(express.urlencoded({extended:false}))
const products = require('./../models/product-model')
const mongoose = require('mongoose');


router.post('/ready/:id',async(req,res)=>{
    await Orders.findOneAndUpdate(
      {
         _id:req.params.id
      },
      {  
        $set: {
          status:"ready"       
        }
      },(error, result) =>{ 
        if(error){
          console.log(error)
        }
        console.log(result)
        return res.redirect('/orders')
      }
    )
})

router.post('/status-update',async(req,res)=>{
      // console.log(req.body)
  //  var query = {_id:req.body.id};
  //   if (!query._id) {
  //     query._id = new mongoose.mongo.ObjectID();
  //   }
    await Orders.findOneAndUpdate(
      {
         _id:req.body.id
      },
      {  
        $set: {
          status:req.body.status       
        }
      },(error, result) =>{ 
        if(error){
          console.log(error)
        }
        console.log(result)
        return res.redirect('/order-list')
      }
    )

    
})

module.exports = router