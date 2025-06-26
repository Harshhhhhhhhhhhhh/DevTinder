const jwt = require("jsonwebtoken");
const User = require("../models/userSchema")



const UserAuth = async (req,res,next)=>{


    try{

        const cookies = req.cookies;

        const {token} = cookies;
    
        if(!token){
            throw new Error("Pls login again ,Invalid Token")
        }
         
        const decodeData = jwt.verify(token , "abcdefghijklmnopqrstuvwxyz")
    
        const {_id }=decodeData;
        const user = await User.findById(_id);
    
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;

        next();

    }
    catch(err){
        res.status(400).send("Authentication Failed ERR: " + err)
;
    }
    
}

module.exports = {
    UserAuth,
}