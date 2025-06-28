const express = require("express");
const {UserAuth} = require("../middlewares/auth.js")

const ConnectionRequestModel = require("../models/connectionRequestSchema.js")
const User = require("../models/userSchema.js")


const requestRouter = express.Router();

    requestRouter.post("/request/send/:status/:toUserId",UserAuth,async(req,res)=>{
        try{

            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            const allowedStatus = ["ignored","interested"];

            if(!allowedStatus.includes(status)){
                return res.status(400).send("Invalid status type");
            }

            const isToUserExist = User.findById(toUserId);
            if(!isToUserExist){
                return res.status(400).send("this user doesnot exist on this platform");
            }




            const existingConnectionRequest = await ConnectionRequestModel.findOne({
                $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
            })

            if(existingConnectionRequest){
                if(status==="ignored"){
                    return res.status(400).send("Connection request allready exist");
                }
                else return res.status(400).send("Connection request allready exist");
            }

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