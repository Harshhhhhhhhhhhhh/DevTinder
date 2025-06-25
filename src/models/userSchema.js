const mongoose = require("mongoose");
let Validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        minLength:4
    },
    lastName:{
        type:String
    },
    emailId:{
        type: String,
        required: [true, "Email is required"],
        unique: true, 
        lowercase: true, 
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!Validator.isStrongPassword(value)){
                throw new Error("Please enter a string password" + value)

            }
        }
    },
    age:{
        type:Number,
        min:18
    },

    gender:{
        type:String,
        validate(value){
            if(!["Male" ,"Female", "Others"].includes(value)){
                throw new error("Gender data is not valid")
            }
        }
    },


    photoUrl:{
        type:String,
        deafult:"https://avatars.githubusercontent.com/u/126498672?v=4",
        validate(value){
            if(!Validator.isURL(value)){
                throw new Error("Invalid photo URL " + value)
            }
        }
    },

    skills:{
        type:[String],

    },

    about:{
        type:String,
        default:"Write something about your self",
    },
   
},

{
   timestamps:true
}

);

const UserModel = mongoose.model("UserModel",userSchema)

module.exports = UserModel