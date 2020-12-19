const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path')
const cors =require('cors')
const mongoose = require('mongoose');
const ejs = require('ejs');
const cookieSession = require('cookie-session')
const app = express();
const passport = require('passport');
const Cart_Orders = require('./models/cart-model')
let port = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://admin123:zRIkqj9Pk8Uz2A5I@cluster0.p1ih6.mongodb.net/project', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
// mongodb://localhost/project
const multer = require('multer');
const products = require('./models/product-model');
const Orders = require('./models/orders-model');
const crudrouter = require('./routes/crud')
const { urlencoded } = require('body-parser');
const { info } = require('console');
const { model } = require('./models/product-model');
const { session } = require('passport');
const orderRouter = require('./routes/order-route')
require('./public/js/google-oauth')

app.engine('html', exphbs());
app.set('view engine','html');
app.set('view engine', 'ejs');

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/public',express.static(path.join(__dirname,'/public')));
app.use('/orders',orderRouter)
app.use(cookieSession({
    name: 'admin-session',
    keys: ['key1', 'key2']
  }))

//If not register then go to the login page 
const isLogin = (req,res,next)=>{
  if(req.user){
    next();
  }else{
     res.redirect('/')
     return
  }
}

// If register then go to the admin page
const isNotLogin = (req,res,next)=>{
  if(req.user){
    res.redirect('/dashboard')
    return
  }
  next()
}
app.use(passport.initialize())
app.use(passport.session())

app.get('/',isNotLogin,(req,res)=>{
  res.render('login.ejs',{layout: false})
  // res.render('index.ejs',{layout: false})
})

app.get('/dashboard',isLogin,async(req,res)=>{
  var a = req.user._json.name
  var b = req.user.photos[0].value
  var c = req.user._json.email
  const db = await products.find({})
  const orders = await Orders.find({})
  var zeroStocks = await products.find({"stocks":"0"}).countDocuments()
  var currentValue = await products.aggregate([
    {$group:{
      _id:db.length,
      pricee:{$sum:"$price"},
      stockss:{$sum:"$stocks"}
      
    }},
    {$addFields:{
       total:{$multiply:[{$divide:["$stockss","$_id"]},"$pricee"]}
    }}
  
  ])
  // console.log(currentValue)
  res.render('index.ejs',{
    db,
    orders,
    zeroStocks,
    currentValue,
    userName:a, 
    picture:b,
    email:c
  })
})

app.post('/dashboards',(req,res)=>{
    // res.render('index.ejs',{layout: false})
    res.render('index.ejs',{layout:false})
})

app.get('/google',isNotLogin,passport.authenticate('google',{ scope: ['profile', 'email']}))

app.get('/google/callback',isNotLogin,passport.authenticate('google', { failureRedirect: '/' }),(req, res)=> {
    if(req.user._json.email == "companybeylands@gmail.com"){
    res.redirect('/dashboard');
    }else{
      req.session=null
      req.logout();
       res.clearCookie('admin-session.sig', { path: '/' });
      res.redirect('/')
    }
  }
);
app.get('/logout',(req,res)=>{
  req.session=null
  req.logout();
  res.clearCookie('admin-session.sig', { path: '/' });
   res.redirect('/')
})

app.get('/orders', isLogin,async(req,res)=>{
  const db = await products.find({})
  // const cart_order = await Cart_Orders.find({$text:{$search:id_product}})
  const orders = await Orders.find({})
  const orders_list = await Orders.distinct('cart.items.5fcdad28db5c902e86eb2937.item.name')
  var a = req.user._json.name
  var b = req.user.photos[0].value
  var c = req.user._json.email

  // console.log(orders_list)
  // console.log(db)
  // if(db.toString().trim == "5fcdad28db5c902e86eb2937"){
  //  console.log("hekllo")
  // }

  console.log(orders[0].cart.items[mongoose.isValidObjectId])
  // console.log(orders)

  res.render('orders.ejs',{
    orders,
    orders_list,
    userName:a,
    picture:b,
    email:c
  })
})
app.use('/show-product',crudrouter)
app.get('/show-product',isLogin,async(req,res)=>{
  const db = await products.find({})
  var a = req.user._json.name
  var b = req.user.photos[0].value
  var c = req.user._json.email
  res.render('showProduct.ejs',{
    db,
    userName:a,
    picture:b,
    email:c
  })
})

// // Storage Engine for uploading Picture
// const storage = multer.diskStorage({
//     destination:'./public/Image/',
 
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }  
// });
    
app.listen(port,() => {
    console.log("Success to 3000")
})
