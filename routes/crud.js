const express = require('express')
const router = express.Router()
const products = require('./../models/product-model')
const mongoose = require('mongoose');
router.use(express.urlencoded({extended:false}))
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, Date.now() +  path.extname(file.originalname));
    }
});

const upload = multer({
  storage:storage,
  dest: './public/uploads'
})

router.post('/add',upload.single('image'),async(req,res)=>{
    // console.log(req.file)
    if (!req.file) {
      await products.create({
      category:req.body.category,
      name:req.body.productName,
      price:req.body.price,
      stocks:req.body.stocks,
      description:req.body.description,
      size:req.body.size,
      color:req.body.color
  }, (error, blogpost) =>{
    if(error){
      console.log(error)
    }
    console.log(blogpost)
    res.redirect('/show-product')
  })
}else{
  await products.create({
    image:req.file.filename,
    category:req.body.category,
    name:req.body.productName,
    price:req.body.price,
    stocks:req.body.stocks,
    description:req.body.description,
    size:req.body.size,
    color:req.body.color
}, (error, blogpost) =>{
  if(error){
    console.log(error)
  }
  console.log(blogpost)
  res.redirect('/show-product')
})
}
    
})
router.post('/edit',upload.single('image'),async(req,res)=>{
  // console.log(req.file)
    var query = {_id:req.body.id};
  if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }
 if (!req.file) {
    await products.findOneAndUpdate(
      {
         _id:req.body.id
      },
      {
        $inc: { 
         stocks:req.body.stocks/2,
          price:req.body.price/2,
        },   
        $set: {
          name: req.body.productName,
          size:req.body.size,
          color:req.body.color,
          description:req.body.description
        }
      },(error, blogpost) =>{ 
        if(error){
          console.log(error)
        }
        console.log(blogpost)
        res.redirect('/show-product')
      }
    )
 }else{
  await products.findOneAndUpdate(
        {
          _id:req.body.id
        },
        {
          $inc: { 
          stocks:req.body.stocks/2,
            price:req.body.price/2,
          },   
          $set: {
            image:req.file.filename,
            name: req.body.productName,
            size:req.body.size,
            color:req.body.color,
            description:req.body.description
          }
        },(error, blogpost) =>{ 
          if(error){
            console.log(error)
          }
          console.log(blogpost)
          res.redirect('/show-product')
  }
  ) 
 }
    
})

router.post('/delete',async(req,res)=>{
   var query = {_id: req.body.id};
  if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
}
   await products.findOneAndDelete(
    // console.log(query)
    {
      _id:req.body.id
  }
    ),(error, success) =>{ console.log(error,success) }
  
    res.redirect('/show-product')
})


module.exports = router
