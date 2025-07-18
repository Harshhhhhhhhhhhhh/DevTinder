const mongoose =require("mongoose")

const connectDB = async (params) => {
    await mongoose.connect(
    "mongodb+srv://harshraj2651:8QtXCMw4YYcyN38v@cluster0.yevlgkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )    
}

module.exports = connectDB




