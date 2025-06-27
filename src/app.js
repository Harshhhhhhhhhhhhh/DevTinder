const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require('cookie-parser');


const app = express();


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRoutes.js");
const profileRouter = require("./routes/profileRoutes.js");
const requestRouter = require("./routes/requestRoutes.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);




connectDB()
    .then(()=>{
        console.log("DataBase is connected successfully")
        app.listen(3000,()=>{
        console.log("Server is successfully running on port 3000")
        })
    })
    .catch((err)=>{
        console.err("DataBase connection failed")
    })





