const User = require("../models/userModels")

const verifyrole=(allowedroles)=>{
    return async (req,res,next)=>{
        const roleduser=await User.findOne({name:req.username})
        console.log(`this is roleduser ${roleduser}`);
        const requestData=req.body
        const allowedrolelist=allowedroles
        const result=JSON.stringify(allowedrolelist)===JSON.stringify(roleduser.roles)
        
        console.log(`not a verified Roled user${result}`);
        if(!result) return res.status(403).send({msg:`You are an unAuthorized user, please login as root user.`,activStatus:false})
        next()
    }
}
module.exports=verifyrole