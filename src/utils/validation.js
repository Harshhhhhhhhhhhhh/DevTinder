const Validator = require('validator')


const SignUpValidation=(req)=>{
    const {firstName,lastName,emailId,password}=req.body

    if(!firstName || !lastName || !emailId || !password){
        throw new Error("Input is not valid")
    }
    if(!Validator.isEmail(emailId)){
        throw new Error("Input is Invalid")

    }
    else if(!Validator.isStrongPassword(password)){
        throw new Error("Pls set strong password")

    }
};

const loginValidation=(req)=>{
    const {emailId}=req.body;

    if(!emailId){
        throw new Error("Invalid credential Try again")
    }

    if(!Validator.isEmail(emailId)){
        throw new Error("Input is valid")

    }
}

const editProfileValidation = (req)=>{
    const allowedToEdit = ["firstName","lastName","age","gender","photoUrl"];

    const isAllowedToEdit = Object.keys(req.body).every(fields=>allowedToEdit.includes(fields));

    return isAllowedToEdit;
}


module.exports={
  SignUpValidation,loginValidation,editProfileValidation
}