const adminAuth = (req,res,next)=>{
    let token = "xyz";
    const isAdminAuthorized = token==="xyz";

    if(!isAdminAuthorized){
        res.status(401).send("Admin is unauthorized");
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
}