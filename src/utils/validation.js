const Validator = require('validator')


const SignUpValidation=(req)=>{
    const {firstName,lastName,emailId,password}=req.body

    if(!firstName || !lastName || !emailId || !password){
        throw new Error("Input is not valid")
    }
    if(!Validator.isEmail(emailId)){
        throw new Error("Input is valid")

    }
    else if(!Validator.isStrongPassword(password)){
        throw new Error("Input is valid")

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


module.exports={
  SignUpValidation,loginValidation
}