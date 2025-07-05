const express = require("express");
const {SignUpValidation} = require("../utils/validation.js");
const bcrypt = require('bcrypt');
const User = require("../models/userSchema.js");
const {loginValidation}=require("../utils/validation.js");

const authRouter = express.Router();



authRouter.post("/signUp" ,async (req,res)=>{

    const {firstName,lastName,emailId,password,age,gender,skills,about}=req.body

    //Validation of data
    SignUpValidation(req);

    //Encrypting the password
    const hashPassword = await bcrypt.hash(password,10);

    //creating new instance of of the User Model
    const user = new User({
        firstName,lastName,emailId,password:hashPassword,age,gender,skills,about
    })

    try{
        await user.save();
        res.send("User signup successfully")

    }
    catch(err){
        res.status(400).send("Error while saving the user  ERR: " + err.message)

    }
    

})



authRouter.post("/login",async(req,res)=>{


    try{

        const {emailId,password}=req.body;

        //validating email
        loginValidation(req);
    
        const user = await User.findOne({emailId:emailId})
        
        if(!user){
            throw new Error("Incorrect Credential")
        }
        //Checking is password correct or not
        const isPasswordValid = await user.validatePassword(password)
    
        if(isPasswordValid){
            const token = user.getJWT()
            res.cookie("token",token,{expires:new Date(Date.now()+ 8*3600000)})
            res.json({message:"User LoggedIn successfully",data:user})
        }
        
        else {
            return res.status(401).json({ message: "Incorrect Credential" });
        }



    }
    catch(err){
        res.status(400).send("Invalid credential ERR: " + err)
    }
    

})



authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("User logedOut");

})



module.exports=authRouter;