const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path')
const cors =require('cors')
const mongoose = require('mongoose');
const ejs = require('ejs');
const cookieSession = require('cookie-session')
const app = express();
let port = 3000;
mongoose.connect('mongodb://localhost/project', {useNewUrlParser: true,useUnifiedTopology: true })
const products = require('./models/product-model');
const orders = require('./models/order-model');
const passport = require('passport');

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

const isLogin = (req,res,next)=>{
  if(req.user){
    next();
  }else{
     res.redirect('/')
  }
}
const isNotLogin = (req,res,next)=>{
  if(req.user){
    res.redirect('/admin-page')
  }
  next()
}
app.use(passport.initialize())
app.use(passport.session())

app.get('/',isNotLogin,(req,res)=>{
  res.render('login.ejs',{layout: false})
  // res.render('index.ejs',{layout: false})
})

app.get('/admin-page',isLogin,async(req,res)=>{
    // res.render('index.ejs',{layout: false})
    const db = await products.find({})
    res.render('index.ejs',{db})
})

app.post('/admin-page',async(req,res)=>{
    // res.render('index.ejs',{layout: false})
    const db = await products.find({})
    res.render('index.ejs',{db})
// console.log(db)
})

app.get('/google',isNotLogin,passport.authenticate('google',{ scope: ['profile', 'email']}))

app.get('/google/callback',isNotLogin,passport.authenticate('google', { failureRedirect: '/' }),(req, res)=> {
    if(req.user._json.email == "companybeylands@gmail.com"){
    res.redirect('/admin-page');
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

app.listen(port,() => {
    console.log("Success to 3000")
})