const express = require("express");
const connectDB = require("./config/database.js");
const User= require("./models/userSchema.js");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {UserAuth} = require('./middlewares/auth.js');


const {SignUpValidation} = require("./utils/validation.js");
const {loginValidation} = require("./utils/validation.js");

const app = express();


app.use(express.json());
app.use(cookieParser());


app.post("/signUp" ,async (req,res)=>{

    const {firstName,lastName,emailId,password,age,gender,skills,about}=req.body

    //Validation of data
    SignUpValidation(req);


    //Encrypting the password
    

    const hashPassword = await bcrypt.hash(password,10);
    
    console.log();


    //creating new instance of of the User Model
    const user = new User({
        firstName,lastName,emailId,password:hashPassword,age,gender,skills,about
    })
    try{
        await user.save();
        res.send("User added successfully")

    }
    catch(err){
        res.status(400).send("Error while saving the user" + err.message)

    }
    

})

app.post("/login",async(req,res)=>{


    try{

        const {emailId,password}=req.body;

        //validating email
        loginValidation(req);
    
        const user = await User.findOne({emailId:emailId})
        
        if(!user){
            throw new Error("Incorrect Credential")
        }
        const isPasswordValid = await user.validatePassword(password)
    
        if(isPasswordValid){
            const token = user.getJWT()
            res.cookie("token",token,{expires:new Date(Date.now()+ 8*3600000)})
            res.send("User LoggedIn successfully")
        }
        
        else{
            res.send("Incorrect Credential")
        }


    }
    catch(err){
        res.status(400).send("Invalid credential ERR: " + err)
    }
    

})

app.get("/profile" , UserAuth,async(req,res)=>{

    try{
        
        const user = req.user
        res.send(user)

    }
    catch(err){
        res.status(400).send("user not logged In" + err)


    }
    

})

app.post("/sendConnectionRequest",UserAuth,async(req,res)=>{
    const user = req.user;

    res.send(user.firstName + " Sent you a Conneection ")

})



connectDB()
    .then(()=>{
        console.log("DataBase is connected successfully")
        app.listen(3000,()=>{
        console.log("Server is successfully running on port 3000")
        })
    })
    .catch((err)=>{
        console.err("DataBase connection failed")
    })





