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
let port = 3000;
mongoose.connect('mongodb://localhost/project', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
const multer = require('multer');
const products = require('./models/product-model');
const orders = require('./models/order-model');
const crudrouter = require('./routes/crud')
const { urlencoded } = require('body-parser');
const { info } = require('console');
const { model } = require('./models/product-model');
const { session } = require('passport');

require('./public/js/google-oauth')

app.engine('html', exphbs());
app.set('view engine','html');
app.set('view engine', 'ejs');

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/public',express.static(path.join(__dirname,'/public')));


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
  }
}

// If register then go to the admin page
const isNotLogin = (req,res,next)=>{
  if(req.user){
    res.redirect('/dashboard')
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
    // res.render('index.ejs',{layout: false})
    const db = await products.find({})
    res.render('index.ejs',{db})
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
// IF HAVE INTERNET

app.get('/orders', isLogin,(req,res)=>{
  // const db = await products.find({})
  res.render('orders.ejs',{layout:false})
})
app.use('/show-product',crudrouter)
app.get('/show-product',isLogin,async(req,res)=>{
  const db = await products.find({})
  res.render('showProduct.ejs',{db})
})

// Storage Engine for uploading Picture
const storage = multer.diskStorage({
    destination:'./public/Image/',
 
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }  
});


    
app.listen(port,() => {
    console.log("Success to 3000")
})
