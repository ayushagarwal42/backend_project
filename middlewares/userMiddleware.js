const jwt=require('jsonwebtoken');
const USER = require("../model/userModel")


exports.validatedToken=async(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        if(!token){
            return res.status(400).json({
                code: 400,
                message: "token is not provided or token is invalid",
            });   
        }
        const decode=jwt.verify(token,'secret')
        if(!decode){
            return res.status(400).json({
                code: 400,
                message: "token is not verified",
            });
        }
        const userData=await USER.findOne({_id:decode._id,userEmail:decode.userEmail})
        if(!userData){
            return res.status(404).json({
                code: 404,
                message: "user not found with this token",
            });
        }
        else{
            req.currentUser=userData;
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
}
