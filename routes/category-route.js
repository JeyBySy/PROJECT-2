const express = require('express')
const router = express.Router()
const Orders = require('./../models/orders-model')
const Category = require('./../models/category-model')
router.use(express.urlencoded({extended:false}))
const products = require('./../models/product-model')
const mongoose = require('mongoose');

router.post('/add-category',(req,res)=>{
    // console.log(req.body)
    if(req.body.category != ""){
  var add_category = new Category({
    category:req.body.category,
  })
  
  add_category.save(function(err,result){
     if(err){
      console.log(err)
    //   req.flash('msg','PROCES OF ORDER FAILED')
      return res.redirect('/manage-attributes') 
    }
    console.log(result)
    // req.flash('msg','ORDER SUCCESS')
    return res.redirect('/manage-attributes') 
})
  }else{
    // req.flash('msg','PROCES OF ORDER FAILED')
    return res.redirect('/manage-attributes') 
  }
})

router.post('/edit-category',async(req,res)=>{
    await Category.findOneAndUpdate(
      {
         _id:req.body.id
      },
      {  
        $set: {
          category:req.body.category       
        }
      },(error, result) =>{ 
        if(error){
          console.log(error)
        }
        console.log(result)
        return res.redirect('/manage-attributes')
      }
    )

})

router.post('/delete-category',async(req,res)=>{
    await Category.findOneAndDelete(
    // console.log(query)
    {
      category:req.body.category
  }
    ),(error, success) =>{ console.log(error,success) }
    res.redirect('/manage-attributes')

})
module.exports = router
