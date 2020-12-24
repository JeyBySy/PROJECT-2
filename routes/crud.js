const express = require('express')
const router = express.Router()
const products = require('./../models/product-model')
const mongoose = require('mongoose');
router.use(express.urlencoded({extended:false}))
const multer = require('multer');
const { rejects } = require('assert');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.originalname );//cb(null, new Date().toISOString() +  path.extname(file.originalname));
    }
});
const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
   cb(null,true);
  }else{
    return cb(null,false);
  }
}
const upload = multer({
  storage:storage,
  dest: './public/uploads',
  fileFilter:fileFilter
})

router.post('/add',upload.single('image'),async(req,res)=>{
  //  console.log(req.body)
    if(req.body.category == "" || req.body.productName == "" || req.body.price == "" || req.body.stocks =="" ){//|| req.body.description == ""
      return res.redirect('/show-product')
    }
    if (!req.file) {
      await products.create({
      category:req.body.category,
      name:req.body.productName,
      price:req.body.price,
      stocks:req.body.stocks,
      description:req.body.description,
      // size:req.body.size,
      // color:req.body.color
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
    // size:req.body.size,
    // color:req.body.color
}, (error, blogpost) =>{
  if(error){
    console.log(error)
  }
  console.log(blogpost)
  res.redirect('/show-product')
})
}
// console.log(res.json({file:req.file}))
    
})
router.post('/edit',upload.single('image'),async(req,res)=>{
  // console.log(req.file)
  

  var query = {_id:req.body.id};
  if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }
   
  if (!req.file) {
    if(req.body.price >0){
      console.log("hjello")
    }
    await products.findOneAndUpdate(
      {
         _id:req.body.id
      },
      {
        $inc: { 
        //  stocks:req.body.stocks/2,
          // price:req.body.price/2,
        },   
        $set: {

          name: req.body.productName,
          // size:req.body.size,
          // color:req.body.color,
          price:req.body.price,
          stocks:req.body.stocks,
          category:req.body.category,
          description:req.body.description,
          date:new Date().toISOString()
        }
      },(error, result) =>{ 
        if(error){
          console.log(error)
        }
        console.log(result)
        return res.redirect('/show-product')
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
        },(error, result) =>{ 
          if(error){
            console.log(error)
          }
          console.log(result)
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
