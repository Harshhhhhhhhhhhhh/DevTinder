const express = require("express");
const userRouter = express.Router();

const {UserAuth} = require("../middlewares/auth.js");
const ConnectionRequestModel = require("../models/connectionRequestSchema.js");
const User = require("../models/userSchema.js");

const USE_SAFE_DATA = " firstName lastName photoUrl  age  gender  about";


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


userRouter.get("/user/feed",UserAuth,async(req,res)=>{
    try{

        //user should not see his own card
        //user should not see card of his connection
        //user should not see whose status is ignored
        //user should not see whose status is interested
        //user should not see whose status is accepted
        //user should not see whose status is rejected
        const loggedInUser = req.user;

        const page = parseInt(req.query.page)||1;
        let limit = parseInt(req.query.limit)||10;
        limit = limit>50?50:limit
        const skip = (page-1)*limit;


        const connectionRequests = await  ConnectionRequestModel.find({

            $or:[
                {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
            ]  
        }).select("fromUserId toUserId")

        const notAllowedInFeed = new Set();

        connectionRequests.forEach((req)=>{
            notAllowedInFeed.add(req.fromUserId.toString());
            notAllowedInFeed.add(req.toUserId.toString());
        })

        const user = await User.find({
            $and:[
                {_id:{$nin:Array.from(notAllowedInFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USE_SAFE_DATA)
          .skip(skip)
          .limit(limit)

        res.send(user);



    }
    catch(err){
        res.status(400).send("ERR: "+ err);
    }

})

module.exports = userRouter