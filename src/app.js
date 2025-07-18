const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require('cookie-parser');
const cors = require("cors");


const app = express();

  
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

const authRouter = require("./routes/authRoutes.js");
const profileRouter = require("./routes/profileRoutes.js");
const requestRouter = require("./routes/requestRoutes.js");
const userRouter = require("./routes/userRoutes.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);




connectDB()
    .then(()=>{
        console.log("DataBase is connected successfully")
        app.listen(3000,()=>{
        console.log("Server is successfully running on port 3000")
        })
    })
    .catch((err)=>{
        console.error("DataBase connection failed: "+ err)
    })





