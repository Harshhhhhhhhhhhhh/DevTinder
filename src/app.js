const express = require("express")

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstName:"Harsh" , lastName:"Raj"})
})

app.post("/user",(req,res)=>{
    res.send("User successfully add to DB")
})

app.delete("/user",(req,res)=>{
    res.send("User Deleted from DB")
})

app.use("/test",(req,res)=>{
    res.send("Hello form the Server hahahahhshs")
})

app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000")
})