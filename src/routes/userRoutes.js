const express = require("express");
const userRouter = express.Router();

const {UserAuth} = require("../middlewares/auth.js")
const ConnectionRequestModel = require("../models/connectionRequestSchema.js");

const USE_SAFE_DATA = "firstName lastName photoUrl  age  gender  about";

userRouter.get("/user/requests/received",UserAuth,async(req,res)=>{

    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",USE_SAFE_DATA);

        const data = connectionRequest.map((row)=>row.fromUserId);

        res.json({
            message:"Data fetched successfully",
            data:data
        })

    }
    catch(err){
        res.status(400).send("ERR: "+ err);
    }

})

userRouter.get("/user/connections",UserAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await  ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id , status:"accepted"},
                {fromUserId:loggedInUser._id , status:"accepted"}
            ]
        }).populate("fromUserId", USE_SAFE_DATA).populate("toUserId", USE_SAFE_DATA);
        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        });
        res.json(
            {
                message:"Data fetched successfully",
                data
            }
        )
    }
    catch(err){
        res.status(400).send("ERR: " + err);
    }


})

module.exports = userRouter