const express = require("express");
const {UserAuth} = require("../middlewares/auth.js")


const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",UserAuth,async(req,res)=>{
    const user = req.user;

    res.send(user.firstName + " Sent you a Connection ")

})


module.exports=requestRouter;