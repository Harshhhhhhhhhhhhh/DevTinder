const express = require("express")

const connectDB = require("./config/database.js");

const User= require("./models/userSchema.js")

const app = express();

app.post("/signUp" ,async (req,res)=>{
    const userObj = {
        firstName:"Surbhi",
        lastName:"Singh",
        emailId:"surbhi@gmail.com",
        password:"123",
        age:45
    }
    const user = new User(userObj)
    try{
        await user.save();
        res.send("User added successfully")

    }
    catch(err){
        res.status.send("Error while saving the user" + err.message)

    }
    

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





