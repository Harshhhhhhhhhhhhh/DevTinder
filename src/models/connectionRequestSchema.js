const mongoose = require("mongoose");

const connectionRequesstSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },

    toUserId:{
        type:mongoose.Schema.ObjectId,
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

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequesstSchema);

module.exports = ConnectionRequestModel;
