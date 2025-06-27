const express = require("express");
const {UserAuth} = require("../middlewares/auth.js")



const profileRouter=express.Router()

profileRouter.get("/profile" , UserAuth,async(req,res)=>{

    try{
        
        const user = req.user
        res.send(user)

    }
    catch(err){
        res.status(400).send("user not logged In" + err)


    }
    

})

module.exports = profileRouter