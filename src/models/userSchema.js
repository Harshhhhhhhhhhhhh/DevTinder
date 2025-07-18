const mongoose = require("mongoose");
let Validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

    gender: {
    type: String,
    validate(value) {
        const allowedGenders = ["male", "female", "others"];
        if (!allowedGenders.includes(value.toLowerCase())) {
          throw new Error("Gender data is not valid");
        }
    }
},

    photoUrl:{
        type:String,
        default:"https://avatars.githubusercontent.com/u/126498672?v=4",
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



userSchema.methods.getJWT =  function (){
    const user = this;
    const token =  jwt.sign({_id:user._id},"abcdefghijklmnopqrstuvwxyz",{
        expiresIn:"1d"
    })

    return token;
}
userSchema.methods.validatePassword = async function(passwordEnteredByUser){

    const user = this;
    const hashPassword = user.password;
    const isPasswordValid = await bcrypt.compare(passwordEnteredByUser,hashPassword);

    return isPasswordValid;


}
const User = mongoose.model("User",userSchema)

module.exports = User