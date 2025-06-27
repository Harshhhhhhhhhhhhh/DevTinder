const express = require("express");
const {UserAuth} = require("../middlewares/auth.js")

const {editProfileValidation} = require("../utils/validation.js")



const profileRouter=express.Router()

profileRouter.get("/profile/view" , UserAuth,async(req,res)=>{

    try{
        
        const user = req.user
        res.send(user)

    }
    catch(err){
        res.status(400).send("user not logged In" + err)


    }
    

})

profileRouter.post("/profile/edit",UserAuth,async(req,res)=>{
    try{
        editProfileValidation(req);
        if(!editProfileValidation){
            res.send("You are not allowed to update this Field");
        }
        const LoggedInUser = req.user;

        Object.keys(req.body).forEach((key)=>{
            LoggedInUser[key]=req.body[key]
        })

        await LoggedInUser.save();

        res.json({"message":`${LoggedInUser.firstName} , your profile is Updated`,"data":LoggedInUser})




    }
    catch(err){
        res.status(400).send("Something went wrong  ERR:" + err)

    }

})

module.exports = profileRouter