const mongoose = require("mongoose");

const connectionRequesstSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.ObjectId,
        index:true,
        unique:true,
        required:true
    },

    toUserId:{
        type:mongoose.Schema.ObjectId,
        index:true,
        unique:true,
        required:true
    },

    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{value} is incorrect status type`
        } 
    }
},

    {
        timestamps:true
    }
)


connectionRequesstSchema.index({fromUserId:1,toUserId:1});


connectionRequesstSchema.pre("save", function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cant send request to yourSelf");
    }
    next();
    
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequesstSchema);

module.exports = ConnectionRequestModel;
