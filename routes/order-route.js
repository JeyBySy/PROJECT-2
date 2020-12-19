const express = require('express')
const Orders = require('./../models/orders-model')
const router = express.Router()
router.use(express.urlencoded({extended:false}))


router.post('/awit:id',async(req,res)=>{
    console.log(req.params.id)
})

module.exports = router