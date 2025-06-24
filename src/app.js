const express = require("express")

const connectDB = require("./config/database.js");

const User= require("./models/userSchema.js")

const app = express();

app.use(express.json())

app.post("/signUp" ,async (req,res)=>{
    
    const user = new User(req.body)
    try{
        await user.save();
        res.send("User added successfully")

    }
    catch(err){
        res.status.send("Error while saving the user" + err.message)

    }
    

})

app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId:userEmail});
        if(user.length===0){
            res.status(400).send("Cannot find user")

        }
        else{
            res.send(user)
        }
    }
    catch(err){
        res.status(400).send("Something went wrong "+err)
    }

})


//Feed-API--get/feed--get all users from data base

app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        // if(users.length===0){
        //     res.status(400).send("Cannot find user")

        // }
        //else{
            res.send(users)
        //}
    }
    catch(err){
        res.status(400).send("Something went wrong "+err)
    }
    

})

//Delete Api
app.delete("/user", async(req,res)=>{
    const userId = req.body.userId

    try{
        const user = await  User.findByIdAndDelete(userId);
        res.send("user deleted")
    }
    catch(err){
        res.status(400).send("something went wrong" + err)
    }
})

//Patch api

app.patch("/user",async(req,res)=>{
    const userId = req.body.userId
    const data = req.body

    await User.findOneAndUpdate({ _id:userId},data);
    try{
        res.send("user emailId updated")
    }
    catch(err){
        res.status(400).send("Something went wrong"+err)
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





