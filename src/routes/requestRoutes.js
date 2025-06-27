const express = require("express");
const {UserAuth} = require("../middlewares/auth.js")

const ConnectionRequestModel = require("../models/connectionRequestSchema.js")


const requestRouter = express.Router();

    requestRouter.post("/request/send/:status/:toUserId",UserAuth,async(req,res)=>{
        try{

            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            const connectionRequest = new ConnectionRequestModel({
                fromUserId,
                toUserId,
                status
            })

            const data = await connectionRequest.save();

            res.json({
                "message":"connection request sent successfully",
                data
            })



        }
        catch(err){
            res.status(400).send("Something went wrong  ERR: " + err);
        }
    

})


module.exports=requestRouter;