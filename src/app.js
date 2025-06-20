const express = require("express")

const app = express();


 app.use("/",(err,req,res,next)=>{
     if(err){
         res.status(500).send("Something went wrong")
     }

 })


app.get("/getUserData",(req,res)=>{

    //try{
        //logic for DataBase call and get user data
        throw new Error("Throwing randome error")
        res.send("User Data is sent");

    //}
    // catch(err){
    //     res.status(500).send("Throwing randome error")

    // }

}
);


 app.use("/",(err,req,res,next)=>{
     if(err){
         res.status(500).send("Something went wrong")
     }

 })


app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000")
})