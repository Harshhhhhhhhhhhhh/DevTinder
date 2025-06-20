const express = require("express")

const app = express();

app.use("/user",(req,res,next)=>{
    console.log("Handling the route of user!!");
    //res.send("Response!!");
    next();
},
(req,res,next)=>{
    //route handler 2
    console.log("Handling the route2 of  user!!");
   // res.send("Response2!!");
    next()
},
(req,res,next)=>{
    //route handler 3
    console.log("Handling the route3 of  user!!");
    //res.send("Response3!!");
    next()

},
(req,res,next)=>{
    //route handler 4
    console.log("Handling the route4 of  user!!");
    //res.send("Response4!!");
    next()
},
(req,res)=>{
    //route handler 5
    console.log("Handling the route5 of  user!!");
    res.send("Response5!!");
}


);

app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000")
})