const express=require('express')
const app=express()
const router=express.Router()
const User=require('../models/userModels')
const authorization = require('../middleware/Authorization')
router.get('/fetchApi',async (req,res)=>{
    const body=req.body
    const filteredData= await User.find({city:"Mumbai"})
    console.log(filteredData)
    res.status(200).send({filteredData})
})
module.exports=router