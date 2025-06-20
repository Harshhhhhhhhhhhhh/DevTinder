const express = require("express")

const app = express();

const {adminAuth} = require("./middlewares/auth.js")

app.use("/admin",adminAuth);

app.get("/admin/getAllData",(req,res)=>{

    res.send("Data sent");


}
);
app.delete("/admin/deleteData",(req,res)=>{
    
    res.send("Data deleted")
})

app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000")
})